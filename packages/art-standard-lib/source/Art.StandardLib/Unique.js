// Generated by CoffeeScript 1.12.7
(function() {
  var Unique, nextId;

  nextId = 1;

  module.exports = Unique = (function() {
    var nextUniqueObjectId, objectId;

    function Unique() {}

    Unique.nextUniqueObjectId = nextUniqueObjectId = function() {
      return "object_" + nextId++;
    };

    Unique.objectId = objectId = function(o) {
      if (o.hasOwnProperty("__uniqueId")) {
        return o.__uniqueId || (o.__uniqueId = nextUniqueObjectId());
      } else {
        Object.defineProperty(o, "__uniqueId", {
          enumerable: false,
          value: nextUniqueObjectId()
        });
        return o.__uniqueId;
      }
    };

    Unique.id = function(key) {
      if (typeof key === "object" || typeof key === "function") {
        if (key) {
          if (typeof key.getUniqueId === "function") {
            return key.getUniqueId();
          } else {
            return objectId(key);
          }
        } else {
          return "null";
        }
      } else if (typeof key === "number") {
        return "" + key;
      } else if (typeof key === "symbol") {
        return key.toString();
      } else if (typeof key === "string") {
        return "string_" + key;
      } else if (typeof key === "boolean") {
        if (key) {
          return "true";
        } else {
          return "false";
        }
      } else if (key === void 0) {
        return "undefined";
      } else {
        return (typeof key) + "_" + key;
      }
    };

    return Unique;

  })();

}).call(this);