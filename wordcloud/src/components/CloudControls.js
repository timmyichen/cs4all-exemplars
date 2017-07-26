import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

class CloudControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editStopWords: false,
        };
        this.toggleEdit = this.toggleEdit.bind(this);
    }
    toggleEdit() {
        this.setState(prev => ({editStopWords: !prev.editStopWords}));
    }
    render() {
        return (
            <div id="cloud-controls">
                <Form>
                    <Form.TextArea
                        label="Paste/enter your text below:"
                        placeholder="text goes here.."
                        value={this.props.text}
                        onChange={this.props.changeText}
                    />
                    <Button 
                        toggle
                        active={this.state.editStopWords}
                        onClick={this.toggleEdit}
                    >
                        Edit Stopwords
                    </Button>
                    <Form.TextArea
                        className={this.state.editStopWords ? '' : 'hidden'}
                        label="Edit stop words below, one per line"
                        placeholder="there should be at least a few stop words.."
                        value={this.props.stopWords}
                        onChange={this.props.changeStopWords}
                    />
                    <Button
                        type="submit"
                        onClick={this.props.renderCloud}
                    >Go!</Button>
                </Form>
                
            </div>
        );
    }
}

CloudControls.propTypes = {
    text: PropTypes.string.isRequired,
    stopWords: PropTypes.string.isRequired,
    changeText: PropTypes.func.isRequired,
    changeStopWords: PropTypes.func.isRequired,
    renderCloud: PropTypes.func.isRequired,
};

export default CloudControls;
