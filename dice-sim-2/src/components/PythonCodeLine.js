import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js';

class PythonCodeLine extends Component {
    constructor(props) {
        super(props);
        this.getClass = this.getClass.bind(this);
    }
    getClass() {
        if (this.props.blockIndex === -1) return;
        return this.props.currentIndex === this.props.blockIndex ? 'highlight' : '';
    }
    render() {
        return (
            <div className={this.getClass()}>
            <Highlight language="python"
                
            >
                {this.props.lineText}
            </Highlight>
                </div>
        );
    }
}

PythonCodeLine.propTypes = {
    currentIndex: PropTypes.number,
};

export default PythonCodeLine;