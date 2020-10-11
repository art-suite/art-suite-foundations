# ArtRestClient [![Build Status](https://travis-ci.org/imikimi/art-rest-client.svg?branch=master)](https://travis-ci.org/imikimi/art-rest-client)

Promise-based rest-client javascript library. Makes HTTP/HTTPS easy.

Works both in browser and NodeJs.

### Features
* promise based
* streamlined JSON requests
* streamlined binary support
* CORS friendly

### Install

```
npm install art-rest-client
```

### Example
```coffeescript
RestClient = require './art-rest-client'

RestClient.getJson "http://somewhere.com/users/123"
.then ({username, email}) ->
  RestClient.putJson "http://somewhere.com/users/123",
    username: "Mr New #{username}"
```

### Info

uses XMLHttpRequest2:
* http://www.w3.org/TR/XMLHttpRequest2/
* http://www.html5rocks.com/en/tutorials/file/xhr2/
* https://www.npmjs.com/package/xhr2

### Future?

The new-new is 'fetch' - seems to be getting decent support
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
* https://caniuse.com/#feat=fetch
