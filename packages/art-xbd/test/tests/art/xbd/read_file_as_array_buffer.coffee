class Object.MyUtil
  @toArrayBuffer = (buffer) ->
    ab = new ArrayBuffer(buffer.length)
    view = new Uint8Array(ab)
    i = 0

    while i < buffer.length
      view[i] = buffer[i]
      ++i
    ab

  @readFileAsArrayBuffer = (file) ->
    fs = define "fs"
    buffer = fs.readFileSync file
    MyUtil.toArrayBuffer buffer
