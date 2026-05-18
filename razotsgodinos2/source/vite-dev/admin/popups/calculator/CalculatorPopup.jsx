import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';
import Tabs from 'ui/controls/tabs';

import Edit from './components/edit/Edit';
import Delete from './components/delete/Delete';

import { get, has } from 'lodash-es';

const containerName = 'CalculatorPriceAdministration';
const popupName = 'calculator_price';
const tableName = 'dt_calculator_prices';
const url = 'administration/calculator_prices/actions';
const tabsUrlKey = 'tab';

export const settings = {
	name: popupName,
	inUrl: true,
	level: 0,
	extraUrlKeys: [tabsUrlKey],
	verticalAlign: 'top',
	contentWrapStyle: { maxWidth: '900px' },
	showCloseControl: false,
	onClose: () => true,
	closeOnEsc: true,
};

class CalculatorPopup extends Component {
	renderPopup = (content) => {
		const { id } = this.props.data;

		return (
			<AdministrationPopup
				name={containerName}
				popupName={settings.name}
				url={url}
				extraData={{ id, action: 'get' }}
				getTitle={this.getTitle}>
				{content}
			</AdministrationPopup>
		);
	};

	getTitle = (data) => {
		const id = get(data, 'item.id', '');
		return _g.isEmpty(String(id))
			? 'Calculator prices'
			: `Kalkulatora cenas #${id}`;
	};

	renderContent = () => {
		const { id } = this.props.data;

		const itemData = {
			id,
			action: url,
			containerName,
			popupName,
			tableName,
		};

		const items = [
			{
				name: 'edit',
				title: 'Rediģēt',
				content: <Edit {...itemData} />,
			},
			{
				name: 'delete',
				title: 'Dzēst',
				content: <Delete {...itemData} />,
			},
		];

		let extra = {};
		if (has(this.props.data, 'tab')) extra.current = this.props.data.tab;

		return <Tabs inUrl urlKey={tabsUrlKey} items={items} {...extra} />;
	};

	render() {
		return this.renderPopup(this.renderContent());
	}
}

CalculatorPopup.propTypes = {
	data: PropTypes.object.isRequired,
};

export default CalculatorPopup;
