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
	popupName: 'administration_example_2',
	tableName: 'dt_administration_example_2',
	action: 'administration_example/administration_example_2/actions',
	search: 'administration_example/administration_example_2/search',
};

class AdministrationExample2Page extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>AdministrationExample2</Title>
				<AddButton {...config} />
				<Table {...config} />
			</Card>
		);
	}
}

AdministrationExample2Page.propTypes = propTypes;

AdministrationExample2Page.defaultProps = defaultProps;

export default AdministrationExample2Page;
