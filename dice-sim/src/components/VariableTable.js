import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class VariableTable extends Component {
    render(){
        return (
            <div className={this.props.step ? '' : 'hidden'}>
                
            </div>
        )
    }
}

export default VariableTable;