import React, { Component } from 'react';
import './App.css';
import DiceRollerControls from './components/DiceRollerControls';
import DiceTable from './components/DiceTable';
import { Header } from 'semantic-ui-react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: false,
            sides: 0,
            dice: 0,
            trials: 0,
        };
        this.setDiceVariables = this.setDiceVariables.bind(this);
        this.toggleStepMode = this.toggleStepMode.bind(this);
    }
    setDiceVariables(inputs) {
        this.setState(inputs);
    }
    toggleStepMode() {
        this.setState({ step: !this.state.step });
    }
    render() {
        return (
            <div id="roller">
                <Header as="h1">Dice Roll Simulator</Header>
                <DiceRollerControls
                    step={this.state.step}
                    submit={this.setDiceVariables}
                    toggle={this.toggleStepMode}
                />
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
