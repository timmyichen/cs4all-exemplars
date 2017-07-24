import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js';

class PythonCodeLine extends Component {
    constructor(props) {
        super(props);
        this.getClass = this.getClass.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.blockIndex === -1) return false;
        return true;
    }
    getClass() {
        if (this.props.blockIndex === -1) return '';
        return this.props.currentIndex === this.props.blockIndex ? 'highlight' : '';
    }
    render() {
        return (
            <div className={this.getClass()}>
            <Highlight language="python">
                {this.props.lineText}
            </Highlight>
                </div>
        );
    }
}

PythonCodeLine.propTypes = {
    blockIndex: PropTypes.number.isRequired,
    lineText: PropTypes.string.isRequired,
    currentIndex: PropTypes.number,
};

export default PythonCodeLine;
