import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import Select from 'ui/inputs/select';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Thumbnail from 'ui/media/thumbnail';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

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

const uiProps = ownProps => {
	return {
		langs: 'langs',
	};
};

const contentTypes = {
	image: 'Image',
	video: 'Video',
	note: 'Note',
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
			title: 'Created at',
		});

		columns.push({
			name: 'image',
			title: 'Image',
			isHidable: false,
		});

		_.forEach(langs, lang => {
			columns.push({
				name: `${lang}_title`,
				title: 'Title ' + _.upperCase(lang),
			});
		});

		columns.push({
			name: 'content_type',
			title: 'Content_type',
		});

		columns.push({
			name: 'price',
			title: 'Price',
		});

		columns.push({
			name: 'active',
			title: 'Active',
		});

		columns.push({
			name: 'discount',
			title: 'Discount',
		});

		columns.push({
			name: 'address',
			title: 'Address',
		});

		columns.push({
			name: 'date_time',
			title: 'Datetime',
		});

		columns.push({
			name: 'date',
			title: 'Date',
		});

		columns.push({
			name: 'time',
			title: 'Time',
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
			label: 'Price',
			name: 'price',
			component: Input,
			componentProps: {
				placeholder: 'Price',
				clearable: true,
			},
		});

		filters.push({
			label: 'Discount',
			name: 'discount',
			component: Input,
			componentProps: {
				placeholder: 'Discount',
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

		filters.push({
			label: 'Active',
			name: 'active',
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
			label: 'Content type',
			name: 'select_content_type',
			component: Select,
			componentProps: {
				placeholder: 'Content type',
				clearable: true,
				options: [
					{
						value: 'image',
						label: 'Image',
					},
					{
						value: 'video',
						label: 'Video',
					},
					{
						value: 'note',
						label: 'Note',
					},
				],
			},
		});

		filters.push({
			label: 'Addresss',
			name: 'select_address',
			component: Select,
			componentProps: {
				async: true,
				optionsUrl: 'administration_example/administration_example_3/actions',
				extraData: {
					action: 'address_autocomplete',
				},
				clearable: true,
			},
			optionsFromUrl: true,
		});

		filters.push({
			label: 'With image',
			name: 'with_image',
			component: Select,
			componentProps: {
				placeholder: 'With image',
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

		columnRenderers.date = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.active = ({ cell }) => {
			return cell ? 'Yes' : 'No';
		};

		columnRenderers.content_type = ({ cell }) => {
			return _.get(contentTypes, cell, '');
		};

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
								tab: 'view',
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
							title: 'View',
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
