Web-based vanilla Hearthstone currently in development. 

Run `npm install` and then `npm start` to run the website.


To-do List:

- Specify class types on objects with JSDoc. Add "// @ts-check" at the top of the file (or configure it globally through a jsconfig.json file at the root of the project). https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

- Get all card images and sound effects. Most are now in the files but some are sporadically missing.

- Implement proper turn-based gameplay... basically make the game work vs AI.

- Fix the mess of HTML and CSS. Start using something like storybook for the html/css elements, so they can be developed without having to play the entire game. https://storybook.js.org/docs/get-started

- Implement several screens (menu, game, card collection, etc.).

- Organize the content of javascript scripts into objects as much as possible.

- Move most of the game stuff here into the server. This can wait until after the vs-AI tutorial base of the game is done (and it's okay to keep the cards and controllers and stuff required for the tutorial and maybe even for other AI games) but for player-vs-player all of this card and game data will need to be done server-side. Views can maybe stay client-side... need to figure it all out.

- Do animations... https://animista.net/play/entrances/slit-in for drawing cards. https://animista.net/play/entrances/tilt-in-fwd/tilt-in-fwd-tr for showing what card opponent is playing. https://animista.net/play/entrances/puff-in/puff-in-center for placing the card. https://animista.net/play/exits/slit-out to shuffle card back into deck. https://animista.net/play/exits/puff-out for burning a card? https://animista.net/play/attention/shake for when a minion dies.

- The way that card data will be handled is as such: card stats (mana, attack, hp, poisonous, silenced, etc.) will be stored server-side as card objects, similarly to how they are now in client-side. The client will have battlecry data for every minion, so that when playing a card with a battlecry the client will know to initiate targeting (for battlecries which select targets), after which it will signal to the server that it has played a minion in position X and subsequently signal that it has triggered its battlecry on target Y. Real Hearthstone might actually trigger the battlecry first and THEN officially play the minion... need to check.
