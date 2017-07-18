import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Header, Icon } from 'semantic-ui-react';
// import Highlight from 'react-highlight.js';

import PythonCodeLine from './PythonCodeLine';

import { parsePythonCode } from '../helpers/pythonParsing';

class PythonCode extends Component {
    constructor(props) {
        super(props);
        
        parsePythonCode('./py/dice_roll.py').then(data => {
            this.state = { codeLines: data };
        })
        this.state = { codeLines: [] };
        
        this.getClass = this.getClass.bind(this);
    }
    getClass(index) {
        return this.props.currentIndex === index ? 'highlight' : '';
    }
    render() {
        return (
            <div id="pythoncode">
                <Header as="h2">
                    The Code (Python3)
                    <Popup
                        className="weird-adjustment"
                        hoverable
                        header="Computer-Runnable Code"
                        trigger={<Icon name='question circle' size='small' />}
                        content={<p>Computers can run through the algorithm much faster than
                        humans can.  The code supplied below is actual Python3 code that 
                        will calculate the probability of the dice rolls.  Python3 is a 
                        powerful scripting language used in a variety of ways.  You can
                        write and run Python3 code online at&nbsp;
                        <a href='https://repl.it/languages/python3'>repl.it</a></p>}
                    />
                </Header>
                { this.state.codeLines.map(line => (
                    <PythonCodeLine
                        key={`code-${line.lineNumber}`}
                        currentIndex={this.props.currentIndex}
                        blockIndex={line.blockIndex}
                        lineText={line.lineText}
                    />
                )) }
            </div>
        );
    }
}

PythonCode.propTypes = {
    currentIndex: PropTypes.number,
};

export default PythonCode;