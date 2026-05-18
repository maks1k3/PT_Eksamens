import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';

const propTypes = {};

const defaultProps = {};

const config = {
	popupName: 'user',
	tableName: 'dt_users',
	action: 'administration/users/actions',
	search: 'administration/users/search',
};

class UsersPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Users</Title>
				<Table {...config} />
			</Card>
		);
	}
}

UsersPage.propTypes = propTypes;

UsersPage.defaultProps = defaultProps;

export default UsersPage;
