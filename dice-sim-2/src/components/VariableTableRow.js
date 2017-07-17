import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

class VariableTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = { highlight: false };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ highlight: true });
            setTimeout(() => {
                this.setState({ highlight: false });
            },350);
        }
    }
    render() {
        return (
            <Table.Row>
                <Table.Cell><code>{this.props.varName}</code></Table.Cell>
                <Table.Cell>{this.props.desc}</Table.Cell>
                <Table.Cell><code className={this.state.highlight ? 'highlight' : ''}>{this.props.value}</code></Table.Cell>
            </Table.Row>
        );
    }
}

VariableTableRow.propTypes = {
    varName: PropTypes.string,
    desc: PropTypes.string,
    value: PropTypes.string,
};

export default VariableTableRow;