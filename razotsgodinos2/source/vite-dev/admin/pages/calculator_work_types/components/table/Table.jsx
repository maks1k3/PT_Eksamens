import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import WithUi from 'hoc/store/ui';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import Link from 'core/navigation/link';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

import { forEach, upperCase } from 'lodash-es';

const uiProps = () => ({ langs: 'langs' });

class Table extends Component {
	getColumns = () => {
		const { langs } = this.props;
		const columns = [];

		columns.push({ name: 'id', title: 'ID', isHidable: false });
		columns.push({ name: 'code', title: 'Code' });
		// columns.push({ name: 'unit', title: 'Unit' });
		// columns.push({ name: 'sort', title: 'Sort' });

		forEach(langs, (lang) =>
			columns.push({ name: `${lang}_title`, title: upperCase(lang) }),
		);

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
	];

	getColumnRenderers = () => {
		const { popupName } = this.props;

		return {
			id: ({ cell, id }) => (
				<Link
					theme="content"
					onClick={() =>
						openPopup({ name: popupName, data: { id, tab: 'edit' } })
					}>
					<span className="no-wrap">{cell}</span>
				</Link>
			),
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
				syncWithUrl={true}
				resultsPerPage={10}
				order={{ id: 'asc' }}
				columns={this.getColumns()}
				filters={this.getFilters()}
				columnRenderers={this.getColumnRenderers()}
			/>
		);
	}
}

Table.propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	langs: PropTypes.array,
};

Table.defaultProps = { langs: [] };

export default WithUi(uiProps)(Table);
