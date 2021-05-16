"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "Error",
      "isClass",
      "isFunction",
      "isPlainObject",
      "Object",
      "compactFlattenFast",
      "fastBind",
      "compactFlattenAllFast",
      "isString",
      "w",
      "upperCamelCase",
    ],
    [global, require("art-standard-lib")],
    (
      Error,
      isClass,
      isFunction,
      isPlainObject,
      Object,
      compactFlattenFast,
      fastBind,
      compactFlattenAllFast,
      isString,
      w,
      upperCamelCase
    ) => {
      let mergeIntoBasic, preprocessElementBasic, ObjectTreeFactory;
      mergeIntoBasic = function (_into, source) {
        let from, into, temp;
        return (
          (from = source),
          (into = _into),
          from != null
            ? (() => {
                for (let k in from) {
                  let v;
                  v = from[k];
                  temp = into[k] = v;
                }
                return temp;
              })()
            : undefined,
          into
        );
      };
      preprocessElementBasic = function (a) {
        return a;
      };
      return (ObjectTreeFactory = Caf.defClass(
        class ObjectTreeFactory extends Object {},
        function (ObjectTreeFactory, classSuper, instanceSuper) {
          let _makeCreateFactory;
          this.createObjectTreeFactory = (...args) => {
            let options,
              klass,
              nodeFactory,
              mergePropsInto,
              preprocessElement,
              name,
              inspectedName,
              bindList,
              temp;
            options = klass = nodeFactory = null;
            Caf.each2(
              args,
              (a) =>
                (() => {
                  switch (false) {
                    case !isClass(a):
                      return (klass = a);
                    case !isFunction(a):
                      return (nodeFactory = a);
                    case !isPlainObject(a):
                      return (options = a);
                  }
                })(),
              (a) => a != null
            );
            if (Caf.exists(options)) {
              mergePropsInto = options.mergePropsInto;
              preprocessElement = options.preprocessElement;
              name = options.name;
              inspectedName =
                undefined !== (temp = options.inspectedName) ? temp : name;
              bindList = options.bind;
            }
            klass != null
              ? klass
              : (klass = Caf.exists(options) && options.class);
            if (!(((nodeFactory != null) !== klass) != null)) {
              throw new Error("Must pass exactly one Function or one Class");
            }
            return this._bindFactoryInfo(
              _makeCreateFactory()(
                nodeFactory != null
                  ? nodeFactory
                  : (props, children) => new klass(props, children),
                preprocessElement != null
                  ? preprocessElement
                  : preprocessElementBasic,
                mergePropsInto != null ? mergePropsInto : mergeIntoBasic
              ),
              inspectedName,
              klass,
              bindList
            );
          };
          this.createObjectTreeFactories = null;
          _makeCreateFactory = function () {
            return eval(
              "(function(e,l,n){let f,u,r,t,i=(e=>{let a,c,s,h;e=l(e,f);if(e!=null&&e!==false){switch(e.constructor){case Object:if(r==null){r=e}else{if(u==null){n(u={},r)}n(u,e)}break;case Array:a=e;c=a;if(a!=null){s=a.length;h=0;while(h<s){let e;e=a[h];i(e);h++}}c;break;default:(t!=null?t:t=[]).push(e)}}return null});return f=((...l)=>{let n,f,a,c;t=u=r=undefined;n=l;f=n;if(n!=null){a=n.length;c=0;while(c<a){let e;e=n[c];i(e);c++}}f;return e(u||r,t)})});"
            );
          };
          this._bindFactoryInfo = function (Factory, name, klass, bindList) {
            let abstractClass, from, into, temp;
            if (klass) {
              name != null
                ? name
                : (name = Caf.isF(klass.getName) && klass.getName());
              Factory.class = klass;
              klass.Factory = Factory;
              abstractClass =
                (Caf.isF(klass.getAbstractClass) && klass.getAbstractClass()) ||
                Object;
              bindList = compactFlattenFast([
                ((from = klass),
                (into = []),
                from != null
                  ? (() => {
                      for (let k1 in from) {
                        let v, k;
                        v = from[k1];
                        k = k1;
                        temp =
                          !abstractClass[k] && isFunction(v)
                            ? into.push(k)
                            : undefined;
                      }
                      return temp;
                    })()
                  : undefined,
                into),
                bindList,
              ]);
              name != null ? name : (name = klass.getName() + "Factory");
              Caf.each2(
                bindList,
                (k) => (Factory[k] = fastBind(klass[k], klass))
              );
            }
            Factory._name = name != null ? name : (name = "ObjectTreeFactory");
            Factory.inspect = () => `<${Caf.toString(name)}>`;
            return Factory;
          };
          this.createObjectTreeFactories = this.createObjectTreeFactory(
            {
              mergePropsInto: function (a, b) {
                a.names = compactFlattenAllFast(a.names, b.names);
                return Caf.object(b, null, (v, k) => k !== "names", a);
              },
              preprocessElement: function (element) {
                return isString(element) ? { names: w(element) } : element;
              },
            },
            (props, children) => {
              let nodeFactory, nodeClass;
              if (children) {
                [nodeFactory] = children;
              }
              return (() => {
                switch (false) {
                  case !isClass((nodeClass = nodeFactory)):
                    return this._createObjectTreeFactoriesFromFactories(
                      props,
                      props.names,
                      (name, props, children) =>
                        new nodeClass(name, props, children)
                    );
                  case !(nodeFactory.length === 1):
                    return this._createObjectTreeFactoriesFromFactoryFactories(
                      props,
                      props.names,
                      nodeFactory
                    );
                  default:
                    return this._createObjectTreeFactoriesFromFactories(
                      props,
                      props.names,
                      nodeFactory
                    );
                }
              })();
            }
          );
          this._createObjectTreeFactoriesFromFactories = (
            options,
            list,
            nodeFactory
          ) => {
            let suffix, out;
            suffix = options.suffix || "";
            out = {};
            Caf.each2(list, (nodeTypeName) =>
              ((nodeTypeName) => {
                options.inspectedName = nodeTypeName;
                return (out[
                  upperCamelCase(nodeTypeName) + suffix
                ] = this.createObjectTreeFactory(options, (props, children) =>
                  nodeFactory(nodeTypeName, props, children)
                ));
              })(nodeTypeName)
            );
            return out;
          };
          this._createObjectTreeFactoriesFromFactoryFactories = (
            options,
            list,
            nodeFactoryFactory
          ) => {
            let suffix, out;
            suffix = options.suffix || "";
            out = {};
            Caf.each2(list, (nodeTypeName) => {
              let nodeFactory, name;
              nodeFactory = nodeFactoryFactory(nodeTypeName);
              name = upperCamelCase(nodeTypeName) + suffix;
              options.inspectedName = name;
              return (out[name] = this.createObjectTreeFactory(
                options,
                nodeFactory
              ));
            });
            return out;
          };
        }
      ));
    }
  );
});
