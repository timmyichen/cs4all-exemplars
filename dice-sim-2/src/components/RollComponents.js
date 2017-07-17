import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

import InputFields from './InputFields';
import ResultTable from './ResultTable';

class RollComponents extends Component {
    // handleClick() {
    //     if (this.props.stepMode) {
    //         this.props.stepFunction();
    //     } else {
    //         this.props.rollFunction();
    //     }
    // }
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
                    />
                    <div>
                        <Button onClick={this.props.rollFunction}>
                            {this.props.stepMode ? 'Being Stepping' : 'Roll'}
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