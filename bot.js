const fs = require('fs');
const Twit = require('twit');
// const credientials = {

// };
// const T = new Twit(credientials);

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const words = require('./wordsnoapostrophes.txt');
const dictionary = words.split("\n");

Array.prototype.pick = function() {
    return this[Math.floor(Math.random()*this.length)];
};
const pickWord = function(){
    let picked = '';
    while (picked.length > 5 || picked.length < 3){
        picked = dictionary.pick();
    }
    return picked;
}

String.prototype.findSuperWords = function(){
    let superwords = [];
    for (var i = 0; i < dictionary.length; i++){
        if (dictionary[i].includes(this) && dictionary[i].length !== this.length) superwords.push(dictionary[i]);
    }
    // 140-28 = 112
    return superwords;
}

const findVars = function(){
    let superWords = [];
    while (!superWords.length){
        var word = pickWord();
        superWords = word.findSuperWords();
    }
    console.log(word, '\n', superWords.join(' '));
}
findVars();

const meow = 'meow';
let status = `List of words containing "${meow}": ` + '.';