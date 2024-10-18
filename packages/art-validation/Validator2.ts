const { compact, flatten, compactFlatten, isPlainObject } = require('art-standard-lib')
/*
# NEW NOTES 2024-9-10

## Priorities

- defaults
- simple metadata: description, example/examples

## Everything
- ArtEryDb
  - want to at least support create vs update validation
    - simplest: ArtEryDb only accepts an Object as the root validator (kind-of like now ;))
    - THEN, we can iterate over the list and return each sub-validator with .optional for update
  - may have up to 3 types defined for a given record type stored in the DB
    - Create object type (includes write-only fields)
    - Update object type (includes write-only fields)
    - Get object type (includes read-only fields)
  - "null" and the "update" type HRM
    - null for create is just ignored (though it must match exclusive and required requirements)
    - null for update is a special case that means "delete" - but its only allowed if the original field is optional
    - in other words, if the original field is required, then this is the one place where undefined is OK but null is not allowed!
    - for typescript, that means
      - if the field is T | undefined | null - then leave it alone
      - if the field is T then make it T | undefined (but not null)
      - is it really that easy? Just add "| undefined" ?
    - so maybe we add, in addition to .required and .optional, a .undefinedAllowed property for update?o

- how do we want to do meta data? (goal of supporting OpenAPI)
  - metadata fields that are a little special
    - readOnly / writeOnly? (for fields only returned, or fields only accepted in create/update_
      - ArtEryDb may need to know these to generate Create/Update/Get variants of a record
        - and we'd want to apply this transformation recursively to get the Write and Read variants
          - to get the Update write variant, it's shallow
      - can we reasonably add this later?
  - metadata fields that are 100% user-provided with no implications other than OpenAPI output
    - format: - string, but OpenAPI defines some standard formats
    - externalDocs: URL
    - deprecated: - true/false
  - metadata fields we should auto-generate, but have no other implications other than OpenAPI output
    - enum - array of strings
      - our enum method should provide this metadata
      - how exactly do we want to store this?
    - allOf, anyOf, oneOf and not:
      -	anyOf: Union — must satisfy at least one of the schemas (flexible).
        - SO our `union` method needs to set this up.
        - Easy enough - we already have an array of validators to store as anyOf
        - Just need to clarify how we want to store this information...
      - the other 3 are not currently supported, but we could add methods like "union" for each of them:
        -	allOf: Intersection — must satisfy all schemas (combine multiple schemas into one).
        -	oneOf: Exclusive or — must satisfy exactly one of the schemas (only one valid match).
        -	not: Negation — must not match the specified schema (excludes certain structures).

- toString, fromString, toJson, fromJson?

TODO notes

1. currently this is a defaults-to-required system
  - we can use .optional to make a field optional or an array element optional
2. currently this is a defaults to exclusive system
  - we don't have any way to turn on exclusive mode
  - it's not hard for the actual validation test, but its hard for the type system (I haven't really tried yet though)

I'm totally happy with supporting a "validator.exact" system - where required and exclusive are both on by default.
But I also want a flexible system where required and exclusive are both off by default.

Definitions
- inclusive vs exclusive
  - inclusive means extra object fields are OK
- required vs optional
  - required means the field != null (or undefined)
- exact vs flexible
  - exact means required and exclusive are both on by default
  - flexible means required and exclusive are both off by default

notes:
  - Turns out required and optional are best expressed as VALUE requirements, not FIELD requirements
  - exact and flexible might be partially possible in TypeScript, but they would overwrite any expressed required or optional
    requirements on fields. There is no way to have a "required, optional, or default" in typescript that I can determine.


And there is some question about how to handle nested Validator instances with these defaults:

// example:
validator.flexible({
  a: "string",
  b: validator.union("string", "number"),
})

a is optional, and extra fields are allowed, but is b required? It shouldn't be, but
since the "required" property is part of the validator instance, it would be under current rules.

// example 2:
validator.flexible({
  a: "string",
  b: validator({
    x: "number",
    y: "number",
    mode: validator.enum("add", "subtract")
  }),
})

Really, I think flexible should apply throughout the tree unless explicitly prevented:

// example 3:
validator.flexible({
  a: "string",
  b: validator.exact({
    x: "number",
    y: "number",
    mode: validator.enum("add", "subtract")
  }),
})

Important use-case: create-validate and update-validate
  - I need to be able to take a validator that requires some or all fields and convert it to
    one where all fields are optional - but still exclusive
  - Actually, for ArtEry, I'll have the raw field-list, so I could just STUFF
*/

