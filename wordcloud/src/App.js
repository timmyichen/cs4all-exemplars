import React, { Component } from 'react';

import CloudContainer from './components/CloudContainer';
import CsContainer from './components/CsContainer';

import { getStopWords } from './helpers/helpers';
import { Header } from 'semantic-ui-react';

const defaultText = `This is a bunch of text you should probably change. Change it to whatever you want!  Or run it to see what happens.  The world is your oyster.  Or maybe just this web app.  Repeated words words words words words words will appear as larger text text text.`

class App extends Component {
    componentDidMount
    constructor(props) {
        super(props);
        this.state = {
            cloudText: defaultText,
            stopWords: '',
            tabIndex: 0,
        };
        getStopWords().then((data) => {
            this.setState({stopWords: data});
        });
        this.changeText = this.changeText.bind(this);
        this.changeStopWords = this.changeStopWords.bind(this);
    }
    changeText(event) {
        this.setState({ cloudText: event.target.value });
    }
    changeStopWords(event) {
        this.setState({ stopWords: event.target.value });
    }
    render() {
        return (
            <div id="main-container">
                <Header as="h1">Cloud Word Generator</Header>
                <CloudContainer
                    text={this.state.cloudText}
                    stopWords={this.state.stopWords}
                    changeText={this.changeText}
                    changeStopWords={this.changeStopWords}
                />
                <CsContainer
                />
            </div>
        );
    }
}

export default App;
