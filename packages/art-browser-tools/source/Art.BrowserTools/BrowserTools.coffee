{max, min, merge, hasProperties, object, defineModule, isNumber, getEnv, log, present, array, Promise, mergeInto} = require 'art-standard-lib'

fakeNativeApp = !!(getEnv().fakeNative || getEnv().fakeNativeApp)

defineModule module, class Browser
  isMobileBrowserRegExp1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
  # isMobileBrowserRegExp2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|agent wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|agent|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)agent|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[agent-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(agent|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-agent|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
  mergeInto @, require './Download'

  # https://www.keycdn.com/blog/web-crawlers/
  @isWebSpiderRegExp: isWebSpiderRegExp = /Googlebot|Google Web Preview|Google Page Speed Insights|Bingbot|Yahoo. *Slurp|DuckDuckBot|Baiduspider|YandexBot|Exabot|facebot|facebookexternalhit|alexa.com/i

  @getClientWidth: -> (document.documentElement ? document.body).clientWidth
  @getClientHeight: -> (document.documentElement ? document.body).clientWidth

  @iPhoneDeviceInformation:

    # http://iosres.com/
    # https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
    iPhonePointSizes: iPhonePointSizes =
      iPhone4:      [320,   480]
      iPhone5:      [320,   568]
      iPhone6:      [375,   667]
      iPhoneX:      [375,   812]
      iPhone6Plus:  [414,   736]
      iPhoneXSMax:  [414,   896]
      iPhoneXR:     [414,   896]

    iPhoneNotchSafePadding: iPhoneNotchSafePadding =
      top: 44
      bottom: 21

    iPhoneNotchSizes: iPhoneNotchSizes =
      iPhoneX:      30
      iPhoneXSMax:  30
      iPhoneXR:     30

    iPhoneDisplayScales: iPhoneDisplayScales =
      iPhone4:      2
      iPhone5:      2
      iPhone6:      2
      iPhone6Plus:  3
      iPhoneX:      3
      iPhoneXSMax:  3
      iPhoneXR:     2

    iPhoneDiagonalSizeInches: iPhoneDiagonalSizeInches =
      iPhone4:      3.5
      iPhone5:      4
      iPhone6:      4.7
      iPhone6Plus:  5.5
      iPhoneX:      5.8
      iPhoneXSMax:  6.5
      iPhoneXR:     6.1

    iPhonePixelsPerInch: iPhonePixelsPerInch =
      iPhone4:      326
      iPhone5:      326
      iPhone6:      326
      iPhone6Plus:  401
      iPhoneX:      458
      iPhoneXSMax:  458
      iPhoneXR:     326

    iPhonePixelSizes: iPhonePixelSizes = object iPhoneDisplayScales, (pixelsPerPoint, model) ->
      [x, y] = iPhonePointSizes[model]
      [x * pixelsPerPoint, y * pixelsPerPoint]

    iPhonePointsPerInch: object iPhonePointSizes, ([x, y], model) ->
      Math.sqrt(x * x + y * y) / iPhoneDiagonalSizeInches[model]

  @getAgent: getAgent = ->
    navigator = global.navigator ? ""
    navigator?.userAgent || navigator?.vendor || global.opera || ""

  artBrowserUserAgent: artBrowserUserAgent = getAgent()

  _safeAreaInsetCssKey = null
  @getSafeAreaInsetCssKey: ->
    {CSS} = global
    _safeAreaInsetCssKey ?= if CSS?.supports 'padding-bottom: env(safe-area-inset-bottom)'
      'env'
    else if CSS?.supports 'padding-bottom: constant(safe-area-inset-bottom)'
      'constant'
    else
      false

  # optionally provide the current viewSize as a fallback if getOrientationAngle is not available.
  @getOrientationIsPortrait: getOrientationIsPortrait = (viewSize) =>
    if isNumber o = @getOrientationAngle()
      (o % 180) == 0
    else if viewSize?
      viewSize.x <= viewSize.y
    else
      true

  # SEE: https://webkit.org/blog/7929/designing-websites-for-iphone-x/
  @getCssSafeAreaInset: =>
    if fakeNativeApp && iPhoneNotchSizes[simpleBrowserInfo.subDevice] > 0
      {top, bottom} = iPhoneNotchSafePadding
      if getOrientationIsPortrait()
        {
          left:   0
          right:  0
          top, bottom
        }
      else
        {
          left:   top
          right:  top
          top:    0
          bottom
        }

    else
      if key = @getSafeAreaInsetCssKey()
        div = document.createElement 'div'
        div.style.paddingTop    = "#{key}(safe-area-inset-top)"
        div.style.paddingLeft   = "#{key}(safe-area-inset-left)"
        div.style.paddingRight  = "#{key}(safe-area-inset-right)"
        div.style.paddingBottom = "#{key}(safe-area-inset-bottom)"

        document.body.appendChild div
        computedStyle = window.getComputedStyle div
        result =
          top   : parseInt(computedStyle.paddingTop)    | 0
          left  : parseInt(computedStyle.paddingLeft)   | 0
          right : parseInt(computedStyle.paddingRight)  | 0
          bottom: parseInt(computedStyle.paddingBottom) | 0

        document.body.removeChild div

      else
        result =
          top:    0
          left:   0
          right:  0
          bottom: 0

      if result.top == 0 && @iOSDetect() && @nativeAppDetect() && (@iPadDetect() || @getOrientationIsPortrait())
        merge result, top: 20
      else
        result

  ###
  regression userAgents:
    Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 650 Dual SIM) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254

  Compare with: http://www.whatsmyua.info/

  getSimpleBrowserInfo()  recomputes it every time - useful for testing in Chrome where it can change the userAgent dynamically
  simpleBrowserInfo:      computed at load
  ###
  @getSimpleBrowserInfo:

    unless global.navigator
      -> {}
    else ->
      artBrowserUserAgent = getAgent()

      os: switch
        when iOS          = /ipad|ipod|iphone/i.test artBrowserUserAgent then 'iOS'
        when windowsPhone = /Windows Phone/i.test artBrowserUserAgent then 'windowsPhone'
        when windows      = /windows/i.test artBrowserUserAgent then 'windows'
        when osx          = /mac os x/i.test artBrowserUserAgent then 'osx'
        when android      = /android/i.test artBrowserUserAgent then 'android'
        when linux        = /linux/.test artBrowserUserAgent then 'linux'
        else 'other'

      browser: switch
        when webSpider = isWebSpiderRegExp.test artBrowserUserAgent then 'webSpider'
        when ie11    = !!window.MSInputMethodContext && !!document.documentMode then 'ie11'
        when firefox = !!window.InstallTrigger then 'firefox'
        when safari  = iOS || /^((?!chrome|android).)*safari/i.test artBrowserUserAgent then 'safari'
        when edge    = /Edge/.test artBrowserUserAgent then 'edge'
        when opera   = window.opera? || /\ OPR\//.test artBrowserUserAgent then 'opera'
        when chrome  = /Chrome\/\d/i.test artBrowserUserAgent then 'chrome'
        else 'other'

      fakeNativeApp:  fakeNativeApp
      nativeApp:      nativeApp = !!(fakeNativeApp || global.cordova) # NOTE: 'native' is a javascript reserve-word

      devicePixelRatio: window.devicePixelRatio ? 1
      pixelsPerPoint: window.devicePixelRatio ? 1

      device: device = switch
        when iPhone = /iphone|ipod/i.test artBrowserUserAgent then 'iPhone'
        when iPad   = /ipad/i.test artBrowserUserAgent        then 'iPad'
        else 'other'

      touch: touch = iPhone || iPad || document.documentElement.ontouchstart?

      deviceMajorScreenSize: deviceMajorScreenSize = max screen.availWidth, screen.availHeight
      deviceMinorScreenSize: deviceMinorScreenSize = min screen.availWidth, screen.availHeight

      subDevice:
        switch device
          when "iPhone"
            found = null
            for k, [w, h] of iPhonePointSizes
              if w == deviceMinorScreenSize && h == deviceMajorScreenSize
                found = k
                break
            found ? 'other'
          else 'other'

      deviceType:
        if touch || iPad || iPhone
          ###
          Why 600?

          Tablets
            >= 600: The Nexus 7 is the smallest 'tablet-like' touch device I've found

          Phones
            <= 414: iPhones: iPhone8+, iPhoneXSMax are -= 414
            <= 480: Android: Ex: Samsung Galaxy Note 5
          ###
          if deviceMinorScreenSize < 600
            "phone"
          else
            "tablet"
        else "desktop"

  @simpleBrowserInfo: simpleBrowserInfo = @getSimpleBrowserInfo()

  @isMobileBrowser: -> isMobileBrowserRegExp1.test artBrowserUserAgent
  @isSafari:        -> !!simpleBrowserInfo.safari

  # these names are consistent with my lowerCamelCase scheme (they parse with codeWords), and make sense
  @nativeAppDetect: -> !!simpleBrowserInfo.nativeApp
  @isTouchDevice:   -> !!simpleBrowserInfo.touch
  @iOSDetect:       -> simpleBrowserInfo.os       == "iOS"
  @androidDetect:   -> simpleBrowserInfo.os       == "android"
  @iPhoneDetect:    -> simpleBrowserInfo.device   == "iPhone"
  @iPadDetect:      -> simpleBrowserInfo.device   == "iPad"
  @isIe11:          -> simpleBrowserInfo.browser  == "ie11" # https://stackoverflow.com/questions/21825157/internet-explorer-11-detection

  @getOrientationAngle: -> global.screen?.orientation?.angle ? global.orientation

  # resolves when the DOM is anything other than 'loading'
  @getDomReadyPromise: ->
    new Promise (resolve) =>
      {document} = global
      if !document || document.readyState != "loading"
        resolve()
      else
        document.addEventListener "readystatechange", =>
          if document.readyState == "interactive"
            resolve()

  @openLink: openLink = (link) ->
    global.open link, '_blank'

  @encodeUriQuery: encodeUriQuery = (query) ->
    return '' unless hasProperties query
    array(
      query
      when: (v, k) -> v? && present v
      with: (v, k) -> "#{k}=#{encodeURIComponent v}"
    ).join "&"

  @stripLeadingSlash: stripLeadingSlash = (a) -> a.match(/^\/?(.*)/)[1]
  @stripTrailingSlash: stripTrailingSlash = (a) -> a.match(/(^.*[^\/])\/?$/)[1]

  @uriPathJoin: uriPathJoin = (a, b) ->
    a = null unless present a
    b = null unless present b
    if a && b
      if /\:$/.test a
        "#{a}#{stripLeadingSlash b}"
      else
        "#{stripTrailingSlash a}/#{stripLeadingSlash b}"
    else if a
      a
    else if b
      b
    else ''

  @encodeUri: encodeUri = (options) ->
    {host, path, port, uri, protocol, query} = options
    unless present uri
      protocol  = if present protocol then protocol else ''
      host      = if present host     then host else ''
      protocolHost = if host
        "#{protocol}://#{host}"
      else if protocol
        "#{protocol}:"
      else ''

      port = if present port
        throw new Error "host required when specifying port" unless host
        ":#{port}"
      else ''

      uri = "#{protocolHost}#{port}"

    query = encodeUriQuery query

    query = if present query then "?#{query}" else ''

    "#{uriPathJoin uri, path}#{query}"

  @encodeMailto: encodeMailto = (options) ->
    {cc, bcc, subject, body, to = ''} = options
    encodeUri
      protocol: "mailto"
      path: to
      query: {cc, bcc, subject, body}

  @sendEmail: (options) ->
    openLink encodeMailto options

  # the 'download' attribute doesn't seem to be well supported
  # It may work better if it is the same-domain
  #   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
  # CanIUse has a slightly different take - see known-issues
  #   https://caniuse.com/#search=download
  # Currently, only Chrome seems to automatically start a download
  @startHtmlFileDownload: (filename, url) ->
    element = document.createElement 'a'
    element.setAttribute 'target', '_blank'
    element.setAttribute 'href', url
    element.setAttribute 'download', filename

    element.style.display = 'none'
    document.body.appendChild element
    element.click()
    document.body.removeChild element
    console.log {element}
