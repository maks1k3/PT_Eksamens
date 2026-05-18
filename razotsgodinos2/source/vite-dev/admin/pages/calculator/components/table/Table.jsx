import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
};

const syncWithUrl = true;
const resultsPerPage = 25;
const order = { id: 'asc' };

class Table extends Component {
	getColumns = () => [
		{ name: 'id', title: 'ID', isHidable: false },
		{ name: 'category', title: 'Kategorija' },
		{ name: 'work_type', title: 'Pakalpojums' },
		{ name: 'option_code', title: 'Izvēle' },
		{ name: 'price', title: 'Cena' },
		{
			name: 'action',
			title: 'Darbības',
			isHidable: false,
			sortable: false,
			style: { width: '50px' },
		},
	];

	getFilters = () => [
		{
			label: 'ID',
			name: 'id',
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

export default Table;
