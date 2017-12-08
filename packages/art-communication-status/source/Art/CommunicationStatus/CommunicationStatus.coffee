module.exports = class CommunicationStatus
  @communicationStatuses: communicationStatuses =
    ###
    status: success

    * An unqualified success.
    * I guess it could be qualified, with additional information in another field,
      but the 'expected' data should be present.
    ###
    success:                    httpStatus: 200

    ###
    status: missing

    * The request was properly formatted.
    * There were no network errors.
    * There were no server errors.
    * The only problem is the server could not find the requested resource.
    ###
    missing:                    httpStatus: 404, failure: true

    ###
    status: clientFailure

    * The server rejected the request.
    * There is something wrong with the client's request.
    * It's up to the client to fix the problem.
    * This includes mal-formed requests as well as invalid data.
    * all 4xx errors except 404
    NOTE: 404 is not necessarilly a client NOR server error, therefor it's status: missing
    ###
    clientFailure:              httpStatus: 400, clientFailure: true, failure: true

    ###
    status: notAuthorized

    * The resource exists, but the client is not allowed to access it.

    This is a form of clientFailure because the client could possibly change
    something in the request to make it work.
    ###
    clientFailureNotAuthorized: httpStatus: 403, clientFailure: true, failure: true

    ###
    status: serverFailure

    * There is something broken on the server.
    * There is nothing the client can do to solve this problem.

    SBD: Possble rename to 'internalFailure': Reason: so it also makes sense for local library calls.
      If something is failing in a local library, serverFailure makes less sense.
      Then again, local libraries pretty-much don't need communicationStatus at all - they
      can use 'throw' or 'promise.reject'
    ###
    serverFailure:              httpStatus: 500, failure: true, serverFailure: true

    ###
    status: networkFailure

    * The remote-server could not be reached.
    * There is nothing the code running on the Client NOR Server can do to fix this.
    * There is something wrong with the network between the client computer and the server.
    * The client can attempt to retry at a later time and it might magically work.
    * The client-side-humans or server-side-humans can attempt to fix the network.
    * The failure may be one of the following:
      a) the local computer has no internet connection OR
      b) the internet is in a shitstorm ;) OR
      c) there is an network problem within the Servers' facility.
    ###
    networkFailure:             failure: true

    ###
    status: aborted

    * the request was aborted, AS REQUESTED BY THE CLIENT
    ###
    aborted:                    failure: true

    ###
    status: pending

    * The request is proceeding.
    * No errors so far.
    ###
    pending:                    {}

    ###
    status: failure

    Use when the same code is used clientSide and serverSide.

    Server code should convert :failure into :serverFailure when sending
    a failing reply to a client.
    ###
    failure:                    httpStatus: 500, failure: true

  # add each status to CommunicationStatus for easy inclusion.
  # Each status has a unique string-name which is both its local-API name
  # and the name passed over the wire when communicating remotely.
  @[k] = k for k, v of @communicationStatuses

  @isClientFailure: (status) -> !!communicationStatuses[status]?.clientFailure
  @isServerFailure: (status) -> !!communicationStatuses[status]?.serverFailure

  @isFailure: (status) -> !!communicationStatuses[status]?.failure
  @isSuccess: (status) -> status == "success"

  ###
  OUT: true if status is a valid status-string
  ###
  @validStatus: (status) -> CommunicationStatus[status] == status

  # NOTE: no httpStatus == network failure
  @decodeHttpStatus: (httpStatus) =>
    unless httpStatus?
      return status: @networkFailure, message: "network failure"

    status = switch httpStatus / 100 | 0
      when 2 then @success
      when 3 then @missing
      when 4
        switch httpStatus
          when 403 then @clientFailureNotAuthorized
          when 404 then @missing
          else          @clientFailure
      when 5
        switch httpStatus
          # gateway failures
          when 502, 503, 504 then @networkFailure
          when 501, 505, 530 then @clientFailure

          # Not implemented / HTTP Version not Supported
          when 500           then @serverFailure

    throw new Error "unhandled httpStatus: #{httpStatus}" unless status?

    {
      status
      httpStatus
      message: "#{status} (#{httpStatus})"
    }

  @encodeHttpStatus: (status) =>
    unless httpStatus = @communicationStatuses[status]?.httpStatus
      throw new Error "There is no valid HttpStatus for #{status}."
    httpStatus
