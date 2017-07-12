import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextScrollerLine extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (Math.abs(nextProps.elemIndex - nextProps.currentIndex) <= 2) return true;
        return false;
    }
    getOpacity(i, index) {
        switch (Math.abs(index - i)) {
            case 0: return 1; // full opacity
            case 1: return 0.5; // half visible (for adjacent lines)
            default: return 0;
        }
    }
    generateTopStyle(i, index) {
        if (index - i === 0) {
            return 0;
        } else if (index - i === 1) {
            return -25;
        } else if (index - i > 1) {
            return -50;
        } else if (index - i === -1) {
            return 25;
        } else if (index - i < -1) {
            return 50;
        }
    }
    render() {
        console.log('updating');
        const style = {
            // top: (25 * i) - (25 * this.props.index),
            top: this.generateTopStyle(this.props.elemIndex, this.props.index),
            opacity: this.getOpacity(this.props.elemIndex, this.props.index),
            border: this.props.elemIndex === this.props.currentIndex && this.props.text !== '' ? '1px solid black' : 'none',
            display: Math.abs(this.props.currentIndex - this.props.elemIndex) <= 1 ? 'block' : 'none',
        };
        return (
            <p style={style} className="scroll-item">{this.props.text}</p>
        );
    }
}

TextScrollerLine.propTypes = {
    index: PropTypes.number,
};

export default TextScrollerLine;
