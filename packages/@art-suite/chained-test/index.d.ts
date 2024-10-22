declare module "@art-suite/chained-test" {
  export function chainedTest<T>(name: string, fn: () => T): ChainedTest<T, T>;
  export function firstIt<T>(name: string, fn: () => T): ChainedTest<T, T>;

  export interface ChainedTest<SetupResult, ChainResult> {
    thenTest<U>(name: string, fn: (input: ChainResult) => U): ChainedTest<SetupResult, U>;
    thenIt<U>(name: string, fn: (input: ChainResult) => U): ChainedTest<SetupResult, U>;
    alwaysTest<U>(name: string, fn: (input: ChainResult) => U): ChainedTest<SetupResult, SetupResult>;
    alwaysIt<U>(name: string, fn: (input: ChainResult) => U): ChainedTest<SetupResult, SetupResult>;
    finally<U>(name: string, fn: (input: ChainResult) => U): ChainedTest<SetupResult, SetupResult>;

    tapTest(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, ChainResult>;
    tapIt(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, ChainResult>;

    softTapTest(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, ChainResult>;
    softTapIt(name: string, fn: (input: ChainResult) => any): ChainedTest<SetupResult, ChainResult>;
    thenTestMerged<U>(name: string, fn: (input: ChainResult) => U): ChainedTest<SetupResult, ChainResult & U>;
  }
}
