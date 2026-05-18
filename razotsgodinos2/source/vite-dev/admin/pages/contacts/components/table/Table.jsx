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

		columns.push({
			name: 'id',
			title: 'ID',
			isHidable: false,
		});

		columns.push({
			name: 'email',
			title: 'Ē-pasts',
		});

		columns.push({
			name: 'nickname',
			title: 'Vārds / Uzņēmums',
		});

		columns.push({
			name: 'phone',
			title: 'Telefons',
		});

		columns.push({
			name: 'privacy',
			title: 'Privātuma politika',
		});

		columns.push({
			name: 'message',
			title: 'Ziņa',
			sortable: false,

			style: { minWidth: '260px' },
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

	getFilters = () => {
		const filters = [];

		filters.push({
			label: 'Id',
			name: 'id',
			component: Input,
			componentProps: {
				placeholder: 'Id',
				clearable: true,
			},
		});

		filters.push({
			label: 'Ē-pasts',
			name: 'email',
			component: Input,
			componentProps: {
				placeholder: 'Email',
				clearable: true,
			},
		});

		filters.push({
			label: 'Vārds / Uzņēmums',
			name: 'nickname',
			component: Input,
			componentProps: {
				placeholder: 'Vārds / Uzņēmum',
				clearable: true,
			},
		});

		filters.push({
			label: 'Telefons',
			name: 'phone',
			component: Input,
			componentProps: {
				placeholder: 'Telefons',
				clearable: true,
			},
		});

		filters.push({
			label: 'Privātuma politika',
			name: 'privacy',
			component: Select,
			componentProps: {
				placeholder: 'Privātuma politika',
				clearable: true,
				options: [
					{ value: '1', label: 'Apstiprināta' },
					{ value: '0', label: 'Nav apstiprināta' },
				],
			},
		});

		filters.push({
			label: 'Message',
			name: 'message',
			component: Input,
			componentProps: {
				placeholder: 'Ziņa',
				clearable: true,
			},
		});

		return filters;
	};

	getColumnRenderers = () => {
		const { popupName } = this.props;
		const columnRenderers = {};

		columnRenderers.privacy = ({ cell }) => {
			return cell ? 'Jā' : 'Nē';
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

		columnRenderers.message = ({ cell }) => {
			const text = (cell ?? '').toString();
			const short = text.length > 120 ? text.slice(0, 120) + '…' : text;

			return <span title={text}>{short}</span>;
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
