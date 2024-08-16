# art-communication-status

Why? Express the essential status of any remote API request as simply as possible. i.e. Simplify the heck out of HTTP status codes!

HTTP error codes are excessive. Most of them are never handled nor never used. My key observation is that the codes serve two purpose and neither very well. The first purpose is to provide information that programs can act on. The second is to provide metadata that a programmer can use to debug a system.

I believe these should be separated. We should have a core set of status codes that cover what code could be designed to handle on its own, and then, optionally, APIs can return human-readable error messages to facilitate debugging.

Further, for all of the status codes HTTP does cover, it misses two essential ones when programming any client. It's understandable, since these status are outside of the HTTP protocol itself, but none-the-less, every client needs to handle them: network failures and pending requests.

### Summary

The statuses:

* `success`:                    (200) yay!
* `missing`:                    (404) resource does not exist
* `clientFailure`:              (400) resource exists but you're not allowed to access it
* `serverFailure`:              (500) the server code has a bug
* `networkFailure`:             (N/A) failed to connect to the server
* `pending`:                    (N/A) request is still in progress

### Conditions Code can Reason About

The guiding principle for ArtCommunicationStatus is grouping network request statuses into simple categories that *code* can automatically reason about. Here are some examples of how these communication status's can be handled:

* **success**
  * the return data is valid, proceed!
* **missing**
  * alert "The resource is not available."
  * no amount of retrying will get a different result
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
3. 404 isn't really a client-error or a server-error
    * it's its own thing: status: missing
    * It shouldn't be a 4xx error
    * By definition:
        * a client-error means there is something the client can do to fix it.
        * a server-error means there is something the server can do to fix it.
    * Unless the 404-response itself was a bug, 404 fits in neither of those categories. Example: If the client requests a resource once and it works, then fires the exact same request again and the resource is now 404, it's not the client's fault.
