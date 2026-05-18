import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import Link from 'core/navigation/link';
import DateTimePicker from 'ui/inputs/datetime_picker';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	//from ui
	summary: PropTypes.object,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		[ownProps.tableName]: {
			summary: 'summary',
		},
	};
};

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
			name: 'created_at',
			title: 'Created at',
		});

		columns.push({
			name: 'updated_at',
			title: 'Updated at',
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
			name: 'city',
			title: 'City',
		});

		columns.push({
			name: 'distance',
			title: 'Distance',
		});

		columns.push({
			name: 'action',
			title: 'Action',
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
			label: 'City',
			name: 'city',
			component: Input,
			componentProps: {
				placeholder: 'City',
				clearable: true,
			},
		});

		filters.push({
			label: 'Date from',
			name: 'date_from',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Date from',
				timeFormat: false,
				clearable: true,
			},
		});

		filters.push({
			label: 'Date to',
			name: 'date_to',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Date to',
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

		columnRenderers.created_at = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.updated_at = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.name = ({ cell, id }) => {
			return (
				<Link
					theme="content"
					onClick={() => {
						openPopup({
							name: popupName,
							data: {
								id: id,
								tab: 'edit',
							},
						});
					}}>
					{cell}
				</Link>
			);
		};

		columnRenderers.action = ({ id }) => {
			return (
				<ActionsMenu
					options={[
						{
							title: 'Edit',
							icon: {
								provider: 'icomoon',
								name: 'pencil',
							},
							onClick: () => {
								openPopup({
									name: popupName,
									data: {
										id: id,
										tab: 'edit',
									},
								});
							},
						},
						{
							title: 'Delete',
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
		//</editor-fold>
	};

	render() {
		const { tableName, search, summary } = this.props;
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
				preventColumnsCollapse={true}
				componentsProps={{
					table: {
						customFooterRenderer: {
							distance: () => {
								return _.get(summary, 'distance', 0);
							},
						},
					},
				}}
			/>
		);
	}
}

Table.propTypes = propTypes;

Table.defaultProps = defaultProps;

Table = WithUi(uiProps)(Table);

export default Table;
