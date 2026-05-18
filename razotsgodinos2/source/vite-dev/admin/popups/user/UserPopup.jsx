import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';

import Tabs from 'ui/controls/tabs';
import View from './components/view';
import { get, has } from 'lodash-es';

const containerName = 'UserAdministration';
const popupName = 'user';
const tableName = 'dt_users';
const url = 'administration/users/actions';
const tabsUrlKey = 'tab';

export const settings = {
	name: popupName,
	inUrl: true,
	level: 0,
	extraUrlKeys: [tabsUrlKey],
	verticalAlign: 'top',
	hideOnOverlayClick: true,
	contentWrapStyle: {
		maxWidth: '1024px',
	},
	showCloseControl: false,
	onClose: onClose,
	closeOnEsc: true,
};

function onClose() {
	return true;
}

const propTypes = {
	data: PropTypes.object.isRequired,
};

const defaultProps = {};

class UserPopup extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		closePopup({ name: settings.name });
		//</editor-fold>
	};

	getTitle = (data) => {
		//<editor-fold defaultstate="collapsed" desc="getTitle">
		const id = get(data, 'user.id', '');
		return `User #${id}`;
		//</editor-fold>
	};

	getRows = (data) => {
		//<editor-fold defaultstate="collapsed" desc="getRows">
		const rows = [];

		const email = get(data, 'user.email', '');
		const name = get(data, 'profile.name', '');
		const surname = get(data, 'profile.surname', '');

		rows.push('ID: ' + get(data, 'user.id', ''));

		if (!_g.isEmpty(email)) {
			rows.push('Email: ' + email);
		}

		if (!_g.isEmpty(name)) {
			rows.push('Name: ' + name);
		}

		if (!_g.isEmpty(surname)) {
			rows.push('Surname: ' + surname);
		}

		return rows;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderPopup = (content) => {
		//<editor-fold defaultstate="collapsed" desc="renderPopup">
		const { id } = this.props.data;
		return (
			<AdministrationPopup
				name={containerName}
				popupName={settings.name}
				url={url}
				extraData={{
					id: id,
					action: 'get',
				}}
				getTitle={this.getTitle}
				getRows={this.getRows}
				level={settings.level}
				verticalAlign={settings.verticalAlign}
				hideOnOverlayClick={settings.hideOnOverlayClick}
				showCloseControl={settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}>
				{content}
			</AdministrationPopup>
		);
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { id } = this.props.data;
		const items = [];

		const itemData = {
			id: id,
			action: url,
			containerName: containerName,
			popupName: popupName,
			tableName: tableName,
		};

		items.push({
			name: 'view',
			title: 'View',
			icon: {
				provider: 'icomoon',
				name: 'file-text',
			},
			content: <View {...itemData} />,
		});

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
				{...extra}
			/>
		);
		//</editor-fold>
	};

	render() {
		const content = this.renderContent();

		return this.renderPopup(content);
	}
}

UserPopup.propTypes = propTypes;

UserPopup.defaultProps = defaultProps;

export default UserPopup;