/*
undefined vs null vs missing

null means INTENTIONALLY not set
undefined means maybe you are looking at a partial object, or accept a default value
undefined and missing are the same thing in the Validator system
  small exception: for exclusive validators, only the allowed fields are allowed, and even
    undefined but not misting fields that are not in that list are still not allowed

in the database, null fields are just not stored, so when you read them out they are null or missing
*/

/********************************************************
 * The magical Validator Typing system
 ********************************************************/

type PrimitiveType = "string" | "number" | "boolean" | "integer" | RegExp;
type EmptyObject = Record<string, never>;
type ValueExists<T> = Exclude<T, undefined | null>
type ValueOptional<T> = T | undefined | null;
type Flatten<T> = { [K in keyof T]: T[K] };



// Recursive helper type with adjusted Rest
type OptionalIfUndefinedHelper<T, K extends readonly (keyof T)[]> = K extends [infer First, ...infer Rest]
  ? First extends keyof T
  ? (undefined extends T[First]
    ? { [P in First]?: T[First] }
    : { [P in First]: T[First] }) &
  OptionalIfUndefinedHelper<T, Extract<Rest, readonly (keyof T)[]>>
  : {}
  : {};

// Utility type to expand the resulting type for better readability
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// Main type to generate the desired type
type OptionalIfUndefined<T, K extends readonly (keyof T)[]> = Expand<OptionalIfUndefinedHelper<T, K>>;


type ExclusiveObject<T> = keyof T extends never
  ? EmptyObject
  : OptionalIfUndefined<{ [K in keyof T]: TypeFromValidator<T[K]> }>;

type ValidatorInputStructure =
  | PrimitiveType
  | ValidatorInputObject
  | ValidatorInputArray
  | Validator2<any>; // Include Validator2 instances as a valid input structure

type ValidatorInputObject = { [key: string]: ValidatorInputStructure };
type ValidatorInputArray = ValidatorInputStructure[];

type TypeFromValidatorBase<T> =
  T extends "string" ? string :
  T extends "integer" ? number :
  T extends "number" ? number :
  T extends "boolean" ? boolean :
  T extends RegExp ? string :
  T extends never[] ? any[] :
  T extends Validator2<infer U> ? U :// Extract type from Validator2 instance
  T extends ValidatorInputArray ? TypeFromValidator<T[number]>[] :
  never;

// TODO: can't figure out how to make typescript detect tuples - I can' test for the length of an array.

type TypeFromValidator<T> =
  T extends ValidatorInputObject ? ExclusiveObject<T> :
  TypeFromValidatorBase<T>;

type TypeFromInclusiveValidator<T> =
  T extends ValidatorInputObject ? OptionalIfUndefined<{ [K in keyof T]: TypeFromInclusiveValidator<T[K]> }> & { [key: string]: any } :
  TypeFromValidatorBase<T>;

type TypeFromAllOptionalValidator<T> =
  T extends ValidatorInputObject ? OptionalIfUndefined<{ [K in keyof T]?: ValueOptional<TypeFromAllOptionalValidator<T[K]>> }> :
  TypeFromValidatorBase<T>;

type ValidationError = {
  value: any;
  fieldPath: string;
  errorIs: string;
}

type JsonDataType = "string" | "number" | "boolean" | "array" | "object" | "integer"

