"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["BaseClass", "capitalizedDashCase", "merge", "isNumber", "Error", "log", "appendQuery", "Promise", "objectKeyCount", "JSON", "present", "timeout", "RequestError", "aborted", "serverFailure", "decodeHttpStatus", "networkFailure", "success"], [global, require('art-standard-lib'), require('art-communication-status'), require('art-class-system')], (BaseClass, capitalizedDashCase, merge, isNumber, Error, log, appendQuery, Promise, objectKeyCount, JSON, present, timeout, RequestError, aborted, serverFailure, decodeHttpStatus, networkFailure, success) => {let realRequire, XMLHttpRequest, FormData, RestClient, temp; if (!global.XMLHttpRequest) {realRequire = eval("require"); global.XMLHttpRequest = realRequire("xhr2");}; temp = global; XMLHttpRequest = temp.XMLHttpRequest; FormData = temp.FormData; return RestClient = Caf.defClass(class RestClient extends BaseClass {}, function(RestClient, classSuper, instanceSuper) {let normalizeHeaders, legalVerbs; this.singletonClass(); this.RestClientClass = RestClient; this.normalizeHeaders = normalizeHeaders = function(headers) {return Caf.object(headers, null, null, null, (v, k) => capitalizedDashCase(k));}; this.legalVerbs = legalVerbs = {}; Caf.each2(["get", "put", "post", "delete", "head"], (v) => {let upper; upper = v.toUpperCase(); return legalVerbs[v.toLowerCase()] = legalVerbs[upper] = upper;}); this.get = function(url, options) {return RestClient.singleton.get(url, options);}; this.put = function(url, data, options) {return RestClient.singleton.put(url, data, options);}; this.post = function(url, data, options) {return RestClient.singleton.post(url, data, options);}; this.delete = function(url, options) {return RestClient.singleton.delete(url, options);}; this.getArrayBuffer = function(url, options) {return RestClient.singleton.getArrayBuffer(url, options);}; this.getJson = function(url, options) {return RestClient.singleton.getJson(url, options);}; this.deleteJson = function(url, options) {return RestClient.singleton.deleteJson(url, options);}; this.putJson = function(url, data, options) {return RestClient.singleton.putJson(url, data, options);}; this.postJson = function(url, data, options) {return RestClient.singleton.postJson(url, data, options);}; this.restRequest = function(options) {return RestClient.singleton.restRequest(options);}; this.restJsonRequest = function(options) {return RestClient.singleton.restJsonRequest(options);}; this.prototype.get = function(url, options) {return this.restRequest(merge(options, {verb: "GET", url}));}; this.prototype.put = function(url, data, options) {return this.restRequest(merge(options, {verb: "PUT", url, data}));}; this.prototype.post = function(url, data, options) {return this.restRequest(merge(options, {verb: "POST", url, data}));}; this.prototype.delete = function(url, options) {return this.restRequest(merge(options, {verb: "DELETE", url}));}; this.prototype.getArrayBuffer = function(url, options) {return this.restRequest(merge(options, {verb: "GET", url, responseType: "arraybuffer"}));}; this.prototype.getJson = function(url, options) {return this.restJsonRequest(merge(options, {verb: "get", url}));}; this.prototype.deleteJson = function(url, options) {return this.restJsonRequest(merge(options, {verb: "delete", url}));}; this.prototype.putJson = function(url, data, options) {return this.restJsonRequest(merge(options, {verb: "put", url, data}));}; this.prototype.postJson = function(url, data, options) {return this.restJsonRequest(merge(options, {verb: "post", url, data}));}; this.prototype.restRequest = function(options) {let body, data, formData, headers, method, normalizedHeaders, onProgress, query, responseType, returnResponseObject, showProgressAfter, url, verb, verbose, specifiedVerb; body = options.body; data = options.data; formData = options.formData; headers = options.headers; method = options.method; normalizedHeaders = options.normalizedHeaders; onProgress = options.onProgress; query = options.query; responseType = options.responseType; returnResponseObject = options.returnResponseObject; showProgressAfter = options.showProgressAfter; url = options.url; verb = options.verb; verbose = options.verbose; if (!isNumber(showProgressAfter)) {showProgressAfter = 100;}; method != null ? method : method = verb; body != null ? body : body = data; if (!(method = RestClient.legalVerbs[specifiedVerb = method])) {throw new Error(`invalid method: ${Caf.toString(specifiedVerb)}`);}; if (formData) {if (body) {throw new Error("can't specify both 'body' and 'formData'");}; body = new FormData; Caf.each2(formData, (v, k) => body.append(k, v));} else {body = Caf.exists(body) && (Caf.isF(body.toArrayBuffer) && body.toArrayBuffer()) || body;}; if (method === "GET" && body) {log.error({RestClient_restRequest: {options, info: "can't GET with body"}}); throw new Error("With their ultimate wisdom, the gods decree: NO DATA WITH GET");}; if (query) {url = appendQuery(url, query);}; return this._normalizedRestRequest({verbose, method, url, body, onProgress, responseType, showProgressAfter, returnResponseObject, headers: merge(normalizedHeaders, normalizeHeaders(headers))});}; this.prototype.restJsonRequest = function(options) {return Promise.then(() => {let verb, method, data, headers; ({verb, method, data, headers} = options); verb = RestClient.legalVerbs[verb || method]; if (data && objectKeyCount(data) === 0) {data = null;}; if (verb === "GET" && options.data) {options = merge(options, {url: appendQuery(options.url, Caf.object(data, (v) => JSON.stringify(v)))}); data = null;} else {data && (data = JSON.stringify(data));}; return this.restRequest(merge(options, {data}, {responseType: "json", headers: merge({Accept: "application/json", "Content-Type": "application/json"}, headers)}));});}; this.prototype._normalizedRestRequest = function(options) {let method, url, body, headers, onProgress, responseType, showProgressAfter, verbose, returnResponseObject; method = options.method; url = options.url; body = options.body; headers = options.headers; onProgress = options.onProgress; responseType = options.responseType; showProgressAfter = options.showProgressAfter; verbose = options.verbose; returnResponseObject = options.returnResponseObject; return new Promise((resolve, reject) => {let fail, restRequestStatus, request, getErrorResponse, getResponse, requestResolved, initialProgressCalled, lastProgressEvent, progressCallbackInternal; fail = (props) => reject(new RequestError(merge(props, {body, headers, responseType, sourceLib: "ArtRestClient", key: url, type: method, responseUrl: request.responseURL, progress: restRequestStatus.progress}))); restRequestStatus = {request: request = new XMLHttpRequest, options, progress: 0, abort: () => {request.abort(); return fail({status: aborted, message: "XMLHttpRequest aborted"});}}; getErrorResponse = () => {let error; return (() => {try {return getResponse();} catch (error1) {error = error1; return {status: serverFailure, rawResponse: request.response, message: `ArtRestClient: Error parsing server's response: ${Caf.toString(error)}\nrawResponse: ${Caf.toString(request.response)}`};};})();}; getResponse = () => {let response; ({response} = request); return returnResponseObject ? merge({headers: Caf.object(Caf.array(request.getAllResponseHeaders().split(/\s*\r?\n\s*/g), (line) => line.split(/\:\s*/)), ([key, value]) => value, null, null, ([key, value]) => key), body: response}, decodeHttpStatus(request.status)) : (response && responseType === "json") ? JSON.parse(response) : response;}; request.open(method, url, true); if (present(responseType) && responseType !== "json") {request.responseType = responseType;}; Caf.each2(headers, (v, k) => request.setRequestHeader(k, v)); requestResolved = false; request.addEventListener("error", (event) => {requestResolved = true; return fail({status: networkFailure, message: "XMLHttpRequest error event triggered", data: {event}});}); request.addEventListener("load", (event) => {let decodedHttpStatus, httpStatus, message; requestResolved = true; decodedHttpStatus = decodeHttpStatus(httpStatus = request.status); return !(decodedHttpStatus.status === success && (() => {try {resolve(getResponse()); return true;} catch (error) {};})()) ? (message = (decodedHttpStatus.status === success) ? (decodedHttpStatus.status = serverFailure, "error processing successful response") : undefined, fail(merge(decodedHttpStatus, {message, event, data: getErrorResponse()}))) : undefined;}); if (onProgress) {initialProgressCalled = showProgressAfter <= 0; lastProgressEvent = null; timeout(showProgressAfter, () => {initialProgressCalled = true; return progressCallbackInternal(lastProgressEvent || {});}); progressCallbackInternal = (event) => {let total, loaded; ({total, loaded} = lastProgressEvent = event); return (initialProgressCalled && !requestResolved) ? Caf.isF(onProgress) && onProgress(restRequestStatus = merge(restRequestStatus, {event}, {progress: (total > 0) ? loaded / total : 0})) : undefined;}; if (method === "GET") {request.addEventListener("progress", progressCallbackInternal);} else {request.upload.addEventListener("progress", progressCallbackInternal);};}; if (verbose) {log({ArtRestClient: {method, url, headers}});}; return request.send(body);});};});});});
//# sourceMappingURL=RestClient.js.map