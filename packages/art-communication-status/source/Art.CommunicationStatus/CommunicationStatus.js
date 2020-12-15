"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let Error = global.Error,
    CommunicationStatus;
  return (CommunicationStatus = Caf.defClass(
    class CommunicationStatus extends Object {},
    function (CommunicationStatus, classSuper, instanceSuper) {
      let communicationStatuses;
      this.communicationStatuses = communicationStatuses = {
        success: { httpStatus: 200 },
        missing: { httpStatus: 404, failure: true },
        clientFailure: { httpStatus: 400, clientFailure: true, failure: true },
        clientFailureNotAuthorized: {
          httpStatus: 403,
          clientFailure: true,
          failure: true,
        },
        serverFailure: { httpStatus: 500, failure: true, serverFailure: true },
        networkFailure: { failure: true },
        aborted: { failure: true },
        pending: {},
        failure: { httpStatus: 500, failure: true },
      };
      Caf.object(this.communicationStatuses, (v, k) => k, null, this);
      this.isClientFailure = function (status) {
        let base;
        return !!(
          Caf.exists((base = communicationStatuses[status])) &&
          base.clientFailure
        );
      };
      this.isServerFailure = function (status) {
        let base;
        return !!(
          Caf.exists((base = communicationStatuses[status])) &&
          base.serverFailure
        );
      };
      this.isFailure = function (status) {
        let base;
        return !!(
          Caf.exists((base = communicationStatuses[status])) && base.failure
        );
      };
      this.isSuccess = function (status) {
        return status === "success";
      };
      this.validStatus = function (status) {
        return CommunicationStatus[status] === status;
      };
      this.decodeHttpStatus = (httpStatus) => {
        let status;
        if (!(httpStatus != null)) {
          return { status: this.networkFailure, message: "network failure" };
        }
        status = (() => {
          switch ((httpStatus / 100) | 0) {
            case 2:
              return this.success;
            case 3:
              return this.missing;
            case 4:
              return (() => {
                switch (httpStatus) {
                  case 403:
                    return this.clientFailureNotAuthorized;
                  case 404:
                    return this.missing;
                  default:
                    return this.clientFailure;
                }
              })();
            case 5:
              return (() => {
                switch (httpStatus) {
                  case 502:
                  case 503:
                  case 504:
                    return this.networkFailure;
                  case 501:
                  case 505:
                  case 530:
                    return this.clientFailure;
                  case 500:
                    return this.serverFailure;
                }
              })();
          }
        })();
        if (!(status != null)) {
          throw new Error(`unhandled httpStatus: ${Caf.toString(httpStatus)}`);
        }
        return {
          status,
          httpStatus,
          message: `${Caf.toString(status)} (${Caf.toString(httpStatus)})`,
        };
      };
      this.encodeHttpStatus = (status) => {
        let httpStatus, base;
        if (
          !(httpStatus =
            Caf.exists((base = this.communicationStatuses[status])) &&
            base.httpStatus)
        ) {
          throw new Error(
            `There is no valid HttpStatus for ${Caf.toString(status)}.`
          );
        }
        return httpStatus;
      };
    }
  ));
});
