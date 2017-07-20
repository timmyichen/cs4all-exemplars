import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popup, Icon } from 'semantic-ui-react'

import StepControls from './StepControls';
import VariableTable from './VariableTable';
import Pseudocode from './Pseudocode';
import PythonCode from './PythonCode';

class StepComponents extends Component {
    render() {
        return (
            <div id="step-components">
                <div id="step-heading">
                    <p>
                        <Button 
                            toggle
                            onClick={this.props.toggleStep}
                            active={this.props.stepMode}
                        >Step
                        <Popup
                            hoverable
                            trigger={<Icon name='question circle' size='large' />}
                            header="Enter Stepping Mode"
                            content="How does a computer (this website) do all these calculations?
                                Click on the 'Step' button to show, step-by-step, how everything
                                works behind the scenes.  However, while in stepping mode,
                                trials are limited to 99 for performance reasons."
                            position="right center"
                        / >
                        </Button>
                    </p>
                </div>
                
                <div className={this.props.stepMode ? '' : 'hidden'}>
                    <VariableTable
                        trial={this.props.currentStep.trial.toString()}
                        total={this.props.currentStep.total.toString()}
                        randomRoll={this.props.currentStep.randomRoll.toString()}
                    />
                    <StepControls
                        stepMode={this.props.stepMode && this.props.isStepping}
                        goToStep={this.props.goToStep}
                        nextStep={this.props.nextStep}
                        prevStep={this.props.prevStep}
                        togglePlay={this.props.togglePlay}
                        isPlaying={this.props.isPlaying}
                        playRate={this.props.playRate}
                        changeRate={this.props.changeRate}
                        setRate={this.props.setRate}
                        lastStepIndex={this.props.lastStepIndex}
                    />
                    <Pseudocode
                        currentIndex={this.props.currentStep.instructionIndex}
                        trials={this.props.trials}
                        sides={this.props.sides}
                        dice={this.props.dice}
                    />
                    <PythonCode
                        currentIndex={this.props.currentStep.instructionIndex}
                    />
                </div>
            </div>
        );
    }
}

StepComponents.propTypes = {
    results: PropTypes.object,
    stepMode: PropTypes.bool,
    currentStep: PropTypes.object,
    toggleStep: PropTypes.func,
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    isPlaying: PropTypes.bool,
    togglePlay: PropTypes.func,
};

export default StepComponents;