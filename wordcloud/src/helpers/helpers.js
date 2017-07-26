var axios = require('axios');

function getStopWords() {
    return new Promise((resolve, reject) => {
        axios.get('./assets/stopWords.txt').then((response) => {
            resolve(response.data);
        })
        .catch((reason) => {
            reject(`error in parsing stop words\n${reason}`);
        });
    });
}

function prepareText(string) {
    let words = string.replace(/\n/g, ' ').split(/[\s\/]+/g);
    
    //check for and remove symbols
    const new_words = [];
    words.forEach((word) => {
        const word_split = word.split(/[.,'";:]+/g);
        if (word_split[word_split.length-1].length <= 2) {
            word_split.splice(-1);
            new_words.push(word_split.join(''));
        } else {
            new_words.push(word);
        }
    });
    words = new_words;
    
    console.table(words);
    
    // remove only numbers and empty spaces
    words = words.filter((word) => !(word.search(/^[0-9]*$/g) === 0 || word === '') );
    
    const count = {};
    words.forEach((word) => {
        if (word in count) {
            count[word]++;
        } else {
            count[word] = 1;
        }
    });
    const final = [];
    const wordKeys = Object.keys(count);
    for (let word in wordKeys) {
        final.push({
            text: wordKeys[word],
            size: count[wordKeys[word]],
        });
    }
    return final;
}

function prepareStopWords(string) {
    return string.replace(/ /g, '').split('\n');
}

function removeStopWords(wordsObj, stopWords) {
    return wordsObj.filter(word => stopWords.indexOf(word.text.toLowerCase()) < 0 && word.text !== '');
}

module.exports = {
    getStopWords,
    prepareText,
    prepareStopWords,
    removeStopWords,
}