type ValidatorOptions<T> = {
  validate: (value: ValueExists<any>) => value is ValueExists<T>;
  normalize?: (value: ValueExists<T>) => ValueExists<T>;
  postValidate?: (value: ValueExists<T>) => boolean;
  getValidationErrors?: (value: any, parentFieldPath: string) => ValidationError[];
  defaultValue?: T;
  exclusive?: boolean;
  jsonDataType: JsonDataType;
  description?: string;
  format?: string;
  pattern?: string;
  enum?: string[];
  examples?: ValueExists<T>[];
}

type ValidatorConstructorOptions<T> = {
  required?: boolean;
} & ValidatorOptions<T>

/********************************************************
 * Validator2 class - to convert to CaffeineScript
 ********************************************************/

class Validator2<T> {
  value: T;
  private options: ValidatorConstructorOptions<T>;

  constructor(options: ValidatorConstructorOptions<T>) {
    this.options = options;
    if (this.options.required == null) this.options.required = true
    if (this.options.exclusive == null) this.options.exclusive = true
    this.value = null as any;
  }

  get isRequired(): boolean { return this.options.required === true; }
  get defaultValue(): T | undefined | null { return this.options.defaultValue; }
  get openApiType(): JsonDataType { return this.options.jsonDataType; }

  validate(value: any): value is T {
    if (value == null) return !this.options.required
    let valid = this.options.validate(value);
    if (valid && this.options.postValidate) {
      valid = this.postValidate(this.normalize(value));
    }
    return valid
  }

  normalize(value: ValueExists<T>): ValueExists<T> { return this.options.normalize ? this.options.normalize(value) : value; }
  postValidate(value: ValueExists<T>): boolean { return this.options.postValidate ? this.options.postValidate(value) : true; }

  validated(value: any): T {
    if (!this.validate(value)) throw new Error(`Invalid value: ${value}`);
    if (value == null) return value;
    const normalized = this.normalize((value == null ? this.defaultValue : value) as ValueExists<T>);
    if (!this.postValidate(normalized)) throw new Error(`(Post)Invalid value: ${value}`);
    return normalized;
  }

  getValidationErrors(value: any, parentFieldPath: string): ValidationError[] {
    if (!this.options.required && value != null) return [{
      value,
      fieldPath: parentFieldPath,
      errorIs: "required",
    }];
    return this.options.getValidationErrors
      ? this.options.getValidationErrors(value, parentFieldPath)
      : !this.validate(value)
        ? [{
          value,
          fieldPath: parentFieldPath,
          errorIs: "invalid",
        }]
        : !this.normalizeAndPostValidate(value as any)
          ? [{
            value,
            fieldPath: parentFieldPath,
            errorIs: "invalid under post-validation",
          }]
          : [];
  }

  normalizeAndPostValidate(value: ValueExists<T>): boolean { return this.postValidate(this.normalize(value)) }

  //*************************************************
  // Optional & Required
  //*************************************************
  // Optional getter: adds "undefined | null" to the type (and required: false for the runtime validator)
  get optional(): Validator2<ValueOptional<T>> {
    return new Validator2<ValueOptional<T>>({
      ...this.options,
      required: false,
      normalize: this.options.normalize as any,
      postValidate: this.options.postValidate as any,
    });
  }

  // Required getter: strips "undefined | null" from the type (and required: true for the runtime validator)
  get required(): Validator2<Exclude<T, undefined | null>> {
    return new Validator2<ValueExists<T>>({
      ...this.options,
      validate: this.options.validate as any, // typescript is so dumb: Exclude<T, undefined | null> != Exclude<Exclude<T, undefined | null>, undefined | null> !!!! It should be the same type!
      normalize: this.options.normalize as any,
      postValidate: this.options.postValidate as any,
      required: true,
      defaultValue: this.defaultValue as any,
      examples: this.options.examples as any,
    });
  }

