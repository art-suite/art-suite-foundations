{Foundation} = Neptune.Art
{inspect, log, time, eq, plainObjectsDeepEq, shallowEq, floatEq, objectKeyCount, Binary, RestClient} = Foundation
{BinaryString, binary} = Binary

fillString = (string) ->
  {bytes} = string
  for i in [0...string.length] by 1
    bytes[i] = i
  string

shortBinaryString = fillString new BinaryString new ArrayBuffer 256

mediumBinaryString = fillString new BinaryString new ArrayBuffer 16 * 1024
# 2016-2-14
# FF: 4 * 1024 is the cut-off
# Safari and Chrome: 16 * 1024 is about the cut-off

suiteLength = (length) ->
  binaryString = fillString new BinaryString new ArrayBuffer length

  suite "Art.Foundation.Binary.BinaryString.toBase64Custom.length #{length} strings", ->
    @timeout 100000

    suiteSetup -> log 'binaryString.length': binaryString.length

    test "all get the same result", ->
      Promise.all [
        binaryString.toBase64Custom()
        binaryString.toBase64ToDataUri()
        # binaryString.toBase64Btoa()
      ]
      .then (array) ->
        for b in array
          assert.eq array[0], b

    benchmark "toBase64", -> binaryString.toBase64()
    benchmark "toBase64Custom", -> binaryString.toBase64Custom()
    benchmark "toBase64ToDataUri", -> binaryString.toBase64ToDataUri()
    # asyncBenchmark "toBase64Btoa", -> binaryString.toBase64Btoa()

suiteLength 16
suiteLength 256
suiteLength 4*1024
suiteLength 8*1024
suiteLength 16*1024
suiteLength 32*1024
suiteLength 512*1024
