import React, { PureComponent as Component } from 'react';

import Title from 'ui/common/title';
import Card from 'ui/common/card';

import Table from './components/table/Table';
import AddButton from './components/add_button/AddButton';

const config = {
	title: 'Pievienot jaunu cenu ierakstu',
	popupName: 'calculator_price',
	tableName: 'dt_calculator_prices',
	action: 'administration/calculator_prices/actions',
	search: 'administration/calculator_prices/search',
};

class Calculator extends Component {
	render() {
		return (
			<Card>
				<Title>Cenu kalkulators: Cenas</Title>

				<AddButton {...config} />

				<Table {...config} />
			</Card>
		);
	}
}

export default Calculator;
