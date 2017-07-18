import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

class Pseudocode extends Component {
    getClass(index) {
        return this.props.currentIndex === index ? 'highlight' : '';
    }
    render() {
        return (
            <div id="pseudocode">
                <p className="highlight">Highlighted text indicates the step that was <em>just</em> completed</p>
                <List bulleted>
                    <List.Item className={this.getClass(0)}>Set initial values for each roll result to zero</List.Item>
                    <List.Item>Repeat the following steps for each trial:<List.List>
                        <List.Item className={this.getClass(1)}>Set the initial value for the current trial total to zero</List.Item>
                        <List.Item>Repeat the following steps for each die being rolled:<List.List>
                            <List.Item className={this.getClass(2)}>Generate a random number between 1 and the number of sides</List.Item>
                            <List.Item className={this.getClass(3)}>Add the randomly generated number to the total</List.Item>
                        </List.List></List.Item>
                        <List.Item className={this.getClass(4)}>Add 1 to the frequency count for the roll result of our total</List.Item>
                    </List.List></List.Item>
                </List>
            </div>
        );
    }
}

Pseudocode.propTypes = {
    currentIndex: PropTypes.number,
};

export default Pseudocode;