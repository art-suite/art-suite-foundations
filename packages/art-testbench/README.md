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
