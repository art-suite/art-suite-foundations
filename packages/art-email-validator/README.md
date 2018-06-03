# Art.Email.Validator

Validate email and suggest corrections. Steps:

1. check the domain syntactically - just a rough, quick-check
1. look up the MX record for the domain, fail if it doesn't exist
1. communciate with the SMTP server on the MX-server to determine if the mailbox exists
1. if the SMTP server responds ambiguously, optiontionally, invoke fallbackValidator - useful to call an external, premium validation service

Always returns a results-object regardless of what happens, example output:

* `valid: true/false`
* `invalid: true/false`
* `didYouMean: '...@...'`
* `message: 'details about what happend'`


### Install

```coffeescript
npm install art-email-validator
```

### Usage

```coffeescript
&ArtEmailValidator.validateEmail
  email:    "foobar@gmailcom"         # email to check
  smtpHost: "my.domain.com"           # your domain, the same every call
.then (results) ->

# Example output:
results =
  valid:      false                   # possibly invalid
  invalid:    true                    # definitly invalid
  didYouMean: "foobar@gmail.com"      # suggested fix
  message:    "Domain was not valid." # developer-friendly info
```

### API

```coffeescript
&ArtEmailValidator.validateEmail options
.then (results) ->

# NOTE: &ArtEmailValidator means: require('art-email-validator')
```

#### `options<object>`
* `email<string>`        (required) the email address to check
* `smtpFrom<string>`     (required OR smtpHost) the smtpFrom-address to tell the email server [default: email]
* `smtpHost<string>`     (required OR smtpFrom) the smtpHost to tell the email server [default: the domain of part of: smtpFrom]
* `timeout<number-milliseconds>` (default: 1000) number in miliseconds to wait before timing out when checking mailbox
* `fallbackValidator<(options, results) -> results>` Called as the very last step if validateMailbox can't conclusively determine if it is valid. Example: use this to call Mailgun's email validation service.
* `verbose<bool/number>` (default: false) verbose: true ==> basic verbos logging, verbose: >= 2 ==> very verbose logging

#### `results<object>`

* `valid<bool>`    'true' means the email is definitly valid
* `invalid<bool>`  'true' means email is definitly invalid
* `didYouMean<string>` (optional) suggest a possibly-correct email
* `message<string>` developer-consumable description of what happened

Note, the result is ambiguous if `valid == false`, but `invalid != true`. This indicates the SMTP server failed to respond in a known way and there was no fallbackValidator.

### Trivia

* Gmail.com ignores dots in email names, and it's a problem. This validator will generally succeed because Gmail.com will report that the mailbox exists. However, if you are using Mailgun, mailgun will refuse to actually send the email if it has extra dots: https://jameshfisher.com/2018/04/07/the-dots-do-matter-how-to-scam-a-gmail-user