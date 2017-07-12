import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextScrollerLine from './TextScrollerLine';

class TextScroller extends Component {
    render() {
        return (
            <div id="scroller" className={this.props.step ? '' : 'hidden'}>
                {[''].concat(this.props.data).map((line, i) =>
                    (<TextScrollerLine
                        key={i}
                        currentIndex={this.props.index}
                        elemIndex={i}
                        text={this.props.data[i]}
                    />)
                )}
            </div>
        );
    }
}

TextScroller.propTypes = {
    index: PropTypes.number,
    data: PropTypes.array,
    step: PropTypes.bool,
};

export default TextScroller;
