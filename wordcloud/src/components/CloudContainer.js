import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

import CloudControls from './CloudControls';

import { prepareText, prepareStopWords, removeStopWords } from '../helpers/helpers';

class CloudContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [],
        };
        
        this.makeCloud = this.makeCloud.bind(this);
        this.draw = this.draw.bind(this);
        
        this.state = { cloud: null };
        
        this.renderCloud = this.renderCloud.bind(this);
        
    }
    makeCloud(wordData) {
        return cloud()
            .size([this.refs.cloudOutRef.offsetWidth, 500])
            .words(wordData)
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", this.draw);
    }
    renderCloud() {
        const wordData = prepareText(this.props.text);
        
        const stopWords = prepareStopWords(this.props.stopWords);
        const cloudData = removeStopWords(wordData, stopWords);
        
        const values = cloudData.map(data => data.size);
        const scale = d3.scaleLinear()
            .domain([Math.min(...values), Math.max(...values)])
            .range([25,150]);
        
        // wordData = wordData.map((data) => { data.size = scale(data.size); });
        cloudData.forEach((data) => {
            data.frequency = data.size;
            data.size = scale(data.size);
        });
        
        // console.table(cloudData);
        
        this.setState({
            cloud: this.makeCloud(cloudData)
        },
        () => {this.state.cloud.start()});
    }
    draw(words) {
        const layout = this.state.cloud;
        const fill = d3.schemeCategory20;
        d3.select('svg').remove();
        d3.select("#cloud-output").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill[i%20]; })
            .attr("text-anchor", "middle")
            .attr("data-freq", function(d) { return d.frequency; })
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
    render() {
        return (
            <div id="cloud-elements">
                <CloudControls
                    text={this.props.text}
                    stopWords={this.props.stopWords}
                    changeText={this.props.changeText}
                    changeStopWords={this.props.changeStopWords}
                    renderCloud={this.renderCloud}
                />
                <div id="cloud-output" ref="cloudOutRef"></div>
            </div>
        );
    }
}

CloudContainer.propTypes = {
    text: PropTypes.string.isRequired,
    stopWords: PropTypes.string.isRequired,
    changeText: PropTypes.func.isRequired,
    changeStopWords: PropTypes.func.isRequired,
};

export default CloudContainer;
