import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Title from 'ui/common/title';
import Card from 'ui/common/card';
import AddButton from './components/add_button';
import Table from './components/table';

const propTypes = {};

const defaultProps = {};

const config = {
	title: 'Add new item',
	popupName: 'administration_example_1',
	tableName: 'dt_administration_example_1',
	action: 'administration_example/administration_example_1/actions',
	search: 'administration_example/administration_example_1/search',
};

class AdministrationExample1Page extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>AdministrationExample1</Title>
				<AddButton {...config} />
				<Table {...config} />
			</Card>
		);
	}
}

AdministrationExample1Page.propTypes = propTypes;

AdministrationExample1Page.defaultProps = defaultProps;

export default AdministrationExample1Page;
