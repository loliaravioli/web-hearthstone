Web-based vanilla Hearthstone currently in development. 

Run `npm install` and then `npm start` to run the website.


To-do List:

- Specify class types on objects with JSDoc. Add "// @ts-check" at the top of the file (or configure it globally through a jsconfig.json file at the root of the project). https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

- Get all card images and sound effects.

- Implement proper turn-based gameplay. Partially working but missing mana mechanics, AI that can attack, attacks that target the hero, among other things.

- Fix the mess of HTML and CSS. Start using something like storybook for the html/css elements, so they can be developed without having to play the entire game. https://storybook.js.org/docs/get-started

- Implement several screens (menu, game, card collection, etc.).

- Organize the content of javascript scripts into objects as much as possible.

- Move most of the game stuff here into the server. This can wait until after the vs-AI tutorial base of the game is done (and it's okay to keep the cards and controllers and stuff required for the tutorial and maybe even for other AI games) but for player-vs-player all of this card and game data will need to be done server-side. Views can maybe stay client-side... need to figure it all out.

- Do animations... https://animista.net/play/entrances/slit-in for drawing cards. https://animista.net/play/entrances/tilt-in-fwd/tilt-in-fwd-tr for showing what card opponent is playing. https://animista.net/play/entrances/puff-in/puff-in-center for placing the card. https://animista.net/play/exits/slit-out to shuffle card back into deck. https://animista.net/play/exits/puff-out for burning a card? https://animista.net/play/attention/shake for when a minion dies.

- The way that card data will be handled is as such: card stats (mana, attack, hp, poisonous, silenced, etc.) will be stored server-side as card objects, similarly to how they are now in client-side. Since transferring battlecry/deathrattle/etc. data between client and server seems difficult, there will be client-stored battlecry/etc. event objects which will be triggered by the server when a card is played/etc. For example, the server may {event: playCard, cardType: minion, minionID: witchdoctor, cardID: witchdoctorInstance} and then {event: battlecry, source: witchdoctorInstance, target: friendlyMinionInstance}, which the client will receive and then display the witchdoctor card being placed onto the board and then execute the witchdoctor's battlecry (the data for which is stored on the client) on "friendlyMinionInstance."