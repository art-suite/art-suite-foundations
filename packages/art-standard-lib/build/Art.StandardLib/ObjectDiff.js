// Generated by CoffeeScript 1.12.7
(function() {
  var ObjectDiff;

  module.exports = ObjectDiff = (function() {
    var defaultEq;

    function ObjectDiff() {}

    defaultEq = function(a, b) {
      return a === b;
    };


    /*
    SBD this has been thouroughly benchmarked on Safari and Chrome as of 2015-11-06
    This is as fast as I could make it.
    
    IN:
      newObj:   the changed-to object   (must be set)
      oldObj:   the changed-from object (default: {})
      added:    (key, newValue) -> null
                called for each key in newObj that was not in oldObj
      removed:  (key, oldValue) -> null
                called for each key in oldObj that is not in newObj
      changed:  (key, newValue, oldValue) -> null
                called for each key in both where the value changed
      noChange: (key, value) -> null
                called for each key in both where the value stayed the same
      eqTester: (a, b) -> true if a is equal to b
                DEFAULT: use javascript ===
                provided for custom concepts of equality
      oldObjKeyCount: null or a the number of keys in oldObj
        This last field provides an opportunity for further performance improvement.
        If you have previously computed the number of keys in oldObj, pass it in.
        Counting the number of keys in an object can be slow. If we know the number
        of keys this routine can be more efficient.
    
        NOTE that this function returns the key-count of the new object. That way if you
        are calling objecfDiff several times over a sequence of object changes, can you keep
        the results from this function, you already have the oldObjKeyCount for the next call.
    
    OUT: newObjKeyCount - number of keys in the new object
     */

    ObjectDiff.objectDiff = function(newObj, oldObj, added, removed, changed, noChange, eqTester, oldObjKeyCount) {
      var k, newObjKeyCount, newValue, oldObjKeyCountIsAtLeast, oldValue;
      if (eqTester == null) {
        eqTester = defaultEq;
      }
      newObjKeyCount = 0;
      if (!oldObj) {
        for (k in newObj) {
          newValue = newObj[k];
          newObjKeyCount++;
          added(k, newValue);
        }
        return newObjKeyCount;
      }
      oldObjKeyCountIsAtLeast = 0;
      for (k in newObj) {
        newValue = newObj[k];
        newObjKeyCount++;
        if (typeof (oldValue = oldObj[k]) !== "undefined" || oldObj.hasOwnProperty(k)) {
          oldObjKeyCountIsAtLeast++;
          if (!eqTester(newValue, oldValue)) {
            changed(k, newValue, oldValue);
          } else {
            if (typeof noChange === "function") {
              noChange(k, newValue);
            }
          }
        } else {
          added(k, newValue);
        }
      }
      if (!(oldObjKeyCount != null) || oldObjKeyCountIsAtLeast !== oldObjKeyCount) {
        for (k in oldObj) {
          if (!(typeof newObj[k] !== "undefined" || newObj.hasOwnProperty(k))) {
            removed(k, oldObj[k]);
          }
        }
      }
      return newObjKeyCount;
    };


    /*
    IN:
      newObj, oldObj, eqTester >> see above
    OUT:
      no changes: null
      otherwise:
        added:    key: addedItem
        removed:  key: removedItem
        changed:  key: {oldItem, newItem}
     */

    ObjectDiff.objectDiffReport = function(newObj, oldObj, eqTester) {
      var added, changed, different, removed;
      added = {};
      removed = {};
      changed = {};
      different = null;
      ObjectDiff.objectDiff(newObj, oldObj, function(key, addedItem) {
        different = true;
        return added[key] = addedItem;
      }, function(key, removedItem) {
        different = true;
        return removed[key] = removedItem;
      }, function(key, newItem, oldItem) {
        different = true;
        return changed[key] = {
          oldItem: oldItem,
          newItem: newItem
        };
      }, null, eqTester);
      return different && {
        added: added,
        removed: removed,
        changed: changed
      };
    };

    return ObjectDiff;

  })();

}).call(this);

//# sourceMappingURL=ObjectDiff.js.map