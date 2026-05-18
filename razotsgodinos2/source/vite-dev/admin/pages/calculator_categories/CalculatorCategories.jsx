import React, { PureComponent as Component } from 'react';

import Title from 'ui/common/title';
import Card from 'ui/common/card';

import Table from './components/table/Table';
import AddButton from './components/add_button/AddButton';

const config = {
	title: 'Pievienot jaunu kategoriju',
	popupName: 'calculator_category',
	tableName: 'dt_calculator_categories',
	action: 'administration/calculator_categories/actions',
	search: 'administration/calculator_categories/search',
};

class CalculatorCategories extends Component {
	render() {
		return (
			<Card>
				<Title>Kalkulatora kategorijas</Title>

				<AddButton {...config} />

				<Table {...config} />
			</Card>
		);
	}
}

export default CalculatorCategories;
