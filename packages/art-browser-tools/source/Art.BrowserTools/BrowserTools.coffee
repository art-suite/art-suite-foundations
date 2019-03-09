{max, min, merge, hasProperties, object, defineModule, isNumber, getEnv, log, present, array, Promise, mergeInto} = require 'art-standard-lib'

fakeNativeApp = !!(getEnv().fakeNative || getEnv().fakeNativeApp)

defineModule module, [
  require './Download'
  require './Dom'
  require './EmailBrowserTools'
  require './UriBrowserTools'
  require './BrowserDetection'
  require './UseragentRegExp'

  iPhoneDeviceInformation: require './iPhoneDeviceInformation'

]