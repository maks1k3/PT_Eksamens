import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import InfoTable from 'ui/tables/info_table';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	// from ui
	item: PropTypes.object,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		[ownProps.containerName]: {
			data: {
				item: 'item',
			},
		},
	};
};

class View extends Component {
	render() {
		const { item } = this.props;
		if (!item) return null;

		const rows = {
			ID: item.id,
			'Vārds / Uzņēmums': item.nickname,
			Telefons: item.phone,
			'E-pasts': item.email,
			Ziņa: item.message,
			'Privātuma politika': item?.privacy ? 'Jā' : 'Nē',
		};

		return <InfoTable rows={rows} />;
	}
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default WithUi(uiProps)(View);
