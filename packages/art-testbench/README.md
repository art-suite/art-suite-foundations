# art-testbench
Art-Suite Testing and Benchmarking tools.

Right now:
* wrapper and extensions for Mocha and Chai

###  Future
* Chai is already mostly replaced, plan to drop it.
* Mocha is already highly augmented, plan to drop it.

### Todo

There is a lot I want that mocha doesn't do:

- chain tests
- integrated hierachical test-suites
- browser view is collapsable and integrated with logging (DomConsole)
- red/green testing while 'watching'
  - With the '-w' commandline option, whenever test are failing, only rerun the failin tests.
  - Once all the were-failing-tests are padding, re-run the original test.
- '-w' watch mode really needs to restart node from scratch every time, at least have the option
  - for example, as soon as I have a syntax error, it just stops working
  - should report both success and failure counts at the very end of output; often I have a lot of noise in the error-reporting and all I want to know is did MORE tests start failing. With mocha I have to scroll up through pages of error-output to get the number of successes.

# Stuff

This lib is going to grow, tossing some notes in here for lack of a better place.

### Known-Failing

I use the concept of known-failing tests. Here's what they do:

* known-failing tests *are ignored when they fail*
* known-failing tests *are an error when they succeed*
* known-failing tests are harder to ignore than the alternatives
  * they are easy to search for: look for 'knownFailing'
  * they report their existance in the test-suite output

Here's why. Suppose you discovered a new bug in your code that you don't know how to fix, or you don't have time to fix it. However, suppose you know how to test for it. If you add the test to your test-suite and push your code, your constant-integration will suddenly start failing even though you didn't change the code at all. With normal testing, your only alternative is to document the problem somewhere else or add it in, but comment it out. Both options are likely to be forgotten and never revisited.

Instead, I use a `knownFailing` test. Now I can add the test, which is the best way to document a bug. If I accidentally fix it while working on something else, the known-failing test starts actually failing, notifiying me how I impacted the code. I can then verify if it is actually good and switch the test back to normal. It's also easy to check if I have any known-failing tests in the test-suite that I should get around to fixing.

Eventually, when I replace mocha, this will be a first-class concept. It'll be reported at the end of the test-run:

```
succeeding: 762
failing: 3
knownFailing: 2
```

### TestSuite

A tiny bit of magic that lets you share code across tests, but not execute it multiple times.

Example:

```coffeescript
class Tests extends &ArtTestbench.TestSuite
  @setupAndVerifyAssumptions: =>
    authenticate()
    .then ({userId}) ->
      createTestPost()
      .then (post) -> {post, userId}

  @testDelete: =>
    @setupAndVerifyAssumptions()
    .tap ({userId}) ->
      pipelines.user.delete userId

  @testPostAndTopicAreGone: =>
    @testDelete()
    .then ({post})->
      Promise.all []
        pipelines.post.get  returnNullIfMissing: true key: post.id
        pipelines.topic.get returnNullIfMissing: true key: post.topicId
    .then ([deletedPost, deletedTopic])->
      assert.doesNotExist deletedPost
      assert.doesNotExist deletedTopic

```

Creates the following tests:

* setupAndVerifyAssumptions
* testDelete
* testPostAndTopicAreGone

Any class method that starts out with `setup.*` or `test.*` will get a test created that invokes that method - AND - invoking that method is wrapped in a reusable promise. Calling it again, just gets the previous, cached result.
