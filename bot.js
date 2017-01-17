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

const shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

String.prototype.findSuperWords = function(){
    let superwords = [];
    for (var i = 0; i < dictionary.length; i++){
        if (dictionary[i].includes(this) && dictionary[i].length !== this.length) superwords.push(dictionary[i]);
    }
    // 140-28 = 112
    return superwords;
}

const sumLength = function(superWords){
    let length = 0;
    for (var i = 0; i < superWords.length; i++){
        length += superWords[i].length;
        if (i !== superWords.length-1) length += 2;
    }
    return length;
}

const selectSuperWords = function(superWords, word){
    let selectedSuperWords = [], extras = [];
    // while (selectedSuperWords.length !== superWords.length && sumLength(selectedSuperWords) < 112){
    for (var i = 0; i < superWords.length; i++){
        // let picked = superWords.pick();
        let picked = superWords[i];
        // console.log(selectedSuperWords.length, superWords.length, sumLength(selectedSuperWords), word, picked, picked.indexOf(word))
        if (!selectedSuperWords.includes(picked) && picked.indexOf(word) !== 0) selectedSuperWords.push(picked)
        else extras.push(picked);
    }
    return [selectedSuperWords, extras];
}

const formString = function(starters, oddball){
    let startersList = '', added = 0;
    for (var i = 0; i < starters.length; i++){
        // console.log('starterslist', startersList)
        if (startersList.length + starters[i].length + oddball.length < 105){
            startersList += starters[i] + ', ';
            added++;
        }
        if (added > 3) break;
    }
    return startersList + oddball + '.';
}

const findVars = function(){
    var superWords = [], randoms = [], starters = [];
    while (!superWords.length || !randoms.length || !starters.length){
        // console.log('while loop')
        var word = pickWord();
        superWords = word.findSuperWords();
        var select = selectSuperWords(superWords, word);
        randoms = select[0];
        // starters = shuffle(select[1]);
        starters = select[1];
        var oddball = randoms.pick();
    }
    let status = `List of words containing "${word}": ` + formString(starters, oddball);
    console.log(word, '\n', starters.join(' '), '\n', sumLength(superWords), randoms.join(' '), '\n', status, status.length);
}
findVars();

// const meow = 'meow';
// let status = `List of words containing "${meow}": ` + '.';