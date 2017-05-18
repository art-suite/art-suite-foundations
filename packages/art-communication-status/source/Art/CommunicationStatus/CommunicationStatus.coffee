###
A core set of status-codes that code can reason about easily.

Goal:

  Minimal set of codes so Clients can reason about network requests in a
  consistant way.

Strategy:

  Have a small, simple set of status codes for our programs to reason about,
  and, if necessary, allow the communication channel to return additional
  information in the form of a 'message' that humans can look at to get more
  information about any failures.

Summary:

  6 statuses:

  success:        yay!
  missing:        the resouce does not exist (404)
  clientFailure:  fix client code or user inputs
  serverFailure:  fix server code
  networkFailure: retry when network is working
  failure:        boo! Unknown failure type

Automatic actions the Client can take on behalf of the user:

  status:
    missing:
      alert "The resoure is not available."

  failureTypes:
    network:
      automatic retries
      test a known-good URL to validate if there is any network connection at all
      alert "Please check your network connection."

    client:
      assuming the client is bug-free, ask the user to fix their submission (Ex: wrong password)
      alert "Yikes! That's not quite right. Please try again."

    server:
      alert "Ooops! We're sorry, but something went wrong on our servers.
        We'll fix it ASAP! In the mean time, how about some tea?"

Why not HTTP Status codes?

  1) They cover so much, most of which automatic code cannot do anything about
  other than report an error, possibly to be viewed by a human later.

  2) there is no HTTP status code for network failure.

  3) 404 isn't really a client-error or a server-error, it's its own thing: status: missing

    By definition:
      a client-error means there is something the client can do to fix it.
      a server-error means there is something the server can do to fix it.

    Unless the 404-response itself was a bug, 404 fits in neither of those categories.

    Example: If the client requests a resource once and it works, then
    fires the exact same request again and the resource is now 404, it's not the client's
    fault.

Note, these status-codes are used at the core of other Art Libs:

  ArtFlux
  ArtEry
  ArtRestClient

###
module.exports = class CommunicationStatus
  ###
  status: success

  * An unqualified success.
  * I guess it could be qualified, with additional information in another field,
    but the 'expected' data should be present.
  ###
  @success:  "success"

  ###
  status: pending

  * The request is proceeding.
  * No errors so far.
  ###
  @pending:  "pending"

  ###
  status: missing

  * The request was properly formatted.
  * There were no network errors.
  * There were no server errors.
  * The only problem is the server could not find the requested resource.
  ###
  @missing:  "missing"

  ###
  status: failure

  * catch-all failure
  ###
  @failure:  "failure"


  # status: networkFailure
  # - The remote-server could not be reached.
  # - There is nothing the code running on the Client NOR Server can do to fix this.
  # - There is something wrong with the network between the client computer and the server.
  # - The client can attempt to retry at a later time and it might magically work.
  # - The client-side-humans or server-side-humans can attempt to fix the network.
  # - The failure may be one of the following:
  #   a) the local computer has no internet connection OR
  #   b) the internet is in a shitstorm ;) OR
  #   c) there is an outtage with our servers.
  @networkFailure:  "networkFailure"

  # status: clientFailure
  # - The server rejected the request.
  # - There is something wrong with the client's request.
  # - It's up to the client to fix the problem.
  # - This includes mal-formed requests as well as invalid data.
  # - all 4xx errors except 404
  # NOTE: 404 is not necessarilly a client NOR server error, therefor it's status: missing
  @clientFailure:   "clientFailure"

  # status: serverFailure
  # - There is something broken on the server.
  # - There is nothing the client can do to solve this problem
  # - all 5xx errors
  @serverFailure:   "serverFailure"

  ###
  OUT: true if status is a valid status-string
  ###
  @validStatus: (status) -> CommunicationStatus[status] == status


  # NOTE: no httpStatus == network failure
  @decodeHttpStatus: (httpStatus) =>
    unless httpStatus?
      return status: @networkFailure, message: "network failure"

    httpStatusCategory = httpStatus / 100 | 0
    return {status: @missing, httpStatus} if httpStatus == 404
    return {status: @success, httpStatus} if httpStatusCategory == 2
    status = switch httpStatusCategory
      when 1 then @failure
      when 3 then @missing
      when 4 then @clientFailure
      when 5
        switch httpStatus
          when 502, 503, 504 # gateway failures
            @networkFailure
          when 501, 505 # Not implemented / HTTP Version not Supported
            @clientFailure
          when 500
            @serverFailure
      else # invalid HTTP status code
        @serverFailure

    throw new Error "unhandled httpStatus: #{httpStatus}" unless status?

    {
      status
      httpStatus
      message: "#{status} (#{httpStatus})"
    }

  @statusToHttpStatus:
    "#{@success}":        200
    "#{@missing}":        404
    "#{@clientFailure}":  400
    "#{@serverFailure}":  500
    "#{@failure}":        500
    # "#{@networkFailure}": # there is no invalid code for network failure

  @encodeHttpStatus: (status) =>
    if status == @networkFailure
      throw new Error "There is no valide HttpStatus for networkFailure."
    @statusToHttpStatus[status]
