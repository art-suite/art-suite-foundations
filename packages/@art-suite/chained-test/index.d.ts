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

    thenTestMerged<NextChainedResult>(name: string, fn: (input: ChainResult) => NextChainedResult): ChainedTest<SetupResult, ChainResult & Awaited<NextChainedResult>>;
  }
}
