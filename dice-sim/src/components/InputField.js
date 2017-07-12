import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class InputField extends Component {
    getSelectField() {
        return (
            <select onChange={this.props.changeFunction}>
                {this.generateOptions(this.props.min, this.props.max)}
            </select>
        );
    }
    getInputField() {
        return (
            <input
                className="ui input"
                type="number"
                placeholder={this.props.label}
                onChange={this.props.changeFunction}
            />
        );
    }
    // generates options for <select> lists
    generateOptions(min, max) {
        const result = [];
        for (let i = min; i <= max; i++) {
            result.push(<option value={i} key={i}>{i}</option>);
        }
        return result;
    }
    render() {
        return (
            <Form.Field>
                <label>{this.props.label}</label>
                {this.props.step ? this.getSelectField() : this.getInputField()}
            </Form.Field>
        );
    }
}

InputField.propTypes = {
    changeFunction: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.string,
    step: PropTypes.bool,
};

export default InputField;
