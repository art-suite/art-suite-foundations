{Foundation, Atomic} = Neptune.Art
{deepAll, deepMap, isFunction, defineModule, deepEach, Promise} = Foundation
{Img} = Foundation.Browser.DomElementFactories
{point, point0} = Atomic

devicePixelRatio = Foundation.Browser.Dom.getDevicePixelRatio()

defineModule module, class Images
  @isHTMLImageElement: isHTMLImageElement = if global.HTMLImageElement
    (obj) -> obj instanceof HTMLImageElement
  else
    -> false

  @isImage: isImage = (o) -> o && (isFunction o.toImage) || isHTMLImageElement o

  @containsImages: (plainStructure)->
    foundImages = false
    deepEach plainStructure, (v) -> foundImages ||= isImage v
    foundImages

  @resolveImages: (plainStructure) ->
    # plainStructure
    deepAll deepMap plainStructure, (element) ->
      return element unless isImage element
      Promise.then ->
        if isHTMLImageElement element
          element
        else
          element.toImage()
      .then (htmlImageElement) ->
        htmlImageElement
        if htmlImageElement.complete
          htmlImageElement
        else
          new Promise (resolve) ->
            htmlImageElement.onload = -> resolve htmlImageElement


  @imgToDom: (image) ->
    minImageDisplaySize = point 32
    maxImageDisplaySize = point(1024, 512).mul devicePixelRatio

    size = point image.width, image.height

    scale = 1 / devicePixelRatio

    if !size.gte minImageDisplaySize
      scale *= Math.ceil minImageDisplaySize.div(size).min()
    else if !size.lt maxImageDisplaySize
      scale *= maxImageDisplaySize.div(size).min()

    Img
      src: image.src
      if size.gt point0
        style:
          width:  "#{image.naturalWidth  * scale | 0}px"
          height: "#{image.naturalHeight * scale | 0}px"
          "image-rendering": "pixelated"
