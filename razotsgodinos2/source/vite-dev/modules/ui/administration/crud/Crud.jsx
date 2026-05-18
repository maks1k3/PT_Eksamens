import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import AddButton from './components/add_button';
import Table from './components/table';
import Popup from './components/popup';

const propTypes = {
	autoCreate: PropTypes.bool,
	containerName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	getColumns: PropTypes.func.isRequired,
	getFilters: PropTypes.func.isRequired,
	getColumnRenderers: PropTypes.func.isRequired,
	showAdd: PropTypes.bool,
	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,
	showView: PropTypes.bool,
	addFormProps: PropTypes.object,
	renderAddForm: PropTypes.func,
	renderView: PropTypes.func,
	renderAddButton: PropTypes.func,
	editFormProps: PropTypes.object,
	deleteFormProps: PropTypes.object,
	renderEditForm: PropTypes.func,
	popupSettings: PropTypes.object,
	DataTableProps: PropTypes.object,
	translations: PropTypes.object,
	uiTranslations: PropTypes.object,
};

const defaultProps = {
	autoCreate: false,
	showAdd: true,
	showEdit: true,
	showDelete: true,
	showView: false,
	popupSettings: {
		level: 2,
		maxWidth: '800px',
		hideOnOverlayClick: false,
	},

	translations: {
		add: 'Add new item',
		edit: 'Edit item #',
	},

	uiTranslations: {
		add: 'Add',
		save: 'Save',
		view: 'View',
		edit: 'Edit',
		delete: 'Delete',
	},
};

class Crud extends Component {
	constructor(props) {
		super(props);
	}

	getPopupProps = () => {
		//<editor-fold defaultstate="collapsed" desc="getPopupProps">
		const {
			action,
			containerName,
			tableName,
			showEdit,
			showDelete,
			showView,
			renderView,
			editFormProps,
			renderEditForm,
			uiTranslations,
			deleteFormProps,
		} = this.props;

		return {
			action,
			containerName,
			tableName,
			showEdit,
			showDelete,
			showView,
			renderView,
			editFormProps,
			renderEditForm,
			uiTranslations,
			deleteFormProps,
		};
		//</editor-fold>
	};

	openPopup = ({ id, tab }) => {
		//<editor-fold defaultstate="collapsed" desc="opePopup">
		const { popupSettings, translations } = this.props;
		const popupProps = this.getPopupProps();

		const data = {
			...{
				id,
				tab,
				closePopup: this.closePopup,
			},
			...popupProps,
		};

		const settings = {
			...{
				title: _.get(translations, 'edit', 'Edit item #') + id,
			},
			...popupSettings,
		};

		openPopup({
			name: 'universal',
			data: data,
			settings: settings,
			component: Popup,
		});
		//</editor-fold>
	};

	closePopup = () => {
		//<editor-fold defaultstate="collapsed" desc="closePopup">
		const { popupSettings } = this.props;

		const { level } = popupSettings;

		closePopup({ name: 'universal', level });
		//</editor-fold>
	};

	renderAdd = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAdd">
		const {
			translations,
			autoCreate,
			showAdd,
			action,
			addFormProps,
			renderAddForm,
			popupSettings,
			tableName,
			uiTranslations,
			renderAddButton,
		} = this.props;

		if (!showAdd) {
			return null;
		}

		const addButton = (
			<AddButton
				openPopup={this.openPopup}
				title={_.get(translations, 'add', 'Add new item')}
				autoCreate={autoCreate}
				action={action}
				addFormProps={addFormProps}
				renderAddForm={renderAddForm}
				popupSettings={popupSettings}
				tableName={tableName}
				uiTranslations={uiTranslations}
			/>
		);

		if (_.isFunction(renderAddButton)) {
			return renderAddButton({ addButton });
		}

		return addButton;
		//</editor-fold>
	};

	renderDataTable = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDataTable">
		const {
			tableName,
			action,
			search,
			getColumns,
			getFilters,
			getColumnRenderers,
			DataTableProps,
		} = this.props;

		return (
			<Table
				openPopup={this.openPopup}
				tableName={tableName}
				action={action}
				search={search}
				getColumns={getColumns}
				getFilters={getFilters}
				getColumnRenderers={getColumnRenderers}
				DataTableProps={DataTableProps}
			/>
		);
		//</editor-fold>
	};

	render() {
		const add = this.renderAdd();
		const dataTable = this.renderDataTable();

		return (
			<Fragment>
				{add}
				{dataTable}
			</Fragment>
		);
	}
}

Crud.propTypes = propTypes;

Crud.defaultProps = defaultProps;

Crud = WithLocale(Crud);

export default Crud;
