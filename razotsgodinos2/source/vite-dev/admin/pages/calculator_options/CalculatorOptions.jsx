import React, { PureComponent as Component } from 'react';

import Title from 'ui/common/title';
import Card from 'ui/common/card';

import Table from './components/table/Table';
import AddButton from './components/add_button/AddButton';

const config = {
	title: 'Pievienot jaunu opciju',
	popupName: 'calculator_option',
	tableName: 'dt_calculator_options',
	action: 'administration/calculator_options/actions',
	search: 'administration/calculator_options/search',
};

class CalculatorOptions extends Component {
	render() {
		return (
			<Card>
				<Title>Kalkulatora izvēles </Title>

				<AddButton {...config} />

				<Table {...config} />
			</Card>
		);
	}
}

export default CalculatorOptions;
