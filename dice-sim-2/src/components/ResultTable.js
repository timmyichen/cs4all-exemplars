import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import ResultRow from './ResultRow';

class ResultTable extends Component {
    render() {
        const headerColumns = ['Result','Frequency','Probability','Percentage',''];
        
        return (
            <Table celled id="result-table">
                <Table.Header>
                    <Table.Row>
                        {headerColumns.map((label,index) => (
                            <Table.HeaderCell
                                key={`resTable-${index}`}
                                className={label !== '' ? 'table-text' : ''}>
                                {label}
                            </Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Object.values(this.props.results || {})
                        .map(result => (
                            <ResultRow
                                key={`result-${result.die}`}
                                die={result.die}
                                frequency={result.frequency}
                                percentage={result.percentage}
                            />
                        ))
                    }
                </Table.Body>
            </Table>
        );
    }
}

ResultTable.propTypes = {
    results: PropTypes.object,
};

export default ResultTable;