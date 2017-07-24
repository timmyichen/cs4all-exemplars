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
                        content="First"
                        icon="double angle left"
                        labelPosition="left"
                        onClick={() => { this.props.goToStep(0); }}
                    />
                    <Button
                        disabled={!this.props.stepMode}
                        content="Previous"
                        icon="angle left"
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
                        icon="angle right"
                        labelPosition="right"
                        onClick={this.props.nextStep}
                    />
                    <Button
                        disabled={!this.props.stepMode}
                        content="Last"
                        icon="double angle right"
                        labelPosition="right"
                        onClick={() => { this.props.goToStep(this.props.lastStepIndex); }}
                    />
                </div>
                <div id="step-rate">
                    <input
                        type="range"
                        min="0.4"
                        max="4"
                        step="0.1"
                        value={this.props.playRate / 1000}
                        onChange={this.props.changeRate}
                        onMouseUp={this.props.setRate}
                    />
                    <br />
                    <p>Rate: {this.props.playRate / 1000}s</p>
                </div>
            </div>
        );
    }
}

StepControls.propTypes = {
    lastStepIndex: PropTypes.number.isRequired,
    stepMode: PropTypes.bool.isRequired,
    goToStep: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    togglePlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    playRate: PropTypes.number.isRequired,
    setRate: PropTypes.func.isRequired,
    changeRate: PropTypes.func.isRequired,
};

export default StepControls;
