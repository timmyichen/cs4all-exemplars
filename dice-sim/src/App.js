import React, { Component } from 'react';
import './App.css';
import DiceRollerControls from './components/DiceRollerControls';
import DiceTable from './components/DiceTable';

class App extends Component {
    constructor(props){
        super();
        this.state = {
            step: true,
            sides: 0,
            dice: 0,
            trials: 0
        };
        this.setDiceVariables = this.setDiceVariables.bind(this);
    }
    setDiceVariables(inputs){
        this.setState(inputs);
    }
    render() {
        return (
            <div>
                <DiceRollerControls step={this.state.step} submit={this.setDiceVariables} />
                <DiceTable 
                    step={this.state.step}
                    sides={this.state.sides}
                    dice={this.state.dice}
                    trials={this.state.trials}
                />
            </div>
        );
    }
}

export default App;