  //*************************************************
  // Add Additional Validation Requirements
  //*************************************************
  withReplacedNormalizer(normalize: (value: ValueExists<T>) => ValueExists<T>) { return new Validator2<T>({ ...this.options, normalize: normalize as any }); }
  withReplacedPostValidator(postValidate: (value: ValueExists<T>) => boolean) { return new Validator2<T>({ ...this.options, postValidate: postValidate as any }); }
  addNormalizer(normalize: (value: ValueExists<T>) => ValueExists<T>) { return new Validator2<T>({ ...this.options, normalize: ((value) => normalize(this.normalize(value))) as any }); }
  addPostValidator(postValidate: (value: ValueExists<T>) => boolean) { return new Validator2<T>({ ...this.options, postValidate: ((value) => this.postValidate(value) && postValidate(value)) as any }); }

  min(min: T) { return this.addPostValidator((value) => value >= min); }
  max(max: T) { return this.addPostValidator((value) => value <= max); }
  bound(min: T, max: T) { return this.addPostValidator((value) => value >= min && value <= max); }
  minLength(min: number) { return this.addPostValidator((value) => (value as any).length >= min); }
  maxLength(max: number) { return this.addPostValidator((value) => (value as any).length <= max); }
  boundLength(min: number, max: number) { return this.addPostValidator((value) => (value as any).length >= min && (value as any).length <= max); }
  exactLength(length: number) { return this.addPostValidator((value) => (value as any).length === length); }

  trimmed() {
    if (this.options.jsonDataType !== "string") throw new Error("trim() only works on strings");
    return this.addNormalizer((value) => (value as any).trim());
  }

  description(description: string) { return new Validator2({ ...this.options, description }); }
  format(format: string) { return new Validator2({ ...this.options, format }); }
  pattern(pattern: string) { return new Validator2({ ...this.options, pattern }); }
  examples(examples: ValueExists<T>[]) { return new Validator2({ ...this.options, examples }); }
  example(example: ValueExists<T>) { return new Validator2({ ...this.options, examples: [example] }); }
  enum(values: string[]) { return new Validator2({ ...this.options, enum: values }); }

  default(defaultValue: ValueExists<T>) { return new Validator2<ValueOptional<T>>({ ...this.options, defaultValue, required: false }); }
}

const _validator = (structure: any, options: any) => {
  let exclusive = options?.exclusive ?? true;
  let validate: (value: any) => boolean;
  let normalize: ((value: any) => any) | undefined = undefined;
  let getValidationErrors: (value: any, parentFieldPath: string) => ValidationError[];
  let openApiType: JsonDataType;
  let pattern: string | undefined;

  if (structure instanceof Validator2) {
    ({ openApiType } = structure);
    validate = structure.validate.bind(structure);
    getValidationErrors = structure.getValidationErrors.bind(structure);

  } else if (typeof structure === "string") {
    openApiType = structure as any;
    const javaScriptType = structure === "integer" ? "number" : structure;
    validate = (value) => typeof value === javaScriptType
    if (structure === "integer") {
      normalize = (value) => value | 0;
    }
    getValidationErrors = (value, parentFieldPath) => validate(value) ? [] :
      [{
        value,
        fieldPath: parentFieldPath,
        errorIs: "invalid-type",
      }];

  } else if (structure instanceof RegExp) {
    openApiType = "string";
    pattern = structure.source;
    validate = (value) => typeof value === "string" && structure.test(value);
    getValidationErrors = (value, parentFieldPath) => typeof value !== "string" ? [{
      value,
      fieldPath: parentFieldPath,
      errorIs: "not a string",
    }] : !structure.test(value) ? [{
      value,
      fieldPath: parentFieldPath,
      errorIs: `does not match ${structure}`,
    }] : []

  } else if (Array.isArray(structure)) {
    openApiType = "array";
    if (structure.length === 0) {
      validate = (value) => Array.isArray(value);
      getValidationErrors = (value, parentFieldPath) => !Array.isArray(value) ? [{
        value,
        fieldPath: parentFieldPath,
        errorIs: "not an array",
      }] : [];
    } else if (structure.length === 1) {
      let subValidator = validator(structure[0]);
      validate = (value) =>
        Array.isArray(value) &&
        value.every((item) => subValidator.validate(item))
      getValidationErrors = (value, parentFieldPath) => !Array.isArray(value) ? [{
        value,
        fieldPath: parentFieldPath,
        errorIs: "not an array",
      }] : compactFlatten(value.map((item, i) => subValidator.getValidationErrors(item, `${parentFieldPath}[i]`))) as any;
    } else throw new Error("Invalid validation-definition structure - Array definitions must be length 0 or 1");

  } else if (isPlainObject(structure)) {
    openApiType = "object";
    const structureKeys = Object.keys(structure);
    const subValidators = structureKeys.map((key) => validator(structure[key]));
    validate = (value) =>
      isPlainObject(value)
      && structureKeys.every((key) => subValidators[key].validate((value as any)[key])) // fields with validators test
      && !exclusive || Object.keys(value).every(key => !!structure[key]) // exclusive? only fields with validators allowed

    getValidationErrors = (value, parentFieldPath) =>
      !isPlainObject(value) ?
        [{
          value,
          fieldPath: parentFieldPath,
          errorIs: "not an object",
        }]
        : compactFlatten(structureKeys.map((key) => subValidators[key].getValidationErrors((value as any)[key], parentFieldPath ? `${parentFieldPath}.${key}` : key))) as any;
  } else {
    throw new Error("Invalid validation-definition structure");
  }

  return new Validator2<any>({ validate: validate as any, exclusive, jsonDataType: openApiType, getValidationErrors, normalize, pattern });
}

