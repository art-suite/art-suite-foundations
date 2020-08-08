"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["hasProperties", "encodeURIComponent", "present", "Error"],
    [global, require("./StandardImport")],
    (hasProperties, encodeURIComponent, present, Error) => {
      let UriBrowserTools;
      return (UriBrowserTools = Caf.defClass(
        class UriBrowserTools extends Object {},
        function(UriBrowserTools, classSuper, instanceSuper) {
          let encodeUriQuery,
            stripLeadingSlash,
            stripTrailingSlash,
            uriPathJoin,
            encodeUri;
          this.encodeUriQuery = encodeUriQuery = function(query) {
            if (!hasProperties(query)) {
              return "";
            }
            return Caf.array(
              query,
              (v, k) =>
                `${Caf.toString(k)}=${Caf.toString(encodeURIComponent(v))}`,
              (v, k) => v != null && present(v)
            ).join("&");
          };
          this.stripLeadingSlash = stripLeadingSlash = function(a) {
            return a.match(/^\/?(.*)/)[1];
          };
          this.stripTrailingSlash = stripTrailingSlash = function(a) {
            return a.match(/(^.*[^\/])\/?$/)[1];
          };
          this.uriPathJoin = uriPathJoin = function(a, b) {
            if (!present(a)) {
              a = null;
            }
            if (!present(b)) {
              b = null;
            }
            return a && b
              ? /\:$/.test(a)
                ? `${Caf.toString(a)}${Caf.toString(stripLeadingSlash(b))}`
                : `${Caf.toString(stripTrailingSlash(a))}/${Caf.toString(
                    stripLeadingSlash(b)
                  )}`
              : a || b || "";
          };
          this.encodeUri = encodeUri = function(options) {
            let host, path, port, uri, protocol, query, protocolHost;
            host = options.host;
            path = options.path;
            port = options.port;
            uri = options.uri;
            protocol = options.protocol;
            query = options.query;
            if (!present(uri)) {
              protocol = present(protocol) ? protocol : "";
              host = present(host) ? host : "";
              protocolHost = (() => {
                switch (false) {
                  case !host:
                    return `${Caf.toString(protocol)}://${Caf.toString(host)}`;
                  case !protocol:
                    return `${Caf.toString(protocol)}:`;
                  default:
                    return "";
                }
              })();
              port = present(port)
                ? (!host
                    ? (() => {
                        throw new Error("host required when specifying port");
                      })()
                    : undefined,
                  `:${Caf.toString(port)}`)
                : "";
              uri = `${Caf.toString(protocolHost)}${Caf.toString(port)}`;
            }
            query = encodeUriQuery(query);
            query = present(query) ? `?${Caf.toString(query)}` : "";
            return `${Caf.toString(uriPathJoin(uri, path))}${Caf.toString(
              query
            )}`;
          };
        }
      ));
    }
  );
});
