import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

function ResultRow(props) {
    return (
        <Table.Row>
            <Table.Cell>{props.die}</Table.Cell>
            <Table.Cell>{props.frequency}</Table.Cell>
            <Table.Cell>{props.percentage.toFixed(4)}</Table.Cell>
            <Table.Cell>{(props.percentage * 100).toFixed(2)}%</Table.Cell>
            <Table.Cell>
                <div className="bar" style={{ width: props.percentage * props.barMaxSize }} />
            </Table.Cell>
        </Table.Row>
    );
}

ResultRow.propTypes = {
    die: PropTypes.number,
    frequency: PropTypes.number,
    percentage: PropTypes.number,
    barMaxSize: PropTypes.number,
};

export default ResultRow;
