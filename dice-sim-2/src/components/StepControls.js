import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

class StepControls extends Component {
    render() {
        return (
            <div id="step-controls">
                <div id="step-buttons">
                    <Button
                        disabled={!this.props.stepMode}
                        content="Previous"
                        icon="left arrow"
                        labelPosition="left"
                        onClick={this.props.prevStep}
                    />
                    <Button
                        disabled={!this.props.stepMode}
                        onClick={this.props.togglePlay}
                    >
                        {this.props.isPlaying ? 'Pause' : 'Play'}<br />
                        <Icon name={this.props.isPlaying ? 'pause' : 'play'} />
                    </Button>
                    <Button
                        disabled={!this.props.stepMode}
                        content="Next"
                        icon="right arrow"
                        labelPosition="right"
                        onClick={this.props.nextStep}
                    />
                </div>
                <div id="step-rate">
                    <input
                        type="range"
                        min="0.4"
                        max="4"
                        step="0.1"
                        value={this.props.playRate/1000}
                        onChange={this.props.changeRate}
                        onMouseUp={this.props.setRate}
                    />
                    <br />
                    <p>Rate: {this.props.playRate/1000}s</p>
                </div>
            </div>
        );
    }
}

StepControls.propTypes = {
    stepMode: PropTypes.bool,
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    togglePlay: PropTypes.func,
    isPlaying: PropTypes.bool,
};

export default StepControls;