import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import Link from 'core/navigation/link';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';
import { forEach, upperCase } from 'lodash-es';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	//ui
	langs: PropTypes.array,
};

const defaultProps = {};

const syncWithUrl = true;
const resultsPerPage = 10;
const order = { id: 'desc' };

const uiProps = (ownProps) => {
	return {
		langs: 'langs',
	};
};

class Table extends Component {
	constructor(props) {
		super(props);
	}

	getColumns = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumns">
		const { langs } = this.props;
		const columns = [];

		columns.push({
			name: 'id',
			title: 'ID',
			isHidable: false,
		});

		columns.push({
			name: 'created_at',
			title: 'Datums',
		});

		forEach(langs, (lang) => {
			columns.push({
				name: `${lang}_title`,
				title: 'Nosaukums ' + upperCase(lang),
			});
		});

		columns.push({
			name: 'action',
			title: 'Darbība',
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
			label: 'ID',
			name: 'id',
			component: Input,
			componentProps: {
				placeholder: 'Kategorijas ID',
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

		columnRenderers.created_at = ({ cell, id }) => {
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
					<span className="no-wrap">{cell}</span>
				</Link>
			);
		};

		columnRenderers.action = ({ id }) => {
			return (
				<ActionsMenu
					options={[
						{
							title: 'Rediģēt',
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

Table = WithUi(uiProps)(Table);

export default Table;
