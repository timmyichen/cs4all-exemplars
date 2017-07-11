import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { arraysEqual } from '../helpers/helpers';

class TextScroller extends Component {
    constructor(props){
        super(props);
        this.generateItem = this.generateItem.bind(this);
    }
    componentWillReceiveProps(nextProps){
        /*
        step = whether in stepping mode or not
        data = array of messages
        index = current message
        */
        // if(!arraysEqual(this.props.data,nextProps.data)){
        //     const offsetValues = ['']
        //     for(let i=0; i<nextProps.data.length; i++){
        //         offsetValues.push()
        //     }
        // } else {
            
        // }
        // this.setState({offset:nextProps.index * })
    }
    getOpacity(i,index){
        switch(Math.abs(index - i)){
            case 0: return 1 //full opacity
            case 1: return 0.5 //half visible (for adjacent lines)
            default: return 0
        }
    }
    generateItem(item,i){
        const style = {
            top: 25*i - (25*this.props.index),
            // opacity: i <= this.props.index+1 && i >= this.props.index-1 ? 1 : 0,
            opacity: this.getOpacity(i,this.props.index),
            border: i == this.props.index && item != '' ? '1px solid black' : 'none',
            display: Math.abs(this.props.index-i) <= 1 ? 'block' : 'none'
        };
        return (
            <p key={i} style={style} className='scroll-item'>{item}</p>
        );
    }
    render(){
        return (
            <div id='scroller' className={this.props.step ? '' : 'hidden'}>
                {[''].concat(this.props.data).map(this.generateItem)}
            </div>
        );
    }
}

export default TextScroller;