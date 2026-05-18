import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Table from './components/table';
import Title from 'ui/common/title';
import Card from 'ui/common/card';

const propTypes = {};

const defaultProps = {};

const config = {
	popupName: 'meta_data',
	tableName: 'dt_meta_data',
	action: 'administration/meta_data/actions',
	search: 'administration/meta_data/search',
};

class MetaDataPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Page meta tags</Title>
				<Table {...config} />
			</Card>
		);
	}
}

MetaDataPage.propTypes = propTypes;

MetaDataPage.defaultProps = defaultProps;

export default MetaDataPage;
