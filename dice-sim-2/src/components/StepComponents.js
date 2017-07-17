import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react'

import StepControls from './StepControls';
import VariableTable from './VariableTable';
import Pseudocode from './Pseudocode';
import PythonCode from './PythonCode';

import { isEmptyObject } from '../helpers/helpers';

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
                        >Step</Button>
                    </p>
                    <p className="intro">intro</p>
                </div>
                
                <div className={this.props.stepMode ? '' : 'hidden'}>
                    <VariableTable
                        trial={this.props.currentStep.trial.toString()}
                        total={this.props.currentStep.total.toString()}
                        randomRoll={this.props.currentStep.randomRoll.toString()}
                    />
                    <StepControls
                        stepMode={this.props.stepMode && !isEmptyObject(this.props.results)}
                        nextStep={this.props.nextStep}
                        prevStep={this.props.prevStep}
                        togglePlay={this.props.togglePlay}
                        isPlaying={this.props.isPlaying}
                        playRate={this.props.playRate}
                        changeRate={this.props.changeRate}
                        setRate={this.props.setRate}
                    />
                    <Pseudocode
                        currentIndex={this.props.currentStep.instructionIndex}
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