import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import InfoTable from 'ui/tables/info_table';
import Tabs from 'ui/controls/tabs';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	item: PropTypes.object,
};

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
	parseCalc = (calc) => {
		if (!calc) return {};

		try {
			const obj = typeof calc === 'string' ? JSON.parse(calc) : calc;
			return obj || {};
		} catch (e) {
			return {};
		}
	};

	render() {
		const { item } = this.props;
		if (!item) return null;

		const calc = this.parseCalc(item.calc);

		const infoRows = {
			ID: item.id,
			Kategorija: item.category_code,
			Kopā: item.total,
			'Vārds / Uzņēmums': item.nickname,
			Tālrunis: item.phone,
			'E-pasts': item.email,
			Privātums: item?.privacy ? 'Jā' : 'Nē',
			Ziņa: item.message,
		};

		const calcRows = calc;

		const items = [
			{
				name: 'info',
				title: 'Info',
				content: <InfoTable rows={infoRows} />,
			},
			{
				name: 'calc',
				title: 'Aprēķins',
				content: <InfoTable rows={calcRows} />,
			},
		];

		return <Tabs items={items} lazyLoad={true} />;
	}
}

View.propTypes = propTypes;

export default WithUi(uiProps)(View);
