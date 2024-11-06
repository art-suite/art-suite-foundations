import { Merge } from 'type-fest';
declare module "@art-suite/chained-test" {
  export function chainedTest<T>(name: string, fn: () => T): ChainedTest<Awaited<T>, Awaited<T>>;
  export function firstIt<T>(name: string, fn: () => T): ChainedTest<Awaited<T>, Awaited<T>>;


  export interface ChainedTest<SetupResult, ChainResult> {
    thenTest<NextChainedResult>(name: string, fn: (input: ChainResult) => NextChainedResult): ChainedTest<SetupResult, Awaited<NextChainedResult>>;
    thenIt<NextChainedResult>(name: string, fn: (input: ChainResult) => NextChainedResult): ChainedTest<SetupResult, Awaited<NextChainedResult>>;
    alwaysTest(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, SetupResult>;
    alwaysIt(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, SetupResult>;
    finally(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, SetupResult>;

    tapTest(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, ChainResult>;
    tapIt(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, ChainResult>;

    softTapTest(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, ChainResult>;
    softTapIt(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, ChainResult>;

    /*
    Typing thenTestMerged is stupid-hard with TypeScript. Here is the type in words:
    1. inputs are a sequence of strings and test functions, always in pairs.
    2. the string is the name of the next test - the function following is the test function.
    3. the inputs to the first test function is the ChainResult.
    4. The inputs to the next function is the first function's results merged with the ChainResult.
    5. the result of the 3rd and all subsequent test functions is the merge of the previous two function's results.
    6. the final result is the merge of the last two function's results.

    Current TypeScript Limitations:
    1. all functions must have the same return type.
    2. the inputs to all functions is the same as the first function's inputs.

    Still, this is useful. You can set up all your context in previous calls, and then do a bunch of sequential tests using that context.
    */
    thenTestMerged<NextChainedResult>(
      ...steps: [...Array<string | ((input: ChainResult) => NextChainedResult)>]
    ): ChainedTest<SetupResult, Merge<ChainResult, Awaited<NextChainedResult>>>;
  }
}
