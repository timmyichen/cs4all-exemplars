import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import randomInt from '../helpers';

class DiceTable extends Component {
    constructor(props){
        super();
        this.state = {
            results: {},
            barMaxSize: 0,
        };
        this.resetState = this.resetState.bind(this);
        this.generateRow = this.generateRow.bind(this);
        this.setBarMaxSize = this.setBarMaxSize.bind(this);
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
        const sides = nextProps.sides;
        const dice = nextProps.dice;
        const trials = nextProps.trials;
        
        const results = this.state.results;
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
    resetState(){
        this.setState({
            results: {},
            barMaxSize: 0,
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
        );
    }
}

export default DiceTable;