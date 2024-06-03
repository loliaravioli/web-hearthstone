Web-based vanilla Hearthstone currently in development. 


run npm install


To-do List:

- Get all card images and sound effects from. https://hearthsfx.github.io/cards/VANILLA

- Implement proper turn-based gameplay after finishing the structure of basic minion combat. Most of the way there already, just need to do the onPlay/onDeath/etc. effects.

- Start using something like storybook for the html/css elements, so they can be developed without having to play the entire game. https://storybook.js.org/docs/get-started

- Fix the mess of HTML and CSS.

- Implement several screens.

- Organize the javascript and move non-server files into src/public, where they belong (also rename src to public for node).

- Create a functioning server. Current server.js is from a scrabble game I made-- will need major rewriting but there's a lot there that might be useful to start with.
