import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';
import Tabs from 'ui/controls/tabs';

import Edit from './components/edit/Edit';
import Delete from './components/delete/Delete';

import { get, has } from 'lodash-es';

const containerName = 'CalculatorCategoryAdministration';
const popupName = 'calculator_category';
const tableName = 'dt_calculator_categories';
const url = 'administration/calculator_categories/actions';
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

class CalculatorCategoriesPopup extends Component {
	constructor(props) {
		super(props);
		this.state = { hideOnOverlayClick: false };
	}

	onClose = () => {
		closePopup({ name: settings.name });
	};

	getTitle = (data) => {
		const id = get(data, 'item.id', '');
		return `Kalkulatora kategorija #${id}`;
	};

	getRows = (data) => {
		const rows = [];

		const id = get(data, 'item.id', '');
		const title = get(data, 'translations.lv.title', '');
		const code = get(data, 'item.code', '');

		rows.push('ID: ' + id);

		if (!_g.isEmpty(title)) rows.push('Nosaukums: ' + title);
		if (!_g.isEmpty(code)) rows.push('Code: ' + code);

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
			id: id,
			action: url,
			containerName: containerName,
			popupName: popupName,
			tableName: tableName,
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

CalculatorCategoriesPopup.propTypes = propTypes;

export default CalculatorCategoriesPopup;
