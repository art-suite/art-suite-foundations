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