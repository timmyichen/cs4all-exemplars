import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import RollComponents from './components/RollComponents';
import StepComponents from './components/StepComponents';

import { rollAllDice, rollSteppedDice } from './helpers/diceTools';


class App extends Component {
    constructor() {
        super();
        this.state = {
            sides: 6,
            dice: 2,
            trials: 10,
            stepMode: false,
            results: {},
            steppedResults: {
                currentStepIndex: 0,
                resultSteps: [{ total: 'N/A', trial: 'N/A', randomRoll: 'N/A', }],
            },
            isPlaying: false,
            playIntervalId: null,
            playRate: 1000,
        };
        this.changeValue = this.changeValue.bind(this);
        this.roll = this.roll.bind(this);
        this.toggleStep = this.toggleStep.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.changeRate = this.changeRate.bind(this);
        this.setRate = this.setRate.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }
    changeValue(event, key, limit) {
        const newState = {};
        let newValue = parseInt(event.target.value, 10);
        if (newValue < 0) {
            newValue = 0;
        } else if (limit > 0 && newValue >= limit) {
            newValue = limit;
        }
        
        newState[key] = newValue;
        this.setState(newState);
    }
    toggleStep() {
        this.setState(prevState => ({ stepMode: !prevState.stepMode, results: {} }));
    }
    roll() {
        if (!this.state.stepMode) {
            const results = rollAllDice(this.state.sides, this.state.dice, this.state.trials);
            this.setState({ results });
        } else {
            const steppedResults = rollSteppedDice(this.state.sides, this.state.dice, this.state.trials);
            const results = steppedResults.resultSteps[0].results;
            this.setState({ steppedResults, results, });
        }
    }
    togglePlay() {
        const isPlaying = !this.state.isPlaying;
        if (isPlaying) {
            this.setState({
                playIntervalId: setInterval(this.nextStep, this.state.playRate),
            });
        } else {
            clearInterval(this.state.playIntervalId);
        }
        this.setState({ isPlaying });
    }
    changeRate(event) {
        this.setState({ playRate: event.target.value*1000 });
    }
    setRate(event) {
        if(this.state.isPlaying) {
            clearInterval(this.state.playIntervalId);
            this.setState({
                playIntervalId: setInterval(this.nextStep, this.state.playRate),
            });
        }
    }
    nextStep() {
        const status = this.state.steppedResults;
        if (status.currentStepIndex >= status.resultSteps.length - 1) return;
        
        status.currentStepIndex++;
        this.setState({ steppedResults: status, });
        
        if (status.currentStepIndex >= status.resultSteps.length - 1) return;
        this.setState({ results: status.resultSteps[status.currentStepIndex].results, });
    }
    prevStep() {
        const status = this.state.steppedResults;
        if (status.currentStepIndex <= 0) return;
        
        status.currentStepIndex--;
        this.setState({ steppedResults: status, });
        
        if (status.currentStepIndex <= 0) return;
        this.setState({ results: status.resultSteps[status.currentStepIndex].results, });
    }
    render() {
        return (
            <div>
                <Header as="h1">Dice Roll Simulator</Header>
                <div id='main-container'>
                    <RollComponents
                        sides={this.state.sides}
                        dice={this.state.dice}
                        trials={this.state.trials}
                        stepMode={this.state.stepMode}
                        changeFunction={this.changeValue}
                        rollFunction={this.roll}
                        results={this.state.results}
                    />
                    <StepComponents
                        sides={this.state.sides}
                        dice={this.state.dice}
                        trials={this.state.trials}
                        results={this.state.results}
                        stepMode={this.state.stepMode}
                        currentStep={this.state.steppedResults.resultSteps[this.state.steppedResults.currentStepIndex]
                            || this.state.steppedResults.resultSteps[this.state.steppedResults.length-1]
                        }
                        toggleStep={this.toggleStep}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        isPlaying={this.state.isPlaying}
                        togglePlay={this.togglePlay}
                        playRate={this.state.playRate}
                        changeRate={this.changeRate}
                        setRate={this.setRate}
                    />
                </div>
            </div>
        );
    }
}

export default App;
