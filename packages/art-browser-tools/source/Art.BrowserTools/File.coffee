StandardLib = require 'art-standard-lib'
{createElementFromHtml} = require './Dom'

{Promise} = StandardLib

module.exports = class File

  # options
  #   accept: the HTML file input accept options. I.E. <input type="file" accept="...">
  #     HTML "accept" values:
  #       [valid MIME types]
  #       audio/*
  #       video/*
  #       image/*
  #   multiple: if set to true, allow the user to select multiple files
  #   onChange: ([files]) -> ... # function called when the user makes a selection. Returns an array of HTML File objects
  #     https://developer.mozilla.org/en-US/docs/Web/API/File
  @request: (options={}) =>
    new Promise (resolve, reject) =>
      {accept, multiple, onChange} = options
      @hiddenDivForFileInput?.parentNode.removeChild @hiddenDivForFileInput
      @hiddenDivForFileInput = createElementFromHtml "<div style='height: 0px;width: 0px; overflow:hidden; position:absolute;'/>"
      body = document.body
      fileInput = createElementFromHtml "<input type='file' #{'accept='+accept if accept} #{'multiple=true' if multiple}/>"
      @hiddenDivForFileInput.appendChild fileInput
      body.appendChild @hiddenDivForFileInput
      fileInput.onchange = (e) ->
        fileList = (file for file in fileInput.files)
        # fileTypes = (file.type for file in fileList)
        # fileSizes = (file.size for file in fileList)
        if fileList.length > 0 && fileList[0]
          onChange && onChange fileList
          resolve fileList
        else
          reject "no files returned"
      fileInput.click()
