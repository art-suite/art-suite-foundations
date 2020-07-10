"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compactFlatten", "repeat", "log"],
    [global, require("art-standard-lib")],
    (compactFlatten, repeat, log) => {
      return require("../source").start({
        commands: {
          sing: function({ song }) {
            return `♫ ${Caf.toString(song)} ♫!`;
          },
          "send-cheer": function() {
            return "May you have a holly, jolly Christmas this year!";
          },
          xmas: function({ santa, rudolph }) {
            return compactFlatten([
              "Will Santa come this year?",
              santa > 0 ? repeat("Ho! ", santa) : "No Santa this year.",
              rudolph ? "Rudolph's nose glows!" : undefined
            ]).join("\n");
          },
          stat: function({ commands }) {
            log({ commands });
            return null;
          }
        },
        help: {
          description: "A demo app with a holiday theme.",
          commands: {
            sing: {
              description: "Sing any name you choose",
              options: {
                song: {
                  description: "name of the song to sing",
                  required: true
                }
              }
            },
            "send-cheer": { description: "Just a little holiday cheer." },
            xmas: {
              description: "This will tell you exactly what you need.",
              options: {
                rudolph: "Should Rudolph come too?",
                santa: [
                  "number-of-ho-hos",
                  "Santa will come if he says 'Ho!' at least once."
                ]
              },
              examples: [
                { santa: 10 },
                "output:\n\n  Will Santa come this year?\n  Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho!",
                { rudolph: true },
                "output:\n\n  Will Santa come this year?\n  No Santa this year.\n  Rudolph's nose glows!",
                { rudolph: true, santa: 10 },
                "output:\n\n  Will Santa come this year?\n  Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho!\n  Rudolph's nose glows!"
              ]
            }
          }
        }
      });
    }
  );
});
