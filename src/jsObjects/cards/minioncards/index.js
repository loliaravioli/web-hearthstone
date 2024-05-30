const fs = require('fs');
const path = require('path');

const classes = {};

// Read all files in the current directory
fs.readdirSync(__dirname).forEach(file => {
  // Skip the index.js file
  if (file !== 'index.js' && file.endsWith('.js')) {
    // Get the class name by removing the file extension
    const className = path.basename(file, '.js');
    // Dynamically require the file and add it to the classes object
    classes[className] = require(`./${file}`);
  }
});

module.exports = classes;