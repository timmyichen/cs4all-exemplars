import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';

class InputFields extends Component {
    render() {
        const fieldData = [
            {
                name: 'sides',
                fieldLabel: '# of sides',
                placeholder: '# of sides',
                value: this.props.sides,
                limit: this.props.stepMode ? 20 : -1,
            },
            {
                name: 'dice',
                fieldLabel: '# of dice',
                placeholder: '# of dice',
                value: this.props.dice,
                limit: this.props.stepMode ? 4 : -1,
            },
            {
                name: 'trials',
                fieldLabel: '# of trials',
                placeholder: '# of trials',
                value: this.props.trials,
                limit: this.props.stepMode ? 99 : -1,
            },
        ];
        return (
            <div id="inputs">
                {fieldData.map(field => (
                    <InputField
                        key={field.name}
                        name={field.name}
                        fieldLabel={field.fieldLabel}
                        placeholder={field.placeholder}
                        value={field.value}
                        limit={field.limit}
                        changeFunction={this.props.changeFunction}
                        isStepping={this.props.isStepping}
                    />
                ))}
            </div>
        );
    }
}

InputFields.propTypes = {
    sides: PropTypes.number,
    dice: PropTypes.number,
    trials: PropTypes.number,
    stepMode: PropTypes.bool,
    changeFunction: PropTypes.func,
};

export default InputFields;