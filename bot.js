const fs = require('fs');
const Twit = require('twit');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const words = require('./wordsnoapostrophes.txt');
const dictionary = words.split("\n");

Array.prototype.pick = function() {
    return this[Math.floor(Math.random()*this.length)];
};