const validator = <T extends ValidatorInputStructure>(structure: T): Validator2<TypeFromValidator<T>> => _validator(structure, { exclusive: true });
validator.inclusive = <T extends ValidatorInputStructure>(structure: T): Validator2<TypeFromInclusiveValidator<T>> => _validator(structure, { exclusive: false });
validator.exclusive = validator
validator.custom = <T>(options: ValidatorOptions<T>) => new Validator2<T>(options);

/********************************************************
 * Validator Helpers
 ********************************************************/

validator.allOptional = <T extends ValidatorInputObject>(objectDefinition: T): Validator2<TypeFromAllOptionalValidator<T>> => {
  const allOptional: ValidatorInputObject = {};
  for (const key in objectDefinition) {
    const value = objectDefinition[key];
    allOptional[key] =
      isPlainObject(value)
        ? validator.allOptional(value as ValidatorInputObject)
        : validator(objectDefinition[key]).optional;
  }
  return validator(objectDefinition) as any;
}

// Union function to handle multiple validators
// `union`, like `validator`, is exclusive by default
const union = <T extends ValidatorInputStructure[]>(...validators: T): Validator2<TypeFromValidator<T[number]>> =>
  validator.custom<any>({
    validate: ((value) => validators.some((validatorItem) => validator(validatorItem).validate(value))) as any,
    jsonDataType: validator(validators[0]).openApiType
  });

union.inclusive = <T extends ValidatorInputStructure[]>(...validators: T): Validator2<TypeFromInclusiveValidator<T[number]>> =>
  validator.custom<any>({
    validate: ((value) => validators.some((validatorItem) => validator.inclusive(validatorItem).validate(value))) as any,
    jsonDataType: validator(validators[0]).openApiType
  });
validator.union = union.exclusive = union;

type IntersectionType<T extends any[]> =
  T extends [infer First, ...infer Rest]
  ? First & IntersectionType<Rest>
  : unknown;

validator.intersection = <T extends ValidatorInputStructure[]>(...validators: T): Validator2<IntersectionType<{ [K in keyof T]: TypeFromValidator<T[K]> }>> =>
  validator.custom<any>({
    validate: ((value) => validators.every((validatorItem) => validator.inclusive(validatorItem).validate(value))) as any,
    jsonDataType: validator(validators[0]).openApiType
  })

