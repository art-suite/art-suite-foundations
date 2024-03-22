# Art.Cli

> Initialized by Art.Build.Configurator

### Install

```bash
npm install art-cli
```

### Example

```coffeescript
# CaffeineScript
&@art-suite/cli.start
  commands:
    sing:       ({song}) -> "♫ #{song} ♫!"
    send-cheer: -> "May you have a holly, jolly Christmas this year!"
    xmas:       ({ santa, rudolph }) ->
      []
        "Will Santa come this year?"
        if santa > 0 then repeat("Ho! ", santa) else 'No Santa this year.'
        if rudolph then "Rudolph's nose glows!" else 'No Rudolph this year.'
      .join :\n
```