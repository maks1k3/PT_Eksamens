import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Button from 'ui/controls/button';

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
			name: 'action',
			title: 'Action',
			isHidable: false,
			sortable: false,
			style: {
				width: '70px',
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

		columnRenderers.action = ({ id }) => {
			return (
				<Button
					title="Edit"
					icon={{ provider: 'icomoon', name: 'pencil' }}
					onClick={() => {
						openPopup({
							name: popupName,
							data: {
								id: id,
								tab: 'edit',
							},
						});
					}}
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
