module.exports ={
  isNonNegativeInt: (obj) => obj != null && obj >= 0,
  hasOwnProperties: (obj) => {
    if (obj == null) return false;
    for (let key in obj) if (obj.hasOwnProperty(key)) return true;
    return false;
  },
  hasProperties: function(obj) {
    if (obj == null) return false;
    for (let key in obj) return true;
    return false;
  }
}
