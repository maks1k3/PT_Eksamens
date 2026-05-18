import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';

const propTypes = {};

const defaultProps = {};

const config = {
	popupName: 'calculator_requests',
	tableName: 'dt_calculator_requests',
	action: 'administration/calculator_requests/actions',
	search: 'administration/calculator_requests/search',
};

class CalculatorRequestsPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Kalkulatora Pieprasījumi</Title>
				<Table {...config} />
			</Card>
		);
	}
}

CalculatorRequestsPage.propTypes = propTypes;

CalculatorRequestsPage.defaultProps = defaultProps;

export default CalculatorRequestsPage;
