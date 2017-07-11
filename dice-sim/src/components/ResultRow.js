import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class ResultRow extends Component {
    render(){
        return (
            <Table.Row>
                <Table.Cell>{this.props.die}</Table.Cell>
                <Table.Cell>{this.props.frequency}</Table.Cell>
                <Table.Cell>{this.props.percentage.toFixed(4)}</Table.Cell>
                <Table.Cell>{(this.props.percentage*100).toFixed(2)}%</Table.Cell>
                <Table.Cell>
                    <div className='bar'
                        style={
                            {width: this.props.percentage*this.props.barMaxSize}
                        }>
                    </div>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default ResultRow;