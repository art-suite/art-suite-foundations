let { chainedTest } = require("@art-suite/chained-test");
let { auth, createPost, createComment, getComments, logOut } = require("./TestApp");

// CONSTANTS FOR TESTS
const aliceEmail = "alice@test.com";
const postBody = "The quick brown fox jumped over the lazy dog.";
const commentBody = "Brilliant!";

// the return-result of this first test will be passed as the second argument
// to all subsequent tests in the chain.
chainedTest("Alice's user story", () => auth(aliceEmail))

  // "softTap" tests: ignores the test's return value. Instead it passes lastTestValue through.
  // skipped: if not selected by test framework
  .softTapIt("should have returned alice", (_, alice) => {
    expect(alice.email).toEqual(aliceEmail)
  })

  // "then" tests: passes the test's return value through as the lastTestValue for the next test
  // skipped: if neither this nor any dependent tests are selected by test framework
  .thenIt("needs to create a post", () =>
    createPost(postBody)
  )

  // "tap" tests: ignores the test's return value. Instead it passes lastTestValue through.
  // skipped: if neither this nor any dependent tests are selected by test framework
  .tapIt("needs to create a comment", (post, alice) =>
    createComment(post.id, commentBody)
  )

  .thenIt("can get the created comment from the post", (post, alice) =>
    getComments(post.id)
  )

  .softTapIt("should have one comment by alice", (comments, alice) => {
    expect(comments.length).toEqual(1);
    expect(comments[0].userId).toEqual(alice.id);
  })

  .tapIt("should be able to logOut", logOut)