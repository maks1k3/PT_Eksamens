import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { get, map } from 'lodash-es';

import WithUi from 'hoc/store/ui';

import InfoTable from 'ui/tables/info_table';
import Tabs from 'ui/controls/tabs';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	user: PropTypes.object,
	profile: PropTypes.object,
	providers: PropTypes.any,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		[ownProps.containerName]: {
			data: {
				item: 'item',
				profile: 'profile',
				providers: 'providers',
			},
		},
	};
};

class View extends Component {
	constructor(props) {
		super(props);
	}

	renderContactInfo() {
		const { item } = this.props;

		return [
			{ title: 'Vārds, Uzvārds', value: item.full_name },
			{ title: 'E-pasts', value: item.email },
			{ title: 'Telefons', value: item.phone },
		];
	}

	renderProjectInfo() {
		const { item } = this.props;
		const project = get(item, 'expenses.project', {});

		return [
			{ title: 'Projekta platība', value: `${project.project_area} m²` },
			{
				title: 'Projekta veids',
				value: this.getProjectType(project.project_type),
			},
		];
	}

	getProjectType(type) {
		const types = {
			1: 'Dzīvojamā māja',
			2: 'Dzīvoklis',
			3: 'Komercēka',
			4: 'Cits',
		};
		return types[type] || type;
	}

	renderExpenseItems() {
		const { item } = this.props;
		const items = get(item, 'expenses.expense_items', []);

		return map(items, (item, index) => ({
			title: `${index + 1}. ${item.title}`,
			value: `
                ${item.base_price} € × 
                ${item.is_per_unit ? '1 vienība' : `${item.project_area_used} m²`} 
                (PVN ${parseFloat(item.vat_rate) * 100}%) = 
                ${item.total} €
            `,
			multiline: true,
		}));
	}

	renderTotals() {
		const { item } = this.props;
		const totals = get(item, 'expenses.totals', {});

		return [
			{
				title: 'Summa bez PVN',
				value: `${totals.total_without_vat} €`,
				highlight: true,
			},
			{ title: 'PVN summa', value: `${totals.total_vat} €`, highlight: true },
			{
				title: 'Kopējā summa',
				value: `${totals.total_with_vat} €`,
				highlight: true,
			},
			{ title: 'PVN likme', value: `${parseFloat(totals.vat_rate) * 100}%` },
		];
	}

	render() {
		const { item } = this.props;

		const items = [
			{
				name: 'contact',
				title: 'Kontaktinformācija',
				content: <InfoTable rows={this.renderContactInfo()} />,
			},
			{
				name: 'project',
				title: 'Projekta informācija',
				content: <InfoTable rows={this.renderProjectInfo()} />,
			},
			{
				name: 'expenses',
				title: 'Izmaksu pozīcijas',
				content: (
					<InfoTable
						rows={this.renderExpenseItems()}
						config={{ allowMultiline: true }}
					/>
				),
			},
			{
				name: 'totals',
				title: 'Kopsumma',
				content: (
					<InfoTable rows={this.renderTotals()} config={{ highlight: true }} />
				),
			},
		];

		return <Tabs items={items} lazyLoad={true} />;
	}
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;
View = WithUi(uiProps)(View);

export default View;
