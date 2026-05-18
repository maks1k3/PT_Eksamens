import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import Select from 'ui/inputs/select';
import DateTimePicker from 'ui/inputs/datetime_picker';
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
	constructor(props) {
		super(props);
	}

	getColumns = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumns">

		const columns = [];

		columns.push({
			name: 'id',
			title: 'ID',
			isHidable: false,
		});

		columns.push({
			name: 'email',
			title: 'Email',
		});

		columns.push({
			name: 'name',
			title: 'Name',
		});

		columns.push({
			name: 'surname',
			title: 'Surname',
		});

		columns.push({
			name: 'last_activity',
			title: 'Last activity',
		});

		columns.push({
			name: 'active',
			title: 'Active',
		});

		columns.push({
			name: 'groups',
			title: 'Groups',
		});

		columns.push({
			name: 'action',
			title: 'Darbības',
			isHidable: false,
			sortable: false,
			style: {
				width: '50px',
			},
		});

		return columns;
		//</editor-fold>
	};

	getFilters = () => {
		//<editor-fold defaultstate="collapsed" desc="getFilters">

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
			label: 'Email',
			name: 'email',
			component: Input,
			componentProps: {
				placeholder: 'Email',
				clearable: true,
			},
		});

		filters.push({
			label: 'Name',
			name: 'name',
			component: Input,
			componentProps: {
				placeholder: 'Name',
				clearable: true,
			},
		});

		filters.push({
			label: 'Surname',
			name: 'surname',
			component: Input,
			componentProps: {
				placeholder: 'Surname',
				clearable: true,
			},
		});

		filters.push({
			label: 'Active',
			name: 'select_active',
			component: Select,
			componentProps: {
				placeholder: 'Active',
				clearable: true,
				options: [
					{
						value: '1',
						label: 'Yes',
					},
					{
						value: '0',
						label: 'No',
					},
				],
			},
		});

		filters.push({
			label: 'User',
			name: 'select_user',
			component: Select,
			componentProps: {
				async: true,
				optionsUrl: 'administration/users/actions',
				extraData: {
					action: 'autocomplete',
				},
				clearable: true,
			},
			optionsFromUrl: true,
		});

		filters.push({
			label: 'Last activity from',
			name: 'date_from',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Last activity from',
				timeFormat: false,
				clearable: true,
			},
		});

		filters.push({
			label: 'Last activity to',
			name: 'date_to',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Last activity to',
				timeFormat: false,
				clearable: true,
			},
		});

		return filters;
		//</editor-fold>
	};

	getColumnRenderers = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumnRenderers">
		const { popupName } = this.props;
		const columnRenderers = {};

		columnRenderers.last_activity = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.active = ({ cell }) => {
			return cell ? 'Yes' : 'No';
		};

		columnRenderers.email = ({ cell, id }) => {
			return (
				<span className="no-wrap">
					<Link
						theme="content"
						onClick={() => {
							openPopup({
								name: popupName,
								data: {
									id: id,
									tab: 'view',
								},
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
								name: 'file-text',
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
					]}
				/>
			);
		};

		return columnRenderers;
		//</editor-fold>
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
