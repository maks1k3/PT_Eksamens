import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Table from './components/table';
import Title from 'ui/common/title';
import Card from 'ui/common/card';

const propTypes = {};

const defaultProps = {};

const config = {
	popupName: 'translation',
	tableName: 'dt_translations',
	action: 'administration/translations/actions',
	search: 'administration/translations/search',
};

class TranslationsPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Translations</Title>
				<Table {...config} />
			</Card>
		);
	}
}

TranslationsPage.propTypes = propTypes;

TranslationsPage.defaultProps = defaultProps;

export default TranslationsPage;
