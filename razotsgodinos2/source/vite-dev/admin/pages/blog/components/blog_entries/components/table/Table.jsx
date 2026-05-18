import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import Thumbnail from 'ui/media/thumbnail';
import BooleanStatus from 'admin/components/ui/misc/boolean_status';
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
			name: 'blog_entry_name',
			title: 'Nosaukums',
		});

		columns.push({
			name: 'pinned',
			title: 'Pin',
		});

		columns.push({
			name: 'tip_projects',
			title: 'Tipveida projekts',
		});

		columns.push({
			name: 'active',
			title: 'Aktīvs',
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
			name: 'Bloga ID',
			component: Input,
			componentProps: {
				placeholder: 'Id',
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

		columnRenderers.active = ({ cell }) => {
			return (
				<BooleanStatus
					title={cell ? 'Jā' : 'Nē'}
					isTrue={cell ? true : false}
				/>
			);
		};

		columnRenderers.pinned = ({ cell }) => {
			return (
				<BooleanStatus
					title={cell ? 'Jā' : 'Nē'}
					isTrue={cell ? true : false}
				/>
			);
		};
		columnRenderers.tip_projects = ({ cell }) => (
			<BooleanStatus title={cell ? 'Jā' : 'Nē'} isTrue={cell ? true : false} />
		);

		columnRenderers.image = ({ id, cell }) => {
			return (
				<Thumbnail
					src={cell}
					width="80px"
					height="80px"
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
							title: 'Media',
							icon: {
								provider: 'icomoon',
								name: 'image2',
							},
							onClick: () => {
								openPopup({
									name: popupName,
									data: {
										id: id,
										tab: 'media',
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

export default Table;
