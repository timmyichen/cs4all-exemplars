import React, { Component } from 'react';
import PropTypes from 'prop-types';
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