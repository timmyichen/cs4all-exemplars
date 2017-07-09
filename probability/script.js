//generates a random number between a and b inclusive
function randomInt(a,b){
    return Math.floor(Math.random() * (b-a+1) + a);
}

function generateCode(){
    return `
        <code>
            const numSides, numDie, numTrials = get_data();
            const results = {};
        </code>
    `;
}

function handleClick(key){
    if (key.keyCode == 13){
        handleRoll();
    }
}

/* global $ */
function handleRoll(){
    const numSides = parseInt(document.querySelector('#num-sides').value, 10);
    const numDie = parseInt(document.querySelector('#num-die').value, 10);
    const numTrials = parseInt(document.querySelector('#num-trials').value, 10);
    
    if (!numSides || !numDie || !numTrials){
        alert("At least one field is blank or zero, please try again");
        return;
    }
    
    const table = document.querySelector('#stats-table tbody');
    
    const results = {};
    
    //initialize all results to zero
    for(let die=numDie; die<=numSides*numDie; die++){
        results[die] = 0;
    }
    
    const now = Date.now();
    
    //perform each trial
    for(let trial=0; trial<numTrials; trial++){
        let total = 0;
        
        for(let die=0; die<numDie; die++){
            total = total + randomInt(1,numSides);
        }
        
        if (Date.now() - now > 5000){
            alert("Took longer than 5 seconds to execute, ending process..");
            table.innerHTML = "";
            return;
        }
        
        results[total] += 1;
    }
    
    //calculate percentages
    const percentages = {};
    for(let die=numDie; die<=numSides*numDie; die++){
        percentages[die] = (results[die] / numTrials * 100).toFixed(2);
    }
    
    table.innerHTML = "";
    
    for(let die=numDie; die<=numSides*numDie; die++){
        table.innerHTML += `
            <tr>
                <td>${die}</td>
                <td>${results[die]}</td>
                <td>${(percentages[die]/100).toFixed(4)}</td>
                <td>${percentages[die]}%</td>
                <td><div class='bar'></div></td>
            </tr>
        `
    }
    
    const bars = [...document.querySelectorAll('.bar')];
    const totalWidth = bars[0].parentElement.offsetWidth;
    
    for(let i=0; i<bars.length; i++){
        setTimeout(() => {bars[i].style.width = `${percentages[i+numDie]*totalWidth/100}px`},25);
    }
}

// $.get('script-basic.py',(d) => {
//     const block = document.querySelector('#main-code-block');
//     block.innerHTML = d;
//     hljs.highlightBlock(block);
// });

const rollButton = document.querySelector('#do-roll');
rollButton.addEventListener('click',handleRoll);
window.addEventListener('keydown',handleClick);

const showCodeButton = document.querySelector('#show-code');
showCodeButton.addEventListener('click',() => {$('.ui.modal').modal('show')});

[
    {
        text: 'initialize data',
        element: null, //pointer to dom element
        code: `results = {
                1: 0,
                2: 0,
                3: 0, //etc
            `,
    },
    {
        text: ''
    }
]