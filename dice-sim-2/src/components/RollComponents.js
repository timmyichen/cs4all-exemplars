import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

import InputFields from './InputFields';
import ResultTable from './ResultTable';

class RollComponents extends Component {
    constructor(props) {
        super(props);
        this.state = { active: false };
        this.handleClick = this.handleClick.bind(this);
        this.determineButtonText = this.determineButtonText.bind(this);
        this.getRunTimeString = this.getRunTimeString.bind(this);
    }
    determineButtonText() {
        if (!this.props.stepMode) {
            return 'Roll';
        } else {
            if (!this.props.isStepping) {
                return 'Begin Stepping';
            } else {
                return 'Stop Stepping';
            }
        }
    }
    handleClick() {
        if (this.props.stepMode) {
            this.props.toggleStepBegin();
            this.setState( prevState => !prevState.active );
        }
        this.props.rollFunction();
    }
    getRunTimeString() {
        let value = '';
        if (this.props.runTime < 0 || this.props.runTime > 5000) {
            value = 'N/A';
        } else {
            value = (this.props.runTime/1000).toFixed(3);
            if (this.props.runTime === 0) {
                value = `less than ${value}`;
            }
        }
        
        return `Process completed in ${value} seconds`;
    }
    render() {
        return (
            <div id='roll-components'>
                <Form>
                    <InputFields
                        sides={this.props.sides}
                        dice={this.props.dice}
                        trials={this.props.trials}
                        stepMode={this.props.stepMode}
                        changeFunction={this.props.changeFunction}
                        isStepping={this.props.isStepping}
                    />
                    <div>
                        <Button
                            onClick={this.handleClick}
                            toggle={this.props.isStepping}
                            active={this.state.buttonActive}
                        >
                            {this.determineButtonText()}
                        </Button>
                    </div>
                </Form>
                <ResultTable
                    results={this.props.results}
                />
                <p className={this.props.stepMode ? 'hidden' : ''}>{this.getRunTimeString()}</p>
            </div>
        );
    }
}

RollComponents.propTypes = {
    sides: PropTypes.number,
    dice: PropTypes.number,
    trials: PropTypes.number,
    stepMode: PropTypes.bool,
    changeFunction: PropTypes.func,
    rollFunction: PropTypes.func,
    results: PropTypes.object,
};

export default RollComponents;