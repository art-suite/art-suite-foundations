let { auth, createPost, createComment, getComments, logOut } = require("../examples/TestApp");
let { chainedTest } = require("@art-suite/chained-test");
let { assert } = require("@art-suite/assert");

// NOTE: This file INTENTIONALLY fails in Mocha to demonstrate how failures are handled.

const aliceEmail = "alice@test.com";
const postBody = "The quick brown fox jumped over the lazy dog.";
const commentBody = "Brilliant!";

// The return-result of this first test will be passed as the second argument
// to all subsequent tests in the chain.
chainedTest("Alice's user story", () => auth(aliceEmail))

  // In "then" tests, the test's return value is passed to the next test.
  // skipped: if neither this nor any dependent tests are selected by test framework
  .thenIt("lets Alice create a post", () =>
    createPost(postBody)
  )

  .softTapIt("softTapIt failures don't skip following tests", () => {
    throw new Error("fake-failure in softTapIt");
  })

  // "tap" tests: ignores the test's return value. Instead it passes lastTestValue through.
  // skipped: if neither this nor any dependent tests are selected by test framework
  .tapIt("lets Alice create a comment", (post, alice) =>
    createComment(post.id, commentBody)
  )

  .tapIt("tapIt or thenIt failures WILL skip remaining tests", () => {
    throw new Error("fake-failure in tapIt");
  })

  .thenIt("can get the created comment from the post", (post, alice) =>
    getComments(post.id)
  )

  // In "softTap" tests, the test's return value is ignored.
  // Instead it passes lastTestValue through to the next test.
  // skipped: if not selected by test framework
  .softTapIt("should have only one comment by Alice", (comments, alice) => {
    assert.eq(comments.length, 1);
    assert.eq(comments[0].userId, alice.id);
  })

  .tapIt("should be able to logOut", logOut)