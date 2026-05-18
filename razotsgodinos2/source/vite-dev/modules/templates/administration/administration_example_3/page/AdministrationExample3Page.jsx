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
	popupName: 'administration_example_3',
	tableName: 'dt_administration_example_3',
	action: 'administration_example/administration_example_3/actions',
	search: 'administration_example/administration_example_3/search',
};

class AdministrationExample3Page extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>AdministrationExample3</Title>
				<AddButton {...config} />
				<Table {...config} />
			</Card>
		);
	}
}

AdministrationExample3Page.propTypes = propTypes;

AdministrationExample3Page.defaultProps = defaultProps;

export default AdministrationExample3Page;
