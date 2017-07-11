import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import rollAllDice, { rollSteppedDice } from '../helpers/diceTools';
import Pseudocode from './Pseudocode';
import VariableTable from './VariableTable';
import TextScroller from './TextScroller';
import ResultRow from './ResultRow';
import PubSub from 'pubsub-js';

class DiceTable extends Component {
    constructor(props){
        super();
        this.state = {
            resultSteps: [], //array containing all possible states (for stepping through)
            currentresultStep: 0,
            showControls: false, //true when able to step through code
            results: {},
            barMaxSize: 0,
            instructionIndex: 0,
            dummyObj: {trial: '', randomRoll: '', total: '', instructionIndex: ''},
            playing: false,
            playIntervalID: null,
        };
        this.setBarMaxSize = this.setBarMaxSize.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.nextState = this.nextState.bind(this);
        this.prevState = this.prevState.bind(this);
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
                this.setState({results: rollAllDice(nextProps) });
            } else {
                this.setState(rollSteppedDice(nextProps));
            }
        } else {
            this.setState({
                results: {},
                resultSteps: [],
                showControls: !this.state.showControls,
            });
        }
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
        if(this.state.currentresultStep >= this.state.resultSteps.length) return;
        this.setState({
            currentresultStep: this.state.currentresultStep+1
        });
        if(this.state.currentresultStep >= this.state.resultSteps.length) return;
        this.setState({
            results: this.state.resultSteps[this.state.currentresultStep].results
        });
    }
    prevState(){
        if(this.state.currentresultStep <= 0) return;
        this.setState({
            currentresultStep: this.state.currentresultStep-1
        });
        if(this.state.currentresultStep <= 0) return;
        this.setState({
            results: this.state.resultSteps[this.state.currentresultStep].results
        });
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
                            .map((result) => <ResultRow
                                                key={`result-${result.die}`}
                                                die={result.die}
                                                frequency={result.frequency}
                                                percentage={result.percentage}
                                                barMaxSize={this.state.barMaxSize}
                                             />
                        )}
                    </Table.Body>
                </Table>
            </div>
            <div id='info-right'>
                <VariableTable
                    step={this.props.step}
                    trials={this.props.trials}
                    data={this.state.resultSteps[this.state.currentresultStep-1] || this.state.dummyObj}
                />
                <Pseudocode 
                    resultStep={this.state.resultSteps[this.state.currentresultStep-1] || ''}
                    step={this.props.step}
                />
                <TextScroller
                    step={this.props.step}
                    data={this.state.resultSteps.map((result) =>result.stepLabel)}
                    index={this.state.currentresultStep}
                />
            </div>
            </div>
        );
    }
}

export default DiceTable;