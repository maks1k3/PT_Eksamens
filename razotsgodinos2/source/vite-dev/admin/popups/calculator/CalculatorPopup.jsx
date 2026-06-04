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

const doNotHideOnOverlayClickTabs = ['edit'];

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
	constructor(props) {
		super(props);

		this.state = {
			hideOnOverlayClick: false,
		};
	}

	getTitle = (data) => {
		const id = get(data, 'item.id', '');

		return _g.isEmpty(String(id))
			? 'Calculator prices'
			: `Kalkulatora cenas #${id}`;
	};

	getRows = (data) => {
		const rows = [];

		const id = get(data, 'item.id', '');
		const category = get(data, 'item.category', '');
		const workType = get(data, 'item.work_type', '');
		const option = get(data, 'item.option_code', '');
		const price = get(data, 'item.price', '');

		rows.push('ID: ' + id);

		if (!_g.isEmpty(category)) rows.push('Kategorija: ' + category);
		if (!_g.isEmpty(workType)) rows.push('Pakalpojums: ' + workType);
		if (!_g.isEmpty(option)) rows.push('Izvēle: ' + option);
		if (!_g.isEmpty(String(price))) rows.push('Cena: ' + price);

		return rows;
	};

	onTabChange = ({ current }) => {
		let hideOnOverlayClick = true;

		if (_g.inArray(current, doNotHideOnOverlayClickTabs)) {
			hideOnOverlayClick = false;
		}

		if (hideOnOverlayClick !== this.state.hideOnOverlayClick) {
			this.setState({ hideOnOverlayClick });
		}
	};

	renderPopup = (content) => {
		const { id } = this.props.data;
		const { hideOnOverlayClick } = this.state;

		return (
			<AdministrationPopup
				name={containerName}
				popupName={settings.name}
				url={url}
				extraData={{ id, action: 'get' }}
				getTitle={this.getTitle}
				getRows={this.getRows}
				level={settings.level}
				verticalAlign={settings.verticalAlign}
				hideOnOverlayClick={hideOnOverlayClick}
				showCloseControl={settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}>
				{content}
			</AdministrationPopup>
		);
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
				icon: { provider: 'icomoon', name: 'pencil' },
				content: <Edit {...itemData} />,
			},
			{
				name: 'delete',
				title: 'Dzēst',
				icon: { provider: 'icomoon', name: 'trash' },
				content: <Delete {...itemData} />,
			},
		];

		let extra = {};

		if (has(this.props.data, 'tab')) {
			extra.current = this.props.data.tab;
		}

		return (
			<Tabs
				inUrl={true}
				urlKey={tabsUrlKey}
				items={items}
				lazyLoad={true}
				onTabChange={this.onTabChange}
				{...extra}
			/>
		);
	};

	render() {
		return this.renderPopup(this.renderContent());
	}
}

CalculatorPopup.propTypes = {
	data: PropTypes.object.isRequired,
};

export default CalculatorPopup;
