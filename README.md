Web-based vanilla Hearthstone currently in development. 

Run `npm install` and then `npm start` to run the website.


To-do List:

- Specify class types on objects with JSDoc. Add "// @ts-check" at the top of the file (or configure it globally through a jsconfig.json file at the root of the project). https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

- Get all card images and sound effects. Most are now in the files but some are sporadically missing.

- Tidy up HTML and CSS. Start using something like storybook for the html/css elements, so they can be developed without having to play the entire game. https://storybook.js.org/docs/get-started

- Implement several screens (menu, game, card collection, etc.).

- Organize the content of javascript scripts into objects or separate single-use scripts as much as possible.

- Make individual events update the client's game state instead of sending the entire game state each time and having the client reload everything.

- Do animations...
    - Draw card https://animista.net/play/entrances/slit-in
    - Show what card opponent is playing https://animista.net/play/entrances/tilt-in-fwd/tilt-in-fwd-tr
    - Place minion https://animista.net/play/entrances/puff-in/puff-in-center
    - Shuffle card back into deck https://animista.net/play/exits/slit-out
    - Burn/overdraw card https://animista.net/play/exits/puff-out
    - Minion dies https://animista.net/play/attention/shake

- Figure out how things like battlecries will work between client and server. (it'll probably work the same way as spells. store whether or not the minion has a battlecry and initiate the targeting system entirely clientside)