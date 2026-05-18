import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import Select from 'ui/inputs/select';
import Link from 'core/navigation/link';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
};

const defaultProps = {};

const syncWithUrl = true;
const resultsPerPage = 10;
const order = { id: 'desc' };

class Table extends Component {
	getColumns = () => {
		const columns = [];

		columns.push({ name: 'id', title: 'ID', isHidable: false });
		columns.push({ name: 'category_code', title: 'Kategorija' });
		columns.push({ name: 'nickname', title: 'Vārds / Kompānija' });
		columns.push({ name: 'phone', title: 'Telefons' });
		columns.push({ name: 'email', title: 'Ē-pasts' });
		columns.push({ name: 'total', title: 'Cena' });
		columns.push({ name: 'privacy', title: 'Privātuma politika' });
		columns.push({ name: 'message', title: 'Ziņa' });
		columns.push({ name: 'calc', title: 'Izvēle' });

		columns.push({
			name: 'action',
			title: 'Darbības',
			isHidable: false,
			sortable: false,
			style: { width: '50px' },
		});

		return columns;
	};

	getFilters = () => {
		const filters = [];

		filters.push({
			label: 'Id',
			name: 'id',
			component: Input,
			componentProps: { placeholder: 'Id', clearable: true },
		});

		filters.push({
			label: 'Kategorija',
			name: 'category_code',
			component: Input,
			componentProps: { placeholder: 'category_code', clearable: true },
		});

		filters.push({
			label: 'Ē-pasts',
			name: 'email',
			component: Input,
			componentProps: { placeholder: 'Email', clearable: true },
		});

		filters.push({
			label: 'Telefons',
			name: 'phone',
			component: Input,
			componentProps: { placeholder: 'Phone', clearable: true },
		});

		filters.push({
			label: 'Vārds / Uzņēmums',
			name: 'nickname',
			component: Input,
			componentProps: { placeholder: 'nickname', clearable: true },
		});

		filters.push({
			label: 'Privātuma politika',
			name: 'privacy',
			component: Select,
			componentProps: {
				placeholder: 'Privacy',
				clearable: true,
				options: [
					{ value: '1', label: 'Yes' },
					{ value: '0', label: 'No' },
				],
			},
		});

		filters.push({
			label: 'Izvēle',
			name: 'total',
			component: Input,
			componentProps: { placeholder: 'Total', clearable: true },
		});

		return filters;
	};

	getColumnRenderers = () => {
		const { popupName } = this.props;
		const columnRenderers = {};

		columnRenderers.total = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.privacy = ({ cell }) => {
			return Number(cell) ? 'Yes' : 'No';
		};

		columnRenderers.calc = ({ cell }) => {
			let text = '';
			try {
				const obj = typeof cell === 'string' ? JSON.parse(cell) : cell;
				text = JSON.stringify(obj);
			} catch (e) {
				text = String(cell ?? '');
			}

			const short = text.length > 80 ? text.slice(0, 80) + '…' : text;
			return <span title={text}>{short}</span>;
		};

		columnRenderers.email = ({ cell, id }) => {
			return (
				<span className="no-wrap">
					<Link
						theme="content"
						onClick={() => {
							openPopup({
								name: popupName,
								data: { id, tab: 'view' },
							});
						}}>
						{cell}
					</Link>
				</span>
			);
		};

		columnRenderers.action = ({ id }) => {
			return (
				<ActionsMenu
					options={[
						{
							title: 'Apskatīt',
							icon: {
								provider: 'icomoon',
								name: 'pencil',
							},
							onClick: () => {
								openPopup({
									name: popupName,
									data: {
										id: id,
										tab: 'view',
									},
								});
							},
						},
						{
							title: 'Dzēst',
							icon: {
								provider: 'icomoon',
								name: 'trash',
							},
							onClick: () => {
								openPopup({
									name: popupName,
									data: {
										id: id,
										tab: 'delete',
									},
								});
							},
						},
					]}
				/>
			);
		};

		return columnRenderers;
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
Table.defaultProps = defaultProps;

export default Table;
