import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import randomInt from '../helpers/helpers';
import Pseudocode from './Pseudocode';
import VariableTable from './VariableTable';
import TextScroller from './TextScroller';
import PubSub from 'pubsub-js';

class DiceTable extends Component {
    constructor(props){
        super();
        this.state = {
            resultStates: [], //array containing all possible states (for stepping through)
            currentResultState: 0,
            showControls: false, //true when able to step through code
            results: {},
            barMaxSize: 0,
            instructionIndex: 0,
            dummyObj: {trial: '', randomRoll: '', total: '', instructionIndex: ''},
            playing: false,
            playIntervalID: null,
        };
        this.resetState = this.resetState.bind(this);
        this.generateRow = this.generateRow.bind(this);
        this.setBarMaxSize = this.setBarMaxSize.bind(this);
        this.rollAllDice = this.rollAllDice.bind(this);
        this.setInitialResultState = this.setInitialResultState.bind(this);
        this.populateResultStates = this.populateResultStates.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.nextState = this.nextState.bind(this);
        this.prevState = this.prevState.bind(this);
        this.addStep = this.addStep.bind(this);
    }
    componentDidMount(){
        this.setBarMaxSize();
        window.addEventListener('resize', this.setBarMaxSize);
        
        /* i know this isn't the best way to do this.  short term solution */
        PubSub.subscribe('prevState',this.prevState);
        PubSub.subscribe('nextState',this.nextState);
        PubSub.subscribe('playPause',this.togglePlay);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.setBarMaxSize);
    }
    setBarMaxSize(){
        this.setState({
            barMaxSize: this.refs.bar.parentNode.clientWidth-25
        });
    }
    /* component should receive props only in two scenarios:
        1. when the stepping mode is changed
            (props changed: step)
        2. when a new set of simulation values come in
            (props changed: sides, dice, trials) 
        there should never be a time when both run simultaneously */ 
    componentWillReceiveProps(nextProps){
        // initial if statement ensure rolling happens only for scenario #2
        if(nextProps.step === this.props.step){
            if(!nextProps.step){
                this.rollAllDice(nextProps);
            } else {
                this.setInitialResultState(nextProps);
                this.populateResultStates(nextProps);
            }
        } else {
            this.setState({
                results: {},
                resultStates: [],
                showControls: !this.state.showControls,
            });
        }
    }
    rollAllDice(props){
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
        this.setState({results});
    }
    setInitialResultState(props){
        const sides = props.sides;
        const dice = props.dice;
        const trials = props.trials;
        const results = {};
        for(let die=dice; die<=sides*dice; die++){
            results[die] = { frequency: 0, die, percentage: 0 };
        }
        this.setState({
            sides,dice,trials,
            currentResultState: 0
        });
    }
    populateResultStates(props){
        const sides = props.sides;
        const dice = props.dice;
        const trials = props.trials;
        const resultStates = [];
        const currentState = {
            results: {},
            stepLabel: '',
            stepNum: 0,
            total: 0,
            randomRoll: 0,
            trial: 0,
        };
        let stepNum = 0;
        
        for(let die=dice; die<=sides*dice; die++){
            currentState.results[die] = { frequency: 0, die, percentage: 0};
        }
        
        currentState.trial = 'N/A';
        stepNum = this.addStep(resultStates,currentState,'Set initial values for each roll result to zero',0,1);
        
        for(let trial=1; trial<=trials; trial++){
            let total=0;
            currentState.total = 0;
            currentState.trial = trial;
            stepNum = this.addStep(resultStates,currentState,'Set initial values each trial total to zero',stepNum,2);
            
            for(let die=1; die<=dice; die++){
                const randomRoll = randomInt(1,sides);
                currentState.randomRoll = randomRoll;
                stepNum = this.addStep(resultStates,currentState,`generate random number between 1 and ${sides} for trial#${trial}: number=${randomRoll}`,stepNum,3);
                total += randomRoll;
                currentState.total = total;
                stepNum = this.addStep(resultStates,currentState,`add ${randomRoll} to total for trial#${trial}. Total rolled is now ${total}`,stepNum,4);
            }
            currentState.results[total].frequency += 1;
            stepNum = this.addStep(resultStates,currentState,`add 1 to frequency count for roll result ${total}`,stepNum,5);
            
            for(let die=dice; die<=sides*dice; die++){
                currentState.results[die].percentage = (currentState.results[die].frequency / trial);
            }
            // stepNum = this.addStep(resultStates,currentState,`update percentage values`,stepNum,6);
        }
        
        // stepNum = this.addStep(resultStates,currentState,`end`,stepNum,0);
        this.setState({resultStates});
    }
    addStep(resultStates,currentState,label,stepNum,instructionIndex){
        // console.log(`adding step with label: ${label}`);
        currentState.stepLabel = label;
        currentState.stepNum = stepNum;
        currentState.instructionIndex = instructionIndex;
        // currentState.results = Object.assign({},currentState.results);
        //line after this one essentially clones the object so it is no longer
        //  referencing a different object
        const loggedData = JSON.parse(JSON.stringify(currentState));
        resultStates.push(loggedData); //copies to empty obj to add
        return stepNum + 1;
    }
    resetState(){
        this.setState({
            results: {},
            barMaxSize: 0,
        });
    }
    togglePlay(){
        this.setState({playing: !this.state.playing });
        if (this.state.playing){
            this.setState({ playIntervalID: setInterval(this.nextState, 1000) });
        } else {
            clearInterval(this.state.playIntervalID);
        }
    }
    nextState(){
        if(this.state.currentResultState >= this.state.resultStates.length) return;
        this.setState({
            currentResultState: this.state.currentResultState+1
        });
        if(this.state.currentResultState >= this.state.resultStates.length) return;
        this.setState({
            results: this.state.resultStates[this.state.currentResultState].results
        });
    }
    prevState(){
        if(this.state.currentResultState <= 0) return;
        this.setState({
            currentResultState: this.state.currentResultState-1
        });
        if(this.state.currentResultState <= 0) return;
        this.setState({
            results: this.state.resultStates[this.state.currentResultState].results
        });
    }
    
    generateRow(data){
        return (
            <Table.Row key={`result-${data.die}`}>
                <Table.Cell>{data.die}</Table.Cell>
                <Table.Cell>{data.frequency}</Table.Cell>
                <Table.Cell>{data.percentage.toFixed(4)}</Table.Cell>
                <Table.Cell>{(data.percentage*100).toFixed(2)}%</Table.Cell>
                <Table.Cell>
                    <div className='bar'
                        style={
                            {width: data.percentage*this.state.barMaxSize}
                        }>
                    </div>
                </Table.Cell>
            </Table.Row>
        );
    }
    render(){
        return (
            <div id='container-out'>
            <div id='table-left'>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className='text'>Result</Table.HeaderCell>
                            <Table.HeaderCell className='text'>Frequency</Table.HeaderCell>
                            <Table.HeaderCell className='text'>Probability</Table.HeaderCell>
                            <Table.HeaderCell className='text'>Percentage</Table.HeaderCell>
                            <Table.HeaderCell className='bar-header'><div ref='bar'></div></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.values(this.state.results)
                            .map((result) => this.generateRow(result))}
                    </Table.Body>
                </Table>
            </div>
            <div id='info-right'>
                <VariableTable
                    step={this.props.step}
                    trials={this.props.trials}
                    data={this.state.resultStates[this.state.currentResultState-1] || this.state.dummyObj}
                />
                <Pseudocode 
                    resultState={this.state.resultStates[this.state.currentResultState-1] || ''}
                    step={this.props.step}
                />
                <TextScroller
                    step={this.props.step}
                    data={this.state.resultStates.map((result) =>result.stepLabel)}
                    index={this.state.currentResultState}
                />
            </div>
            </div>
        );
    }
}

export default DiceTable;