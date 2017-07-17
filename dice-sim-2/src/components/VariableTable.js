import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import VariableTableRow from './VariableTableRow';

class VariableTable extends Component {
    render() {
        const headerColumns = ['Variables', 'Description', 'Value'];
        
        const data = [
            {
                varName: 'trial',
                desc: `The current trial # we are running (out of ${this.props.trials})`,
                value: this.props.trial,
            },    
            {
                varName: 'random_number',
                desc: 'The random number we last generated',
                value: this.props.randomRoll,
            },    
            {
                varName: 'total',
                desc: 'Our total amount rolle dfor the current trial',
                value: this.props.total,
            },    
        ]
        
        return (
            <Table celled id="variable-table">
                <Table.Header>
                    <Table.Row>
                        {headerColumns.map((label,index) => (
                            <Table.HeaderCell key={`varTable-${index}`}>{label}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map(d => (
                        <VariableTableRow
                            key={`varTable-${d.varName}`}
                            varName={d.varName}
                            desc={d.desc}
                            value={d.value}
                        />
                    ))}
                </Table.Body>
            </Table>
        );
    }
}

VariableTable.propTypes = {
    trial: PropTypes.string,
    total: PropTypes.string,
    randomRoll: PropTypes.string,
};

export default VariableTable;