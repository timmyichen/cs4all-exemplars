import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class InputField extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.limit !== this.props.limit) {
            const dummyEvent = {
                target: { value : this.props.value }
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
                    onChange={this.changeValue.bind(this)}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    name: PropTypes.string,
    fieldLabel: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.number,
    limit: PropTypes.number,
    changeFunction: PropTypes.func,
}

export default InputField;