import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

import { forEach, upperCase } from 'lodash-es';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	langs: PropTypes.array,
};

const uiProps = () => ({
	langs: 'langs',
});

const syncWithUrl = true;
const resultsPerPage = 25;
const order = { id: 'desc' };

class Table extends Component {
	getColumns = () => {
		const { langs } = this.props;
		const columns = [];

		columns.push({ name: 'id', title: 'ID', isHidable: false });
		columns.push({ name: 'code', title: 'Code' });

		forEach(langs, (lang) => {
			columns.push({ name: `${lang}_title`, title: upperCase(lang) });
		});

		columns.push({
			name: 'action',
			title: 'Darbības',
			isHidable: false,
			sortable: false,
			style: { width: '50px' },
		});

		return columns;
	};

	getFilters = () => [
		{
			label: 'ID',
			name: 'id',
			component: Input,
			componentProps: { clearable: true },
		},
		{
			label: 'Code',
			name: 'code',
			component: Input,
			componentProps: { clearable: true },
		},
		{
			label: 'Title',
			name: 'title',
			component: Input,
			componentProps: { clearable: true },
		},
	];

	getColumnRenderers = () => {
		const { popupName } = this.props;

		return {
			action: ({ id }) => (
				<ActionsMenu
					options={[
						{
							title: 'Rediģēt',
							icon: { provider: 'icomoon', name: 'pencil' },
							onClick: () =>
								openPopup({ name: popupName, data: { id, tab: 'edit' } }),
						},
						{
							title: 'Dzēst',
							icon: { provider: 'icomoon', name: 'trash' },
							onClick: () =>
								openPopup({ name: popupName, data: { id, tab: 'delete' } }),
						},
					]}
				/>
			),
		};
	};

	render() {
		const { tableName, search } = this.props;

		return (
			<DataTable
				id={tableName}
				url={search}
				syncWithUrl={syncWithUrl}
				resultsPerPage={resultsPerPage}
				order={order}
				columns={this.getColumns()}
				filters={this.getFilters()}
				columnRenderers={this.getColumnRenderers()}
			/>
		);
	}
}

Table.propTypes = propTypes;

export default WithUi(uiProps)(Table);
