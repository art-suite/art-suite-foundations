require '../register'
require '../index'
require "art-testbench/testing"
.init
  synchronous: true
  defineTests: -> require './tests'
