{merge, w, defineModule, each} = Neptune.Art.StandardLib
{
  encodeHttpStatus, isFailure, communicationStatuses, networkFailure, decodeHttpStatus,
  failure, clientFailureNotAuthorized,
  success, missing, serverFailure, clientFailure
  aborted
  pending
} = Neptune.Art.CommunicationStatus

defineModule module, suite:
  decodeHttpStatus: ->
    test "100", -> assert.rejects -> decodeHttpStatus 100
    test "200", -> assert.selectedPropsEq status: success,        httpStatus: 200, decodeHttpStatus 200
    test "300", -> assert.selectedPropsEq status: missing,        httpStatus: 300, decodeHttpStatus 300
    test "400", -> assert.selectedPropsEq status: clientFailure,  httpStatus: 400, decodeHttpStatus 400
    test "401", -> assert.selectedPropsEq status: clientFailure,  httpStatus: 401, decodeHttpStatus 401
    test "402", -> assert.selectedPropsEq status: clientFailure,  httpStatus: 402, decodeHttpStatus 402
    test "403", -> assert.selectedPropsEq status: clientFailureNotAuthorized,  httpStatus: 403, decodeHttpStatus 403
    test "404", -> assert.selectedPropsEq status: missing,        httpStatus: 404, decodeHttpStatus 404
    test "405", -> assert.selectedPropsEq status: clientFailure,  httpStatus: 405, decodeHttpStatus 405
    test "500", -> assert.selectedPropsEq status: serverFailure,  httpStatus: 500, decodeHttpStatus 500
    test "501", -> assert.selectedPropsEq status: clientFailure,  httpStatus: 501, decodeHttpStatus 501
    test "502", -> assert.selectedPropsEq status: networkFailure, httpStatus: 502, decodeHttpStatus 502
    test "503", -> assert.selectedPropsEq status: networkFailure, httpStatus: 503, decodeHttpStatus 503
    test "504", -> assert.selectedPropsEq status: networkFailure, httpStatus: 504, decodeHttpStatus 504
    test "505", -> assert.selectedPropsEq status: clientFailure,  httpStatus: 505, decodeHttpStatus 505
    test "600", -> assert.rejects -> decodeHttpStatus 600

  encodeHttpStatus: ->
    test "failure encodes to the same status as serverFailure", ->
      assert.eq serverFailure, decodeHttpStatus(encodeHttpStatus failure).status

    each communicationStatuses, (props, status) ->
      status != failure && props.httpStatus && test "#{status}", ->
        assert.eq status, decodeHttpStatus(encodeHttpStatus status).status

  isFailure: ->
    each [
        failure
        networkFailure
        serverFailure
        clientFailure
        clientFailureNotAuthorized
        missing
        aborted
      ], (status) ->
      test status, -> assert.ok isFailure status

    each [success, pending], (status) ->
      test "non-failure: #{status}", -> assert.ok !isFailure status