import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popup, Icon } from 'semantic-ui-react';

import ResultRow from './ResultRow';

const headerColumns = [
    {
        label: 'Result',
        helpText: `This is the sum of the dice being rolled.  e.g. With two 6-sided dice, 
            the lowest you can roll is a 2 and the highest is a 12.`,
    },
    {
        label: 'Frequency',
        helpText: `This is the number of times that the result was rolled throughout
        all the trials.`,
    },
    {
        label: 'Probability',
        helpText: `The probability of an event occurring (in this case, that this specific
        result will be rolled) is represented by a number between 0 and 1, where 0
        represents a 0% chance of the event happening and a 1 represents a 100% chance of
        the event happening.  An event with a probability of 0.5 will occur half the time`,
    },
    {
        label: 'Percentage',
        helpText: `To get the chance of an event happening as a percentage, just multiply
        the probability number by 100.`,
    },
];
        
class ResultTable extends Component {
    render() {
        
        return (
            <Table celled id="result-table">
                <Table.Header>
                    <Table.Row>
                        {headerColumns.map((header,index) => (
                            <Table.HeaderCell
                                key={`resTable-${index}`}
                                className={header.label !== 'Percentage' ? 'table-text' : ''}>
                                <span className='center'>
                                    {header.label}<br />
                                    
                                    {header.label !== '' ?
                                        (<Popup
                                            header={header.label}
                                            trigger={<Icon name='question circle' size='large' />}
                                            content={header.helpText}
                                        />) : ''}
                                    
                                </span>
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