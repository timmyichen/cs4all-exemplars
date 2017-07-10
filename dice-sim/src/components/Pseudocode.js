import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

class Pseudocode extends Component {
    constructor(props){
        super(props);
        this.getClass = this.getClass.bind(this);
    }
    getClass(index){
        return this.props.resultState.instructionIndex === index ? 'highlight' : '';
    }
    render(){
        return (
            <div  className={this.props.step ? '' : 'hidden'}>
                <p className='highlight'>Highlighted text indicates a command that was <em>just</em> completed</p>
                <List bulleted>
                    <List.Item className={this.getClass(1)}>Set initial values for each roll result to zero</List.Item>
                    <List.Item>Repeat the following steps for each trial:<List.List>
                        <List.Item className={this.getClass(2)}>Set the initial value for the current trial total to zero</List.Item>
                        <List.Item>Repeat the following steps for each die being rolled:<List.List>
                            <List.Item className={this.getClass(3)}>Generate a random number between 1 and the number of sides</List.Item>
                            <List.Item className={this.getClass(4)}>Add the randomly generated number to the total</List.Item>
                        </List.List></List.Item>
                        <List.Item className={this.getClass(5)}>Add 1 to the frequency count for the roll result of our total</List.Item>
                    </List.List></List.Item>
                </List>
            </div>
        );
    }
}

export default Pseudocode;