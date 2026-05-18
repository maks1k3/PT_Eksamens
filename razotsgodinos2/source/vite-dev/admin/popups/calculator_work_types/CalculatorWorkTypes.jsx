import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';
import Tabs from 'ui/controls/tabs';

import Edit from './components/edit/Edit';
import Delete from './components/delete/Delete';

import AddForm from 'admin/pages/calculator_work_types/components/add_form/AddForm';

import { get, has } from 'lodash-es';

const containerName = 'CalculatorWorkTypeAdministration';
const popupName = 'calculator_work_type';
const tableName = 'dt_calculator_work_types';
const url = 'administration/calculator_work_types/actions';
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

class CalculatorWorkTypesPopup extends Component {
	state = { hideOnOverlayClick: false };

	onTabChange = ({ current }) => {
		let hideOnOverlayClick = true;
		if (_g.inArray(current, doNotHideOnOverlayClickTabs))
			hideOnOverlayClick = false;
		if (hideOnOverlayClick !== this.state.hideOnOverlayClick) {
			this.setState({ hideOnOverlayClick });
		}
	};

	getTitle = (data) => {
		const id = get(data, 'item.id', '');
		return _g.isEmpty(String(id))
			? 'Pievienot jaunu pakalpojumu'
			: `Kalkulatora pakalpojumi #${id}`;
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
				hideOnOverlayClick={this.state.hideOnOverlayClick}
				contentWrapStyle={settings.contentWrapStyle}
				showCloseControl={settings.showCloseControl}>
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

CalculatorWorkTypesPopup.propTypes = { data: PropTypes.object.isRequired };

export default CalculatorWorkTypesPopup;