// Enum validator function
validator.enum = <T extends string[]>(...options: T): Validator2<T[number]> =>
  validator("string").addPostValidator((value) => options.indexOf(value) >= 0).enum(options);

/********************************************************
 * Standard Validators
 ********************************************************/
// Define regex patterns outside for performance
const urlPattern = /^\w+:\/\/[^\s/$.?#].[^\s]*$/i;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Use the regex validator to create specific validators
validator.url = validator(urlPattern);
validator.uuid = validator(uuidPattern);
validator.email = validator(emailPattern);
validator.string = validator("string");
validator.number = validator("number");
validator.boolean = validator("boolean");
validator.integer = validator("integer");







//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//  Example Usage
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************
const { number, boolean, string, uuid, integer } = validator

const plainStructureExample = validator({
  id: "string",
  name: "string",
  age: "number",
  isActive: "boolean",
  address: {
    street: "string",
    city: "string",
    zipCode: "string",
  },
  phoneNumbers: ["string"],
});

const simpleRegex = validator(/^[a-zA-Z0-9]+$/);

const stringOrNumber = validator.union("string", "number");

const objectWithEitherOrFields = validator.intersection({ a: "string", b: "number" }, validator.union({ id: "string" }, { phoneNumber: "string" }));
type ObjectWithEitherOrFields = typeof objectWithEitherOrFields.value

// Example usage with nested Validator2
const rectangle = validator({
  x: number, // Use the validator instance directly
  y: number,
  width: number,
  height: number,
  gradientColors: [string],
});

const rectangles = validator([rectangle])

// Type inference example
const myRectangles: typeof rectangles.value = [
  { x: 10, y: 20, width: 100, height: 200, gradientColors: ["red", "blue"] },
  { x: 15, y: 25, width: 90, height: 190, gradientColors: ["green", "blue"] },
]; // it TypeChecks!

const kaiPropertyPayloadV1Schema = validator({
  id: string,
  fusionPropertyId: string,
  cherreDwId: /^[-+]?[0-9]+$/,
  name: string.optional,
  address: string,
  heroImage: string,
  description: string,
  levels: [{
    id: string,
    name: string,
    spaces: [{
      id: string,
      name: string,
      items: [{
        id: string,
        name: string,
        itemNotes: [string],
      }],
      photos: [{
        url: validator.url,
        description: string,
        mime: validator.enum("image/jpeg", "image/avif", "image/heif", "image/heic"),
        width: number,
        height: number,
        bytes: number,
        tags: [string],
      }]
    }]
  }],
  submittingUser: {
    id: string,
    fusionUserId: string,
  }
})

const anyArray = validator([])
type AnyArray = typeof anyArray.value
const myArray: AnyArray = [1, 2, 3];

const emptyObject = validator({})
type MyEmptyObject = typeof emptyObject.value
const myEmptyObject: MyEmptyObject = {};

const anyObject = validator.inclusive({})
type MyAnyObject = typeof anyObject.value
const myAnyObject: MyAnyObject = { a: 1, b: "hello" };
myAnyObject.c = true;

const myInclusiveObjectValidator = validator.inclusive({ a: number.optional, b: string, sub: { x: number } });
type MyInclusiveObject = typeof myInclusiveObjectValidator.value
const myInclusiveObject: MyInclusiveObject = { a: 1, b: "hello", sub: { x: 10, y: 20 } };
// myInclusiveObject.a = "hi" // illegal
myInclusiveObject.c = "anything I want";
delete myInclusiveObject.a // OK
// delete myInclusiveObject.b // illegal

const myExplicitlyExclusiveValidator = validator.exclusive({ a: number, b: string, sub: { x: number } });
type MyExplicitlyExclusiveObject = typeof myExplicitlyExclusiveValidator.value
const myExplicitlyExclusiveObject: MyExplicitlyExclusiveObject = { a: 1, b: "hello", sub: { x: 10 /*, y: 20 - illegal*/ } };
// myExplicitlyExclusiveObject.c = "hi" // illegal

type Rectangle = typeof rectangle.value
const isValidRectangle = rectangle.validate(myRectangles[0]); // Runtime validation

const pointValidator = validator({ x: number, y: number });
type Point = typeof pointValidator.value
const myPoint: Point = { x: 10, y: 20 };

const nonNegativeInteger = integer.min(0)
const rating = number.bound(0, 10)
const year = number.bound(1800, 2100)

// Example custom validators
const myCustomBooleanValidator = validator.custom<boolean>({
  validate: (value) => typeof value === "boolean",
  jsonDataType: "boolean",
});

const fusionAdminPropertyDetailsUpdateSchema = validator({
  fromKaiListingRequestId: string.optional,
  photoIds: validator([uuid]).optional,
  propertyDescription: {
    contents: string,
  },
  hoa: {
    hasHoa: boolean,
    periodicFeeCents: nonNegativeInteger,
    feeCadence: validator.enum("weekly", "monthly", "quarterly", "annually"),
  },
  estimatedRenoCostRange: validator([nonNegativeInteger]).exactLength(2),
  valuation: {
    thirdPartyAvmDollars: nonNegativeInteger.optional,
    kaiizenArvDollars: nonNegativeInteger.optional,
    kaiizenAsIsValueDollars: nonNegativeInteger.optional,
  },
  floodZone: {
    isFloodZone: boolean,
  },
  schools: {
    districtName: string,
    greatSchoolsRatings: {
      elementary: rating,
      middle: rating,
      high: rating,
    },
  },
  proximity: {
    highPowerLines: boolean,
    arterialRoads: boolean,
    railways: boolean,
    commercialIndustrial: boolean,
  },
  systems: {
    hvac: {
      type: string.optional, // TODO specific enum
      year: year.optional,
    },
    electrical: {
      type: string.optional, // TODO specific enum
      amperage: nonNegativeInteger.optional,
    },
    plumbing: {
      waterSupplyType: string.optional, // TODO specific enum
      supplyPipeMaterial: string.optional, // TODO specific enum
      drainPipeMaterial: string.optional, // TODO specific enum
      waterHeaterType: string.optional, // TODO specific enum
      waterHeaterYear: year.optional,
    },
    utilityProviders: {
      electric: string,
      sewer: string,
      water: string,
      gas: string,
    },
  },
  interior: {
    totalBedrooms: nonNegativeInteger,
    totalBathrooms: nonNegativeInteger,
  },
  construction: {
    sqft: nonNegativeInteger,
    yearBuilt: year,
    roof: {
      material: string.optional, // TODO specific enum
      year: year.optional,
    },
    garageAndParking: {
      type: string.optional, // TODO specific enum
      parkingSpots: nonNegativeInteger,
    },
    facade: {
      type: string.optional, // TODO specific enum
    },
    foundation: {
      type: string.optional, // TODO specific enum
    },
  },
  property: {
    lotSqft: nonNegativeInteger,
    fencingType: string.optional, // TODO specific enum
    drivewayType: string.optional, // TODO specific enum
    poolType: string.optional, // TODO specific enum
  },
  misc: {
    notes: string,
  },
});

const testAllOptional = validator.allOptional({
  a: string,
  b: number,
  c: {
    x: string,
    y: number,
  },
});

type TestAllOptional = typeof testAllOptional.value

const testManualAllOptional = validator({
  a: string.optional,
  b: number,
  c: validator({
    x: string.optional,
    y: number.optional,
  }).optional,
});
type TestManualAllOptional = typeof testManualAllOptional.value
// const t: TestManualAllOptional = { c: { y: 10 } }


type Foo123 = {
  a: string;
  b: undefined | string;
  c: string;
}


type DerivedFoo123 = OptionalIfUndefined<Foo123>;

const foo123: DerivedFoo123 = { a: "123", c: "123" }