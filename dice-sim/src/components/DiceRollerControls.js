import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InputField from './InputField';
import PubSub from 'pubsub-js';

class DiceRollerControls extends Component {
    constructor(props) {
        super(props);
        if (props.step) {
            this.state = {
                sides: 1,
                dice: 1,
                trials: 1,
                play: false,
            };
        } else {
            this.state = {
                sides: null,
                dice: null,
                trials: null,
                play: false,
            };
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.changeSides = this.changeSides.bind(this);
        this.changeDice = this.changeDice.bind(this);
        this.changeTrials = this.changeTrials.bind(this);
        this.handleRoll = this.handleRoll.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }
    componentWillMount() {
        window.addEventListener('keypress', this.handleKeypress);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.step !== this.props.step) {
            if (nextProps.step) {
                this.setState({ sides: 1, dice: 1, trials: 1 });
            } else {
                this.setState({
                    sides: null,
                    dice: null,
                    trials: null,
                });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeypress);
    }
    handleKeypress(e) {
        if (e.keyCode === 13) {
            this.handleRoll();
        }
    }
    togglePlay() {
        PubSub.publish('playPause');
        this.setState({ play: !this.state.play });
    }
    changeSides(event) {
        this.setState({ sides: parseInt(event.target.value, 10) });
    }
    changeDice(event) {
        this.setState({ dice: parseInt(event.target.value, 10) });
    }
    changeTrials(event) {
        this.setState({ trials: parseInt(event.target.value, 10) });
    }
    handleRoll() {
        if ((!this.state.sides || !this.state.dice || !this.state.trials) && !this.props.step) {
            alert('At least one field is blank or zero, please try again');
            return;
        }
        this.props.submit(this.state);
    }
    render() {
        return (
            <Form>
                <Form.Group>
                    <InputField
                        step={this.props.step}
                        label="# of sides"
                        max={12}
                        min={1}
                        changeFunction={this.changeSides}
                    />
                    <InputField
                        step={this.props.step}
                        label="# of dice"
                        max={3}
                        min={1}
                        changeFunction={this.changeDice}
                    />
                    <InputField
                        step={this.props.step}
                        label="# of trials"
                        max={99}
                        min={1}
                        changeFunction={this.changeTrials}
                    />
                    <div className="buttons">
                        <Button onClick={this.handleRoll}>Roll!<br />(Enter) </Button>
                        <Button className="wider" toggle active={this.props.step} onClick={this.props.toggle}>Enable stepping<br />(limits inputs)</Button>
                        <div className={this.props.step ? 'buttons' : 'buttons hidden'}>
                            <Button onClick={() => { PubSub.publish('prevState'); }}>Previous<br />Instruction</Button>
                            <Button onClick={this.togglePlay}>{ this.state.play ? 'Pause' : 'Play' }</Button>
                            <Button onClick={() => { PubSub.publish('nextState'); }}>Next<br />Instruction</Button>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        );
    }
}

DiceRollerControls.propTypes = {
    step: PropTypes.bool,
    submit: PropTypes.func,
    toggle: PropTypes.func,
};

export default DiceRollerControls;
