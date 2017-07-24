import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class InputField extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.limit !== this.props.limit) {
            const dummyEvent = {
                target: { value: this.props.value },
            };
            this.props.changeFunction(dummyEvent, nextProps.name, nextProps.limit);
        }
    }
    changeValue(event) {
        this.props.changeFunction(event, this.props.name, this.props.limit);
    }
    render() {
        return (
            <div className="input-container">
                <label>{this.props.fieldLabel}</label>
                <Input
                    name={this.props.name}
                    type="number"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.changeValue}
                    disabled={this.props.isStepping}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    isStepping: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    fieldLabel: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    changeFunction: PropTypes.func.isRequired,
};

export default InputField;
