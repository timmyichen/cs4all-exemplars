import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import InputField from './InputField';

class DiceRollerControls extends Component {
    constructor(props){
        super(props);
        this.state = {
            sides: null,
            dice: null,
            trials: null
        };
        this.changeSides = this.changeSides.bind(this);
        this.changeDice = this.changeDice.bind(this);
        this.changeTrials = this.changeTrials.bind(this);
        this.handleRoll = this.handleRoll.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }
    componentWillMount(){
        window.addEventListener('keypress',this.handleKeypress);
    }
    componentWillUnmount(){
        window.removeEventListener('keypress',this.handleKeypress);
    }
    handleKeypress(e){
        if (e.keyCode === 13){
            this.handleRoll();
        }
    }
    changeSides(event){
        this.setState({sides: parseInt(event.target.value,10)})
    }
    changeDice(event){
        this.setState({dice: parseInt(event.target.value,10)})
    }
    changeTrials(event){
        this.setState({trials: parseInt(event.target.value,10)})
    }
    handleRoll(){
        if(!this.state.sides || !this.state.dice || !this.state.trials){
            alert("At least one field is blank or zero, please try again");
            return;
        }
        this.props.submit(this.state);
    }
    render(){
        return (
            <Form>
                <Form.Group>
                    <InputField step={this.props.step} label='# of sides' max='6' min='1' changeFunction={this.changeSides} />
                    <InputField step={this.props.step} label='# of dice' max='3' min='1' changeFunction={this.changeDice} />
                    <InputField step={this.props.step} label='# of trials' max='15' min='1' changeFunction={this.changeTrials} />
                </Form.Group>
                <Button onClick={this.handleRoll}>Roll! (Enter)</Button>
            </Form>
        )
    }
}

export default DiceRollerControls;