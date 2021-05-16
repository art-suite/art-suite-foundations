"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let UseragentRegExp;
  return (UseragentRegExp = Caf.defClass(
    class UseragentRegExp extends Object {},
    function (UseragentRegExp, classSuper, instanceSuper) {
      this.isMobileBrowserRegExp1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge|maemo|midp|mmp|mobile.+firefox|netfront|operam(ob|in)i|palm(os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windowsce|xda|xiino|android|ipad|playbook|silk/i;
      this.isWebSpiderRegExp = /Googlebot|GoogleWebPreview|GooglePageSpeedInsights|Bingbot|Yahoo.*Slurp|DuckDuckBot|Baiduspider|YandexBot|Exabot|facebot|facebookexternalhit|alexa.com/i;
    }
  ));
});
