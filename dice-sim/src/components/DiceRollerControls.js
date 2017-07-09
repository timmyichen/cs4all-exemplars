import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

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
                <Form.Group width='equal'>
                    <Form.Field>
                        <label># of sides</label>
                        <Input type='number' placeholder='# of sides' onChange={this.changeSides}><input /></Input>
                    </Form.Field>
                    <Form.Field>
                        <label># of die</label>
                        <Input type='number' placeholder='# of die' onChange={this.changeDice}><input /></Input>
                    </Form.Field>
                    <Form.Field>
                        <label># of trials</label>
                        <Input type='number' placeholder='# of trials' onChange={this.changeTrials}><input /></Input>
                    </Form.Field>
                </Form.Group>
                <Button onClick={this.handleRoll}>Roll!</Button>
            </Form>
        )
    }
}

export default DiceRollerControls;