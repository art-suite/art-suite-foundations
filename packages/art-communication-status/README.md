# art-communication-status
Simplified system of statuses for HTTP and any other network protocol

A core set of status-codes that code can reason about easily.

### Goal

> Minimal set of codes so Clients can reason about network requests in a consistant way.

### Strategy

Have a small, simple set of status codes for our programs to reason about,
and, if necessary, allow the communication channel to return additional
information in the form of a 'message' that humans can look at to get more
information about any failures.

### Summary

The statuses:

* **success**:                    yay!
* **missing**:                    the resouce does not exist (404)
* **clientFailure**:              fix client code or user inputs
* **clientFailureNotAuthorized**: resource exists but not allowed to access; fix client code or user inputs
* **serverFailure**:              fix server code
* **networkFailure**:             retry when network is working
* **pending**:                    request is in progress

### Conditions Code can Reason About

The guiding principle for ArtCommunicationStatus is grouping network request statuses into simple categories that *code* can automatically reason about. Here are some examples of how these communication status's can be handled:

* **success**
  * the return data is valid, proceed!
* **missing**
  * alert "The resoure is not available."
* **networkFailure**
    * automatic retries
    * test a known-good URL to validate if there is any network connection at all
    * alert "Please check your network connection."
* **clientFailure**
  * assuming the client is bug-free, ask the user to fix their submission (Ex: wrong password)
  * alert "Yikes! That's not quite right. Please try again."
* **clientFailureNotAuthorized**
  * ask the user to log in or re-log in as a different user
  * ask the user to present additional credentials
* **serverFailure**
  * alert "Ooops! We're sorry, but something went wrong on our servers. We'll fix it ASAP! In the mean time, how about some tea?"

### Why not HTTP Status codes?

1. They cover so much, most of which automatic code cannot do anything about other than report an error, possibly to be viewed by a human later.
2. there is no HTTP status code for networkFailure.
3. 404 isn't really a client-error or a server-error, it's its own thing: status: missing
  * By definition:
      * a client-error means there is something the client can do to fix it.
      * a server-error means there is something the server can do to fix it.
  * Unless the 404-response itself was a bug, 404 fits in neither of those categories.
  * Example: If the client requests a resource once and it works, then fires the exact same request again and the resource is now 404, it's not the client's fault.
