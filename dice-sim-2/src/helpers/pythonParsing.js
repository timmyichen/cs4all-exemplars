const axios = require('axios');

function parsePythonCode(path) {
    return new Promise((resolve, reject) => {
        axios.get(path).then((response) => {
            const lines = response.data.split('\n');
            // console.log(lines);
            
            const lineData = [];
            
            let blockIndex = -1;
            
            for (const i in lines) {
                if (lines[i].trim()[0] === '#' && lines[i].includes('begin')) {
                    blockIndex = parseInt(lines[i].trim()[lines[i].trim().length - 1], 10);
                } else if (lines[i].trim()[0] === '#' && lines[i].includes('end')) {
                    blockIndex = -1;
                }
                
                if (lines[i].trim()[0] !== '#') {
                    lineData.push({
                        lineNumber: i,
                        // lineText: lines[i].replace(/ /g,'&nbsp;'),
                        lineText: lines[i] || ' ',
                        blockIndex,
                    });
                }
            }
            
            resolve(lineData);
        })
        .catch((reason) => {
            reject(`error in parsing python code\n${reason}`);
        });
    });
}

module.exports = {
    parsePythonCode,
};
