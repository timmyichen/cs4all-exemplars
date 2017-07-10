import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class VariableTable extends Component {
    render(){
        return (
            <div className={this.props.step ? '' : 'hidden'}>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Variable Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><code>trial</code></Table.Cell>
                            <Table.Cell>The current trial # we are running (out of {this.props.trials})</Table.Cell>
                            <Table.Cell><code>{this.props.data.trial}</code></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><code>random_number</code></Table.Cell>
                            <Table.Cell>The random number we last generated</Table.Cell>
                            <Table.Cell><code>{this.props.data.randomRoll}</code></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><code>total</code></Table.Cell>
                            <Table.Cell>Our total amount rolled for the current trial</Table.Cell>
                            <Table.Cell><code>{this.props.data.total}</code></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default VariableTable;