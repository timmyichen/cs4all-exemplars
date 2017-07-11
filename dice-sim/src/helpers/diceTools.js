import  randomInt  from './helpers';

export default function rollAllDice(props){
    const sides = props.sides;
    const dice = props.dice;
    const trials = props.trials;
    
    const results = {};
    const now = Date.now();
    
    for(let die=dice; die<=sides*dice; die++){
        results[die] = { frequency: 0, die, percentage: 0 };
    }
    for(let trial=0; trial<trials; trial++){
        let total=0;
        for(let die=0; die<dice; die++){
            total += randomInt(1,sides);
        }
        if(Date.now() - now > 5000){
            alert("Took longer than 5 seconds to execute, ending process..");
            this.resetState();
            return;
        }
        
        results[total].frequency += 1;
    }
    
    for(let die=dice; die<=sides*dice; die++){
        results[die].percentage = (results[die].frequency / trials);
    }
    
    return results;
}

export function rollSteppedDice(props){
    const newState = {
        sides: props.sides,
        dice: props.dice,
        trials: props.trials,
        resultSteps: [],
        currentResultStep: 0,
    };
    
    const currentStep = {
        results: {},
        stepLabel: '',
        stepNum: 0,
        total: 0,
        randomRoll: 0,
        trial: 0
    };
    let stepNum = 0;
    
    for(let die=newState.dice; die<=newState.sides*newState.dice; die++){
        currentStep.results[die] = { frequency: 0, die, percentage: 0};
    }
    currentStep.trial = 'N/A';
    stepNum = addStep(newState.resultSteps,currentStep,'Set initial values for each roll result to zero',0,1);
    
    for(let trial=1; trial<=newState.trials; trial++){
        let total=0;
        currentStep.total = 0;
        currentStep.trial = trial;
        stepNum = addStep(newState.resultSteps,currentStep,'Set initial values each trial total to zero',stepNum,2);
        
        for(let die=1; die<=newState.dice; die++){
            const randomRoll = randomInt(1,newState.sides);
            currentStep.randomRoll = randomRoll;
            stepNum = addStep(newState.resultSteps,currentStep,`generate random number between 1 and ${newState.sides} for trial#${trial}: number=${randomRoll}`,stepNum,3);
            total += randomRoll;
            currentStep.total = total;
            stepNum = addStep(newState.resultSteps,currentStep,`add ${randomRoll} to total for trial#${trial}. Total rolled is now ${total}`,stepNum,4);
        }
        currentStep.results[total].frequency += 1;
        stepNum = addStep(newState.resultSteps,currentStep,`add 1 to frequency count for roll result ${total}`,stepNum,5);
        
        for(let die=newState.dice; die<=newState.sides*newState.dice; die++){
            currentStep.results[die].percentage = (currentStep.results[die].frequency / trial);
        }
        // stepNum = this.addStep(resultStates,currentState,`update percentage values`,stepNum,6);
    }
    console.log(newState);
    return newState;
}

function addStep(resultSteps, currentStep, label, stepNum, instructionIndex){
    currentStep.stepLabel = label;
    currentStep.stepNum = stepNum;
    currentStep.instructionIndex = instructionIndex;
    //crude way of deep cloning object
    const loggedData = JSON.parse(JSON.stringify(currentStep));
    resultSteps.push(loggedData);
    return stepNum + 1;
}