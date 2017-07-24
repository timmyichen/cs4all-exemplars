import { randomInt } from './helpers';

function rollAllDice(sides, dice, trials) {
    const results = {};
    const now = Date.now();

    for (let die = dice; die <= sides * dice; die++) {
        results[die] = { frequency: 0, die, percentage: 0 };
    }
    for (let trial = 0; trial < trials; trial++) {
        let total = 0;
        for (let die = 0; die < dice; die++) {
            total += randomInt(1, sides);
        }
        if (Date.now() - now > 5000) {
            return {};
        }

        results[total].frequency += 1;
    }

    for (let die = dice; die <= sides * dice; die++) {
        results[die].percentage = (results[die].frequency / trials);
    }

    return results;
}

function addStep(steps, currentStep, label, stepNum, instructionIndex) {
    currentStep.stepLabel = label;
    currentStep.stepNum = stepNum;
    currentStep.instructionIndex = instructionIndex;
    // crude way of deep cloning object
    const loggedData = JSON.parse(JSON.stringify(currentStep));
    steps.resultSteps.push(loggedData);
    return stepNum + 1;
}

function rollSteppedDice(sides, dice, trials) {
    const steps = {
        resultSteps: [],
        currentStepIndex: 0,
        totalInstructions: 4,
    };

    const currentStep = {
        results: {},
        stepNum: 0,
        total: 0,
        randomRoll: 0,
        trial: 0,
        instructionIndex: 0,
    };

    let stepNum = 0;

    for (let die = dice; die <= sides * dice; die++) {
        currentStep.results[die] = { frequency: 0, die, percentage: 0 };
    }
    currentStep.trial = 'N/A';

    stepNum = addStep(steps, currentStep, 'Set initial values for each roll result to zero', 0, 0);

    for (let trial = 1; trial <= trials; trial++) {
        let total = 0;
        currentStep.total = 0;
        currentStep.trial = trial;
        stepNum = addStep(steps, currentStep, 'Set initial values each trial total to zero', stepNum, 1);

        for (let die = 1; die <= dice; die++) {
            const randomRoll = randomInt(1, sides);
            currentStep.randomRoll = randomRoll;
            stepNum = addStep(steps, currentStep, `generate random number between 1 and ${sides} for trial#${trial}: number=${randomRoll}`, stepNum, 2);
            total += randomRoll;
            currentStep.total = total;
            stepNum = addStep(steps, currentStep, `add ${randomRoll} to total for trial#${trial}. Total rolled is now ${total}`, stepNum, 3);
        }
        currentStep.results[total].frequency += 1;

        for (let die = dice; die <= sides * dice; die++) {
            currentStep.results[die].percentage = (currentStep.results[die].frequency / trial);
        }

        stepNum = addStep(steps, currentStep, `add 1 to frequency count for roll result ${total}`, stepNum, 4);
    }
    stepNum = addStep(steps, currentStep, 'end step', stepNum, -1);
    return steps;
}


export { rollAllDice, rollSteppedDice };

// module.exports = {
//     rollAllDice,
//     rollSteppedDice,
// };
