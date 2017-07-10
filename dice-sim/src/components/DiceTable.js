import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import randomInt from '../helpers';

class DiceTable extends Component {
    constructor(props){
        super();
        this.state = {
            resultStates: [],
            currentResultState: 0,
            showControls: false,
            results: {},
            barMaxSize: 0,
        };
        this.resetState = this.resetState.bind(this);
        this.generateRow = this.generateRow.bind(this);
        this.setBarMaxSize = this.setBarMaxSize.bind(this);
        this.rollAllDice = this.rollAllDice.bind(this);
        this.setInitialResultState = this.setInitialResultState.bind(this);
        this.populateResultStates = this.populateResultStates.bind(this);
        this.nextState = this.nextState.bind(this);
        this.prevState = this.prevState.bind(this);
    }
    componentDidMount(){
        this.setBarMaxSize();
        window.addEventListener('resize', this.setBarMaxSize);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.setBarMaxSize);
    }
    setBarMaxSize(){
        this.setState({
            barMaxSize: this.refs.bar.parentNode.clientWidth-25
        })
    }
    componentWillReceiveProps(nextProps){
        //first if statement is necessary so that it will not try to roll the dice
        //  when the 'step' prop is changed
        if(nextProps.step === this.props.step){
            if(!nextProps.step){
                this.rollAllDice(nextProps)
            } else {
                this.setInitialResultState(nextProps);
                this.populateResultStates(nextProps);
            }
        } else {
            this.setState({results: {}});
        }
    }
    rollAllDice(props){
        const sides = props.sides;
        const dice = props.dice;
        const trials = props.trials;
        
        const results = {};
        const now = Date.now();
        
        for(let die=dice; die<=sides*dice; die++){
            results[die] = { frequency: 0, die};
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
            results[die] = { frequency: 0, die, percentage: 0};
        }
        this.setState({
            sides,dice,trials,
            currentStep: 0,
            showControls: true,
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
        };
        let stepNum = 0;
        
        for(let die=dice; die<=sides*dice; die++){
            currentState.results[die] = { frequency: 0, die, percentage: 0};
        }
        console.log('begin')
        stepNum = this.addStep(resultStates,currentState,'Set initial values for each roll result to zero',0);
        
        for(let trial=1; trial<=trials; trial++){
            let total=0;
            currentState.total = 0;
            stepNum = this.addStep(resultStates,currentState,'Set initial values each trial total to zero',stepNum);
            
            for(let die=1; die<=dice; die++){
                const randomRoll = randomInt(1,sides);
                currentState.randomRoll = randomRoll;
                stepNum = this.addStep(resultStates,currentState,`generate random number between 1 and ${sides} for trial#${trial}: number=${randomRoll}`,stepNum);
                total += randomRoll;
                stepNum = this.addStep(resultStates,currentState,`add ${randomRoll} to total for trial#${trial}. Total rolled is now ${total}`,stepNum);
            }
            currentState.results[total].frequency += 1;
            stepNum = this.addStep(resultStates,currentState,`add 1 to frequency count for roll result ${total}`,stepNum);
            
            for(let die=dice; die<=sides*dice; die++){
                currentState.results[die].percentage = (currentState.results[die].frequency / trial);
            }
            stepNum = this.addStep(resultStates,currentState,`update percentage values`,stepNum);
        }
        
        this.setState({resultStates});
    }
    addStep(resultStates,currentState,label,stepNum){
        // console.log(`adding step with label: ${label}`);
        currentState.stepLabel = label;
        currentState.stepNum = stepNum;
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
    nextState(){
        if(this.state.currentResultState >= this.state.resultStates.length) return;
        this.setState({
            currentResultState: this.state.currentResultState+1
        })
        this.setState({
            results: this.state.resultStates[this.state.currentResultState].results
        });
    }
    prevState(){
        if(this.state.currentResultState <= 0) return;
        this.setState({
            currentResultState: this.state.currentResultState-1
        })
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
        )
    }
    render(){
        return (
            <div>
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
            <Button onClick={this.prevState}>prev</Button>
            <Button onClick={this.nextState}>next</Button>
            {this.state.resultStates.map((result,index) => (<p key={result.stepNum} style={{fontWeight: this.state.currentResultState-1 === index ? 'bold' : ''}} >{result.stepLabel}</p>))}
            </div>
        );
    }
}

export default DiceTable;