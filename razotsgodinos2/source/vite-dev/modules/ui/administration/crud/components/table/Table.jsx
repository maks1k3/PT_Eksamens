import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DataTable from 'ui/tables/data_table';

const propTypes = {
	openPopup: PropTypes.func.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	getColumns: PropTypes.func.isRequired,
	getFilters: PropTypes.func.isRequired,
	getColumnRenderers: PropTypes.func.isRequired,
	DataTableProps: PropTypes.object,
};

const defaultProps = {};

const syncWithUrl = false;
const resultsPerPage = 10;
const order = { id: 'desc' };

class Table extends Component {
	constructor(props) {
		super(props);
	}

	getColumns = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumns">
		const { getColumns } = this.props;

		if (_.isFunction(getColumns)) {
			return getColumns();
		}

		return [];
		//</editor-fold>
	};

	getFilters = () => {
		//<editor-fold defaultstate="collapsed" desc="getFilters">
		const { getFilters } = this.props;

		if (_.isFunction(getFilters)) {
			return getFilters();
		}

		return [];
		//</editor-fold>
	};

	getColumnRenderers = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumnRenderers">
		const { getColumnRenderers, openPopup } = this.props;

		if (_.isFunction(getColumnRenderers)) {
			return getColumnRenderers({ openPopup });
		}

		return {};
		//</editor-fold>
	};

	render() {
		const { tableName, search, DataTableProps } = this.props;
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
				{...DataTableProps}
			/>
		);
	}
}

Table.propTypes = propTypes;

Table.defaultProps = defaultProps;

export default Table;
