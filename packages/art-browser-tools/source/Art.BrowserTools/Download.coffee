{defineModule} = require 'art-standard-lib'
{binary} = require 'art-binary'

defineModule module, class Download
  @downloadBinaryData: (filename, binaryData, mimeType) ->
    binaryData = binary binaryData
    # IE
    if global.navigator.msSaveOrOpenBlob?
      blob = binaryData.toBlob mimeType
      window.navigator.msSaveOrOpenBlob blob, filename

    # everything else
    else
      binaryData.toDataUri mimeType
      .then (uri) -> Download.downloadFromUrl uri, filename

  @downloadFromUrl: (url, filename) ->
    e = document.createElement 'a'
    e.setAttribute 'href', url
    e.setAttribute 'download', filename
    # e.setAttribute 'target', '_blank'
    document.body.appendChild e
    e.click()
    document.body.removeChild e


