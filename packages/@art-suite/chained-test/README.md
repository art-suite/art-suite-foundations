# ArtSuite.Test.ChainedTest

ChainedTest lets you break up large tests into a sequence fo smaller tests. This is particularly helpful for integration tests, user-story tests, or tests with more than one asynchronous step.

JEST and Mocha are supported.

### Install

```coffeescript
npm install @art-suite/chained-test
```

### BASIC USAGE

```javascript
let { chainedTest } = require("@art-suite/chained-test");

chainedTest("setup", () => 123)

.thenTest("is it 123?", (value) => {
  expect(value).toEqual(123)
  return 456;
})

.thenTest("is it 456?", (value) => {
  expect(value).toEqual(456)
})
```

You may notice this looks a lot like a chain of Promises. That is the intention. It works very similarly.

### FULL EXAMPLE

```javascript
let { chainedTest } = require("@art-suite/chained-test");
let { auth, createPost, createComment, getComments, logOut } = require("../myApp");

const aliceEmail = "alice@test.com";
const postBody = "The quick brown fox jumped over the lazy dog.";
const commentBody = "Brilliant!";

// the return-result of this first test will be passed as the second argument
// to all subsequent tests in the chain.
chainedTest("setup", () => auth(aliceEmail))

// softTapTests: ignores the test's return value. Instead it passes lastTestValue through.
// skipped: if not selected by test framework
.softTapTest("validate alice is returned", (_, alice) => {
  expect(alice.email).toEqual(aliceEmail)
})

// thenTests: passes the test's return value through as the lastTestValue for the next test
// skipped: if neither this nor any dependent tests are selected by test framework
.thenTest("create a post", (_, alice) =>
  createPost(alice, postBody)
)

// tapTests: ignores the test's return value. Instead it passes lastTestValue through.
// skipped: if neither this nor any dependent tests are selected by test framework
.tapTest("create a comment", (post, alice) =>
  createComment(post, commentBody)
)

.thenTest("get post's comments", (post, alice) =>
  getComments(post)
)

.softTapTest("should have one comment by alice", (comments, alice) => {
  expect(comments.length).toEqual(1);
  expect(comments[0].userId).toEqual(alice.id);
})

.tapTest("logOut", logOut)
```

This will create 7 tests in the test framework. With no filters, each will get executed in order exactly once. If the test framework's filters select none of these tests, none of them will execute. If the test framework selects some, but not all of the tests, only the required tests will be run.

For example:

- If only `logOut` is selected, only `"setup", "create a post", "create a comment", "get post's comments", and "logOut"` are executed.
- If only `validate alice is returned` is selected, only `"setup" and "validate alice is returned"` are executed.

### API

Start a chained test:

#### chainedTest

```javascript
let { chainedTest } = require("@art-suite/chained-test");

chainedTest(name, test)   // => ChainedTest instance
```

- **IN:**
  - name: string [optional]
  - test: () => testResult can be anything
- **OUT:**
  - ChainedTest instance
- **EFFECT:**
  - registers the named test with the test framework

#### chainedTestInstance.thenTest / .tapTest / .softTapTest

```javascript
let { chainedTest } = require("@art-suite/chained-test");

chainedTest(name, test)
.thenTest(name, test)     // => ChainedTest instance
.tapTest(name, test)      // => ChainedTest instance
.softTapTest(name, test)  // => ChainedTest instance
```

All three methods have the same signature, but have slightly different effects:

- **IN:**
  - name(*): string
  - test(*): (lastTestResult, firstTestResult) => testResult can be anything
    - lastTestResult: the returned value from the last non-"tap" test.
    - firstTestResult: the value returned from the first test established in the chainedTest call.
  - (*) The `thenTest/tapTest/softTapTest` methods can accept any number of arguments as long as they are arranged as name-test pairs. There must be at least one pair. If there is more than one pair, each pair is treated as-if they were independently called with a sequence of calls to the same method-type.
- **OUT:**
  - ChainedTest instance
- **EFFECT:**
  - each register their named test(s) with the test framework
  - `.thenTest`: will pass the returned value from the test function to the next test in the chain as its `lastTestResult`.
  - `.tapTest': will ignore the returned value from its test-function and instead pass the `lastTestResult` through to the next test's `lastTestResult`.
  - `.softTapTest': is the same as tapTest except additionally, it's test will not be executed unless the test framework explicitly runs the test.

### Getting Fancy: Chains can become Trees

You may be asking yourself, can I only do a simple sequence of tests? What if I want to branch out a little?

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

### Failures

If a test fails, all downstream, dependent tests automatically fail as well. The downstream tests will not be executed, and they will be marked as failed in the test suite.