# ArtSuite/ChainedTest

Smaller tests are easier to write, maintain, and use to ensure code correctness.
ChainedTest lets you break up large tests into a sequences of small tests. This is particularly helpful for **integration tests**, **user-story tests**, and any tests with **more than one asynchronous step**.

# Benefits

- **Accelerate test-suite development:** Break up large, slow tests into a sequence of smaller tests. Decrease total test-suite code-size through improved code re-use.
- **Accelerate test-suite runtime:** Reduce overall run-time of the test suite with generalized shared-setup.

# Supported Frameworks: Jest & Mocha

Chained-test works equally well with either [JestJs](https://www.npmjs.com/package/jest) or [MochaJs](https://www.npmjs.com/package/mocha).

In fact, chained-test should work with any testing framework that:

1. declares tests with either `test(name, testFunction)` or `it(name, testFunction)`, and
1. supports promise-based asynchronous tests

# Install

```coffeescript
npm install @art-suite/chained-test --save-dev
```

# Usage

### Basics

```javascript
let { chainedTest } = require("@art-suite/chained-test");

chainedTest("setup", () => 123)

.thenIt("should be 123", (value) => {
  expect(value).toEqual(123)
  return 456;
})

.thenIt("should be 456", (value) => {
  expect(value).toEqual(456)
})
```

You may notice this looks a lot like a chain of promises. That is intentional.

### Full Example

```javascript
let { chainedTest } = require("@art-suite/chained-test");
let { auth, createPost, createComment, getComments, logOut } = require("./TestApp");

const aliceEmail = "alice@test.com";
const postBody = "The quick brown fox jumped over the lazy dog.";
const commentBody = "Brilliant!";

// The return-result of this first test will be passed as the
// second argument to all subsequent tests in the chain.
chainedTest("Alice's user story", () => auth(aliceEmail))

// In "then" tests, the test's return value is passed to the next test.
// skipped: if neither this nor any dependent tests are selected by test framework
.thenIt("lets Alice create a post", () =>
  createPost(postBody)
)

// "tap" tests: ignores the test's return value. Instead it passes lastTestValue through.
// skipped: if neither this nor any dependent tests are selected by test framework
.tapIt("lets Alice create a comment", (post, alice) =>
  createComment(post.id, commentBody)
)

.thenIt("lets Alice get the comments for a post", (post, alice) =>
  getComments(post.id)
)

// In "softTap" tests, the test's return value is ignored.
// Instead it passes lastTestValue through to the next test.
// skipped: if not selected by test framework
.softTapIt("should have only one comment by Alice", (comments, alice) => {
  expect(comments.length).toEqual(1);
  expect(comments[0].userId).toEqual(alice.id);
})

.tapIt("should be able to logOut", logOut)
```

This will create 7 tests in the test framework. With no filters, each will get executed in order exactly once. If the test framework's filters select none of these tests, none of them will execute. If the test framework selects some, but not all of the tests, only the required tests will be run.

For example:

- If only `logOut` is selected, `"auth alice", "create a post", "create a comment", "get post's comments", and "logOut"` are executed.
- If only `validate alice is returned` is selected, only `"auth alice" and "validate alice is returned"` are executed.

### When to Use .thenTest, .tapTest or .softTapTest

- Use `.then*` whenever you need to pass a result from one test down the chain to other tests.
- Use `.tap*` when you want to use the same, passed-in value for multiple tests. `.tap*` tests are also helpful when downstream tests care about the side-effects of a test but don't care about its direct result.
- User `.softTap*` when downstream tests don't care about either the result or side-effects of this test.

In general, use `.softTap` if you can. `.softTap` is has multiple advantages. If it fails, it doesn't cause down-stream tests to fail. If the test-runner skips it, it is actually skipped, and your test suite runs faster.

Otherwise, choose `.tap*` or `.then*` based on how you need your return-values passed to the next test.

# API


### chainedTest()

Start a chained test.

```javascript
let { chainedTest } = require("@art-suite/chained-test");

chainedTest(name, test)
```

- **IN:**
  - name: string [optional]
  - test: () => testResult can be anything
- **OUT:**
  - ChainedTest instance
- **EFFECT:**
  - registers the named test with the test framework

### chainedTestInstance.thenTest() / .tapTest() / .softTapTest()

Add additional tests to the test-chain.

```javascript
let { chainedTest } = require("@art-suite/chained-test");

chainedTest(name, test)

// aliases
.thenIt(name, test)     // test and pass return-value to next test
.tapIt(name, test)      // test and pass previous return-value through to next test
.softTapIt(name, test)  // test, pass previous return-value through to next test,
                        //  and skip if not requested by test runner.

// aliases
.thenTest(name, test)
.tapTest(name, test)
.softTapTest(name, test)
```

All three methods have the same signature but have slightly different effects:

- **IN:**
  - name(*): string
  - test(*): (lastTestResult, firstTestResult) => testResult can be anything
    - lastTestResult: the returned value from the last non-"tap" test.
    - firstTestResult: the value returned from the first test established in the chainedTest call.
  > (*) The `thenTest/tapTest/softTapTest` methods can accept any number of arguments as long as they are arranged as name-test pairs. There must be at least one pair. If there is more than one pair, each pair is treated as-if they were independently called with a sequence of calls to the same method-type.
- **OUT:**
  - a new ChainedTest instance
  - `.then*` will pass the test's return value to the next test in the chain
  - `.tap*` and `.softTap*` will ignore the test's return-value, and instead they will pass through the lastTestResult they received.
- **EFFECT:**
  - registers the named test with the test framework
  - when the test runs, it is passed: (lastTestResult, firstTestResult)
- **FAILURES:**
  - If the the provided test fails:
  - `.then*` and `.tap*` will fail and cause all following tests to be skipped
  - `.softTap*` will fail, but following tests will still be run
- **IF NOT SELECTED BY THE TEST RUNNER:**
  - `.then*` and `.tap*` tests will still run if, and only if, a downstream test (of any sort) *is* selected by the test-runner.
  - `.softTap*` tests will not run unless explicitly selected by the test-runner.

# Getting Fancy: Chains can become Trees

You may be asking yourself, can I only do a simple sequence of tests? Can I, maybe, branch out a little? Oh yes you can!

It may make sense to share some root set of tests, and their results, across multiple down-stream test paths. The main limitation is each test can only depend on one previous test. However, any given test can have any number of dependent next-tests.

For example:
```javascript
let commonRoot =
  chainedTest(mySetup)
  .thenTest(test1Name, test1);

commonRoot
.thenTest(test2Name, test2)

commonRoot
.thenTest(test3Name, test3)
```

When filtering tests it all works as expected. The `commonRoot` is only excuted once, and only if needed:

- If only `test1` is selected, `mySetup, test1` will be executed.
- If only `test2` is selected, `mySetup, test1 and test2` will be executed.
- If only `test3` is selected, `mySetup, test1 and test3` will be executed.

# How Failures and Skipped Tests are Handled

Logically, if a test fails, all downstream tests can no longer complete. Therefor, those down-stream tests should be skipped. Here's how chained-test handles this in each test framework:

- **Mocha:** [Mocha supports dynamically skipping tests with `this.skip()`](https://mochajs.org/#inclusive-tests). Chained-test takes advantage of this and skips any test which cannot be completed due to an earlier failure.

- **Jest:** Unfortunately, as-of November 2020, there is only an [open feature-request for Jest to support dynamically skipped tests](https://github.com/facebook/jest/issues/8604). Until Jest adds support, chained-test cannot handle this perfectly. Chained-test will skip the dependent tests, but Jest only allows a test to be marked as successful or failed. Chained-test takes the least-noise approach. The test that actually failed is marked as failed for Jest. The remaining, dependent tests are marked as successful. <br><br>Marking untested tests as successful is clearly less than ideal, but it does hit the key requirement of surfacing the actual failure and causing the overall test-suite to fail. The alternative option would be to mark all dependent tests as failed, but that creates an excessive amount of noise. It is also incorrect to mark untested tests as failed when they may be just fine.

  > I encourage you to add your support to the feature request if you enjoy using chained-test with Jest, as I do. - SBD

Note: When a `.softTap*` test fails, dependent tests will still be executed.

# Developed

`@art-suite/chained-test` was originally developed at [Imikimi.com](imikimi.com) as part of the `art-testbench` package for use with Mocha. Since then, chained-test has been factored out into its own package and updated to support for Jest. This work was done in part with support from [GenUI.com](genui.com).