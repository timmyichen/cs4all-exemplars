import React, { Component } from 'react';
import './App.css';
import DiceRollerControls from './components/DiceRollerControls';
import DiceTable from './components/DiceTable';

class App extends Component {
    constructor(props){
        super();
        this.state = {
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
                <DiceRollerControls submit={this.setDiceVariables} />
                <DiceTable 
                    sides={this.state.sides}
                    dice={this.state.dice}
                    trials={this.state.trials}
                />
            </div>
        );
    }
}

export default App;
