import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';
import Tabs from 'ui/controls/tabs';

import View from './components/view';
import Delete from './components/delete';

import { get, has } from 'lodash-es';

const containerName = 'ContactFormAdministration';
const popupName = 'contact_form';
const tableName = 'dt_contact_form';
const url = 'administration/contact_form/actions';
const tabsUrlKey = 'tab';

const doNotHideOnOverlayClickTabs = ['delete'];

export const settings = {
	name: popupName,
	inUrl: true,
	level: 0,
	extraUrlKeys: [tabsUrlKey],
	verticalAlign: 'top',
	contentWrapStyle: { maxWidth: '800px' },
	showCloseControl: false,
	onClose: () => true,
	closeOnEsc: true,
};

const propTypes = {
	data: PropTypes.object.isRequired,
};

class ContactFormPopup extends Component {
	state = {
		hideOnOverlayClick: false,
	};

	onClose = () => {
		closePopup({ name: settings.name });
	};

	getTitle = (data) => {
		const id = get(data, 'item.id', '');
		return _g.isEmpty(String(id)) ? 'Contact request' : `Kontakti #${id}`;
	};

	getRows = (data) => {
		const rows = [];
		const id = get(data, 'item.id', '');

		if (!_g.isEmpty(String(id))) {
			rows.push('ID: ' + id);

			const nickname = get(data, 'item.nickname', '');
			const phone = get(data, 'item.phone', '');
			const email = get(data, 'item.email', '');
			const privacy = get(data, 'item.privacy', null);

			if (!_g.isEmpty(nickname)) rows.push('Vārds / Uzņēmums: ' + nickname);
			if (!_g.isEmpty(phone)) rows.push('Telefons: ' + phone);
			if (!_g.isEmpty(email)) rows.push('Ē-psts: ' + email);
			if (privacy !== null)
				rows.push('Privātuma politika: ' + (privacy ? 'Jā' : 'Nē'));
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
				title: 'Apskatīt',
				icon: { provider: 'icomoon', name: 'file-text' },
				content: <View {...itemData} />,
			},
			{
				name: 'delete',
				title: 'Dzēst',
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

ContactFormPopup.propTypes = propTypes;

export default ContactFormPopup;
