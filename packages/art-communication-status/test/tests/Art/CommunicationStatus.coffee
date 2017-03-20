{merge, w, defineModule} = Neptune.Art.StandardLib
{decodeHttpStatus, failure, success, missing, serverFailure, clientFailure} = Neptune.Art.CommunicationStatus

defineModule module, suite:
  decodeHttpStatus: ->
    test "100", -> assert.selectedPropsEq status: failure,       httpStatus: 100, decodeHttpStatus 100
    test "200", -> assert.selectedPropsEq status: success,       httpStatus: 200, decodeHttpStatus 200
    test "300", -> assert.selectedPropsEq status: missing,       httpStatus: 300, decodeHttpStatus 300
    test "400", -> assert.selectedPropsEq status: clientFailure, httpStatus: 400, decodeHttpStatus 400
    test "401", -> assert.selectedPropsEq status: clientFailure, httpStatus: 401, decodeHttpStatus 401
    test "402", -> assert.selectedPropsEq status: clientFailure, httpStatus: 402, decodeHttpStatus 402
    test "403", -> assert.selectedPropsEq status: clientFailure, httpStatus: 403, decodeHttpStatus 403
    test "404", -> assert.selectedPropsEq status: missing,       httpStatus: 404, decodeHttpStatus 404
    test "405", -> assert.selectedPropsEq status: clientFailure, httpStatus: 405, decodeHttpStatus 405
    test "500", -> assert.selectedPropsEq status: serverFailure, httpStatus: 500, decodeHttpStatus 500
    test "600", -> assert.selectedPropsEq status: failure,       httpStatus: 600, decodeHttpStatus 600
