require 'caffeine-mc/register'
require "art-testbench/testing"
.init
  synchronous: true
  defineTests: -> require './tests'
