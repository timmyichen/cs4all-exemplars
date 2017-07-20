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