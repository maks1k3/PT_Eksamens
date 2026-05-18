import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';

const propTypes = {};

const defaultProps = {};

const config = {
	popupName: 'contact_form',
	tableName: 'dt_contact_form',
	action: 'administration/contact_form/actions',
	search: 'administration/contact_form/search',
};

class UsersPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Kontaktu sadaļa</Title>
				<Table {...config} />
			</Card>
		);
	}
}

UsersPage.propTypes = propTypes;

UsersPage.defaultProps = defaultProps;

export default UsersPage;
