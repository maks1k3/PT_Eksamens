import React, { PureComponent as Component } from 'react';

import Title from 'ui/common/title';
import Card from 'ui/common/card';

import Table from './components/table/Table';
import AddButton from './components/add_button/AddButton';

const config = {
	title: 'Pievienot pakalpojumu',
	popupName: 'calculator_work_type',
	tableName: 'dt_calculator_work_types',
	action: 'administration/calculator_work_types/actions',
	search: 'administration/calculator_work_types/search',
};

class CalculatorWorkTypes extends Component {
	render() {
		return (
			<Card>
				<Title>Kalkulatora pakalpojumi</Title>

				<AddButton {...config} />

				<Table {...config} />
			</Card>
		);
	}
}

export default CalculatorWorkTypes;
