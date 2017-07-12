import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

function VariableTable(props) {
    return (
        <div className={props.step ? '' : 'hidden'}>
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
                        <Table.Cell>The current trial # we are running (out of {props.trials})</Table.Cell>
                        <Table.Cell><code>{props.data.trial}</code></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell><code>random_number</code></Table.Cell>
                        <Table.Cell>The random number we last generated</Table.Cell>
                        <Table.Cell><code>{props.data.randomRoll}</code></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell><code>total</code></Table.Cell>
                        <Table.Cell>Our total amount rolled for the current trial</Table.Cell>
                        <Table.Cell><code>{props.data.total}</code></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

VariableTable.propTypes = {
    step: PropTypes.bool,
    data: PropTypes.object,
};

export default VariableTable;
