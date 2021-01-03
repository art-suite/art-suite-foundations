// Generated by CoffeeScript 1.12.7
(function() {
  var BaseClass, WriteStream, Xbd, XbdDictionary, XbdTag, binary, compactFlatten, countKeys, createObjectTreeFactories, defineModule, inspect, isFunction, isString, log, object, objectHasKeys, plainObjectsDeepEq, ref, ref1, stream, upperCamelCase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Xbd = require('./namespace');

  XbdDictionary = require('./XbdDictionary');

  ref = require('art-standard-lib'), isFunction = ref.isFunction, log = ref.log, countKeys = ref.countKeys, upperCamelCase = ref.upperCamelCase, plainObjectsDeepEq = ref.plainObjectsDeepEq, inspect = ref.inspect, compactFlatten = ref.compactFlatten, object = ref.object, isString = ref.isString, objectHasKeys = ref.objectHasKeys, defineModule = ref.defineModule;

  BaseClass = require('art-class-system').BaseClass;

  createObjectTreeFactories = require('art-object-tree-factory').createObjectTreeFactories;

  ref1 = require('art-binary'), binary = ref1.binary, stream = ref1.stream, WriteStream = ref1.WriteStream;

  defineModule(module, XbdTag = (function(superClass) {
    var indentString, writeXbdHeader, xbdHeader;

    extend(XbdTag, superClass);


    /*
    IN:
      tagNames: string or array of strings which is compactFlattened
        every string is split into tag-names with this pattern: /[a-z0-9_]+/ig
      factoryNameSuffix: DEFAULT: 'Tag'
        Optional suffix for the names of the factories returned.
        Factor names are upperCamelCased from the tag-names and then the suffix is appended.
    OUT:
      map from upperCamelCase(tag-names) to:
        -> XbdTag
        IN:
          any sequence:
            plainObjects (which are merged into attrs)
            XbdTags (which become sub-tags)
            or arrays which are flattened
    
        OUT: XbdTag
    
    Example:
      {MyTag, TagA, TagB} = createTagFactories "myTag tagA tagB"
      rootTag = MyTag
        foo: "bar"
        TagA()
        TagA foo: "far"
        TagB fab: "bar"
     */

    XbdTag.createTagFactories = function(tagNames, factoryNameSuffix) {
      if (factoryNameSuffix == null) {
        factoryNameSuffix = 'Tag';
      }
      return createObjectTreeFactories({
        suffix: factoryNameSuffix
      }, tagNames, function(tagName, attrs, subTags) {
        return new XbdTag(tagName, attrs, subTags);
      });
    };

    XbdTag.fromXbd = function(input) {
      var header;
      input = stream(input);
      header = input.read(xbdHeader.length);
      return XbdTag._parse(input, XbdDictionary.parse(input, "tag names"), XbdDictionary.parse(input, "attribute names"), XbdDictionary.parse(input, "attribute values"));
    };


    /*
    IN:
      name: string
      attrs: map of keys to string/binary-string values
      tags: array of sub-tags
     */

    function XbdTag(name1, attrs1, tags1) {
      this.name = name1;
      this.attrs = attrs1 != null ? attrs1 : {};
      this.tags = tags1 != null ? tags1 : [];
    }

    XbdTag.prototype.inspect = function() {
      return this.toXml('  ');
    };

    XbdTag.prototype.eq = function(b) {
      return b && plainObjectsDeepEq(this.plainObjects, b.plainObjects);
    };


    /*
    toXbd
    IN:  inputs are for internal use. Pass in 0 args.
    OUT: promise.then (xbdBinaryString) ->
    
    Example:
    
      myRootTag.toXbd()
      .then (binaryString) ->
        binaryString.utf8Array # do something with it
     */

    XbdTag.prototype.toXbd = function() {
      var attrNamesDictionary, attrValuesDictionary, ref2, tagNamesDictionary, writeStream;
      ref2 = this, tagNamesDictionary = ref2.tagNamesDictionary, attrNamesDictionary = ref2.attrNamesDictionary, attrValuesDictionary = ref2.attrValuesDictionary;
      writeXbdHeader(writeStream = new WriteStream);
      return tagNamesDictionary.writeWithPromise(writeStream).then(function() {
        return attrNamesDictionary.writeWithPromise(writeStream);
      }).then(function() {
        return attrValuesDictionary.writeWithPromise(writeStream);
      }).then((function(_this) {
        return function() {
          return _this._getBinaryStringPromise(tagNamesDictionary, attrNamesDictionary, attrValuesDictionary);
        };
      })(this)).then(function(binaryString) {
        writeStream.writeAsiString(binaryString);
        return writeStream.binaryStringPromise;
      });
    };

    XbdTag.prototype.find = function(tagSearch, into) {
      var i, len, ref2, tag;
      if (into == null) {
        into = [];
      }
      ref2 = this.tags;
      for (i = 0, len = ref2.length; i < len; i++) {
        tag = ref2[i];
        if (tag.name.match(tagSearch)) {
          into.push(tag);
        } else {
          tag.find(tagSearch, into);
        }
      }
      return into;
    };

    XbdTag.prototype.tag = function(name) {
      var i, len, ref2, tag;
      ref2 = this.tags;
      for (i = 0, len = ref2.length; i < len; i++) {
        tag = ref2[i];
        if (tag.name === name) {
          return tag;
        }
      }
      return null;
    };

    XbdTag.prototype.toString = function() {
      return this.toXml("  ");
    };

    XbdTag.prototype.toPlainObjects = function() {
      var obj, plainAttrs, plainTags, ref2, tag;
      if (objectHasKeys(this.attrs)) {
        plainAttrs = this.attrs;
      }
      if (((ref2 = this.tags) != null ? ref2.length : void 0) > 0) {
        plainTags = (function() {
          var i, len, ref3, results;
          ref3 = this.tags;
          results = [];
          for (i = 0, len = ref3.length; i < len; i++) {
            tag = ref3[i];
            results.push(tag.toPlainObjects());
          }
          return results;
        }).call(this);
      }
      return (
        obj = {},
        obj["XbdTag_" + this.name] = plainAttrs ? plainTags ? compactFlatten([plainAttrs, plainTags]) : plainAttrs : plainTags != null ? plainTags : {},
        obj
      );
    };

    XbdTag.prototype.toXml = function(indent) {
      var attr_xml;
      if (indent == null) {
        indent = "";
      }
      attr_xml = "";
      if (this.attrs && (attr_xml = this._attributesXml())) {
        attr_xml = " " + attr_xml;
      }
      if (this.tags.length === 0) {
        return "<" + this.name + attr_xml + "/>";
      } else {
        return "<" + this.name + attr_xml + ">\n" + (this._tagsXml(indent)) + "\n</" + this.name + ">";
      }
    };

    XbdTag.getter({
      xbdPromise: function() {
        return this.toXbd();
      },
      xml: function() {
        return this.toXml();
      },
      plainObjects: function() {
        return this.toPlainObjects();
      },
      inspectedObjects: function() {
        return this.toPlainObjects();
      },
      tagNamesDictionary: function(dictionary) {
        var i, len, ref2, tag;
        if (dictionary == null) {
          dictionary = new XbdDictionary([], 'tag names');
        }
        dictionary.add(this.name);
        ref2 = this.tags;
        for (i = 0, len = ref2.length; i < len; i++) {
          tag = ref2[i];
          tag.getTagNamesDictionary(dictionary);
        }
        return dictionary;
      },
      attrNamesDictionary: function(dictionary) {
        var i, k, len, ref2, ref3, tag, v;
        if (dictionary == null) {
          dictionary = new XbdDictionary([], 'attribute names');
        }
        ref2 = this.attrs;
        for (k in ref2) {
          v = ref2[k];
          dictionary.add(k);
        }
        ref3 = this.tags;
        for (i = 0, len = ref3.length; i < len; i++) {
          tag = ref3[i];
          tag.getAttrNamesDictionary(dictionary);
        }
        return dictionary;
      },
      attrValuesDictionary: function(dictionary) {
        var i, k, len, ref2, ref3, tag, v;
        if (dictionary == null) {
          dictionary = new XbdDictionary([], 'attribute values');
        }
        ref2 = this.attrs;
        for (k in ref2) {
          v = ref2[k];
          dictionary.add(v);
        }
        ref3 = this.tags;
        for (i = 0, len = ref3.length; i < len; i++) {
          tag = ref3[i];
          tag.getAttrValuesDictionary(dictionary);
        }
        return dictionary;
      }
    });

    xbdHeader = "SBDXML\x01\x00";

    writeXbdHeader = function(writeStream) {
      writeStream.write("SBDXML");
      return writeStream.write([1, 0]);
    };

    indentString = function(str, indentStr) {
      return indentStr + str.split("\n").join("\n" + indentStr);
    };

    XbdTag.prototype._attributesXml = function() {
      var k, out, v;
      out = (function() {
        var ref2, results;
        ref2 = this.attrs;
        results = [];
        for (k in ref2) {
          v = ref2[k];
          results.push(k + "='" + v + "'");
        }
        return results;
      }).call(this);
      return out.join(" ");
    };

    XbdTag.prototype._tagsXml = function(indent) {
      var out;
      out = this.tags.map(function(tag) {
        return tag.toXml(indent);
      });
      return indentString(out.join("\n"), indent);
    };

    XbdTag.prototype._getAttributesBinaryStringPromise = function(attrNamesDictionary, attrValuesDictionary) {
      var name, ref2, value, writeStream;
      writeStream = new WriteStream;
      ref2 = this.attrs;
      for (name in ref2) {
        value = ref2[name];
        writeStream.writeAsi(attrNamesDictionary.get(name));
        writeStream.writeAsi(attrValuesDictionary.get(value));
      }
      return writeStream.binaryStringPromise;
    };

    XbdTag.prototype._writeSubTagsWithPromise = function(writeStream, tagNamesDictionary, attrNamesDictionary, attrValuesDictionary) {
      var index, processNext;
      index = 0;
      processNext = (function(_this) {
        return function() {
          var ref2, tag;
          if (tag = (ref2 = _this.tags) != null ? ref2[index++] : void 0) {
            return tag._getBinaryStringPromise(tagNamesDictionary, attrNamesDictionary, attrValuesDictionary).then(function(binaryString) {
              writeStream.writeAsiString(binaryString);
              return processNext();
            });
          } else {
            return Promise.resolve();
          }
        };
      })(this);
      return processNext();
    };

    XbdTag.prototype._getBinaryStringPromise = function(tagNamesDictionary, attrNamesDictionary, attrValuesDictionary) {
      var writeStream;
      writeStream = new WriteStream;
      writeStream.writeAsi(tagNamesDictionary.get(this.name));
      return this._getAttributesBinaryStringPromise(attrNamesDictionary, attrValuesDictionary).then((function(_this) {
        return function(attributesBinaryString) {
          writeStream.writeAsiString(attributesBinaryString);
          return _this._writeSubTagsWithPromise(writeStream, tagNamesDictionary, attrNamesDictionary, attrValuesDictionary);
        };
      })(this)).then(function() {
        return writeStream.binaryStringPromise;
      });
    };

    XbdTag._parse = function(stream, tagsd, attrsd, valuesd) {
      var attrData, attrs, n, name, name1, subTag, tagData, tags, v;
      tagData = stream.readAsiString();
      name = tagsd.readString(tagData).toString();
      attrData = tagData.readAsiString();
      attrs = null;
      while (!attrData.done()) {
        if (!attrs) {
          attrs = {};
        }
        n = attrsd.readString(attrData).toString();
        v = valuesd.readString(attrData);
        attrs[n] = v;
      }
      tags = [];
      while (!tagData.done()) {
        subTag = XbdTag._parse(tagData, tagsd, attrsd, valuesd);
        tags.push(subTag);
        tags[name1 = subTag.name] || (tags[name1] = subTag);
      }
      return new XbdTag(name, attrs, tags);
    };

    return XbdTag;

  })(BaseClass));

}).call(this);