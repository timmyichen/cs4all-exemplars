import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

class StepControls extends Component {
    render() {
        return (
            <div id="step-controls">
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