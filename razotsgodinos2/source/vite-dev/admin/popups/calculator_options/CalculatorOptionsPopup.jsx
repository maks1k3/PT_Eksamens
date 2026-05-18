import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';
import Tabs from 'ui/controls/tabs';

import Edit from './components/edit';
import Delete from './components/delete';

import AddForm from 'admin/pages/calculator_options/components/add_form/AddForm';

import { get, has } from 'lodash-es';

const containerName = 'CalculatorOptionAdministration';
const popupName = 'calculator_option';
const tableName = 'dt_calculator_options';
const url = 'administration/calculator_options/actions';
const tabsUrlKey = 'tab';

const doNotHideOnOverlayClickTabs = ['edit'];

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

class CalculatorOptionsPopup extends Component {
	state = { hideOnOverlayClick: false };

	onClose = () => closePopup({ name: settings.name });

	getTitle = (data) => {
		const id = get(data, 'item.id', '');
		return _g.isEmpty(String(id))
			? 'Pievienot jaunu opciju'
			: `Kalkulatora izvēle #${id}`;
	};

	getRows = (data) => {
		const rows = [];
		const id = get(data, 'item.id', '');
		if (!_g.isEmpty(String(id))) {
			rows.push('ID: ' + id);
			const code = get(data, 'item.code', '');
			if (!_g.isEmpty(code)) rows.push('Code: ' + code);
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

		const extraData = id ? { id, action: 'get' } : { action: 'form_data' };

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
				hideOnOverlayClick={this.state.hideOnOverlayClick}
				showCloseControl={settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}>
				{content}
			</AdministrationPopup>
		);
	};

	renderContent = () => {
		const { id } = this.props.data;

		if (!id) {
			return <AddForm action={url} tableName={tableName} />;
		}

		const itemData = { id, action: url, containerName, popupName, tableName };

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
		if (has(this.props.data, 'tab')) extra.current = this.props.data.tab;

		return (
			<Tabs
				inUrl
				urlKey={tabsUrlKey}
				items={items}
				lazyLoad
				onTabChange={this.onTabChange}
				{...extra}
			/>
		);
	};

	render() {
		return this.renderPopup(this.renderContent());
	}
}

CalculatorOptionsPopup.propTypes = propTypes;

export default CalculatorOptionsPopup;
