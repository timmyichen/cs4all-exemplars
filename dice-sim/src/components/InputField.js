import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

class InputField extends Component {
    constructor(props){
        super(props);
        
    }
    generateOptions(min,max){
        const result = [];
        for(let i=min; i<=max; i++){
            result.push(
                <option value={i}>{i}</option>
            )
        }
        return result;
    }
    getSelectField(){
        return (
            <select onChange={this.props.changeFunction}>
                {this.generateOptions(this.props.min,this.props.max)}
            </select>
        )
    }
    getInputField(){
        return (
            <input className='ui input' 
                type='number'
                placeholder={this.props.label}
                onChange={this.props.changeFunction}
            ></input>
        )
    }
    render(){
        return (
            <Form.Field>
                <label>{this.props.label}</label>
                {this.props.step ? this.getSelectField() : this.getInputField()}
            </Form.Field>
        )
    }
}

export default InputField;