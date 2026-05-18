import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';
import Tabs from 'ui/controls/tabs';

import View from './components/view';
import Delete from './components/delete';

import { get, has } from 'lodash-es';

const containerName = 'CalculatorRequestsAdministration';
const popupName = 'calculator_requests';
const tableName = 'dt_calculator_requests';
const url = 'administration/calculator_requests/actions';
const tabsUrlKey = 'tab';

const doNotHideOnOverlayClickTabs = ['delete'];

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

const propTypes = {
	data: PropTypes.object.isRequired,
};

class CalculatorRequestsPopup extends Component {
	state = {
		hideOnOverlayClick: false,
	};

	onClose = () => {
		closePopup({ name: settings.name });
	};

	getTitle = (data) => {
		const id = get(data, 'item.id', '');
		return _g.isEmpty(String(id))
			? 'Calculator request'
			: `Kalkulatora pieprasījums #${id}`;
	};

	getRows = (data) => {
		const rows = [];
		const id = get(data, 'item.id', '');
		if (_g.isEmpty(String(id))) return rows;

		rows.push('ID: ' + id);

		const category = get(data, 'item.category_code', '');
		const total = get(data, 'item.total', '');
		const nickname = get(data, 'item.nickname', '');
		const phone = get(data, 'item.phone', '');
		const email = get(data, 'item.email', '');
		const privacy = get(data, 'item.privacy', null);
		const message = get(data, 'item.message', '');

		const calc = get(data, 'item.calc', null);

		if (!_g.isEmpty(category)) rows.push('Kategorija: ' + category);
		if (!_g.isEmpty(String(total))) rows.push('Cena: ' + total);

		if (!_g.isEmpty(nickname)) rows.push('Vārds / Uzņēmums: ' + nickname);
		if (!_g.isEmpty(phone)) rows.push('Telefons: ' + phone);
		if (!_g.isEmpty(email)) rows.push('Ē-pasts: ' + email);
		if (privacy !== null)
			rows.push('Privacy: ' + (Number(privacy) ? 'Jā' : 'Nē'));
		if (!_g.isEmpty(message)) rows.push('Ziņa: ' + message);

		if (calc !== null && calc !== undefined) {
			let text = '';
			try {
				const obj = typeof calc === 'string' ? JSON.parse(calc) : calc;
				text = JSON.stringify(obj);
			} catch (e) {
				text = String(calc);
			}
			const short = text.length > 120 ? text.slice(0, 120) + '…' : text;
			rows.push('Izvēle: ' + short);
		}

		return rows;
	};

	onTabChange = ({ current }) => {
		let hideOnOverlayClick = true;
		if (_g.inArray(current, doNotHideOnOverlayClickTabs))
			hideOnOverlayClick = false;

		if (hideOnOverlayClick !== this.state.hideOnOverlayClick) {
			this.setState({ hideOnOverlayClick });
		}
	};

	renderPopup = (content) => {
		const { id } = this.props.data;
		const { hideOnOverlayClick } = this.state;

		const extraData = id ? { id, action: 'get' } : {};

		return (
			<AdministrationPopup
				name={containerName}
				popupName={settings.name}
				url={url}
				extraData={extraData}
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
		if (!id) return null;

		const itemData = {
			id,
			action: url,
			containerName,
			popupName,
			tableName,
		};

		const items = [
			{
				name: 'view',
				title: 'View',
				icon: { provider: 'icomoon', name: 'file-text' },
				content: <View {...itemData} />,
			},
			{
				name: 'delete',
				title: 'Delete',
				icon: { provider: 'icomoon', name: 'trash' },
				content: <Delete {...itemData} />,
			},
		];

		let extra = {};
		if (has(this.props.data, 'tab')) extra.current = this.props.data.tab;

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

CalculatorRequestsPopup.propTypes = propTypes;

export default CalculatorRequestsPopup;
