import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import WithLocale from './WithLocale';

import Form from 'ui/form';
import Button from 'ui/controls/button';
import Loading from 'ui/misc/loading';
import EditableSortableList, {
	arrayMove,
} from 'ui/list/sortable_list/components/editable_sortable_list';
import Icon from 'ui/misc/icon';
import Tabs from 'ui/controls/tabs';
import InfoTable from 'ui/tables/info_table';

const propTypes = {
	name: PropTypes.string.isRequired,

	addNewItemsTo: PropTypes.oneOf(['end', 'start']),
	autoCreate: PropTypes.bool,

	onChange: PropTypes.func,
	onCreate: PropTypes.func,
	onUpdate: PropTypes.func,
	onDelete: PropTypes.func,
	onSortEnd: PropTypes.func,

	showAdd: PropTypes.bool,
	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,
	showView: PropTypes.bool,
	sortable: PropTypes.bool,

	idKey: PropTypes.string,

	get: PropTypes.shape({
		action: PropTypes.string.isRequired,
		extraData: PropTypes.object.isRequired,
		parseResponse: PropTypes.func,
	}).isRequired,

	create: PropTypes.shape({
		action: PropTypes.string.isRequired,
		extraData: PropTypes.object.isRequired,
		parseResponse: PropTypes.func,
		onBeforeSubmit: PropTypes.func,
	}),

	update: PropTypes.shape({
		action: PropTypes.string.isRequired,
		getExtraData: PropTypes.func.isRequired,
		parseResponse: PropTypes.func,
		onBeforeSubmit: PropTypes.func,
	}),

	delete: PropTypes.shape({
		action: PropTypes.string.isRequired,
		getExtraData: PropTypes.func.isRequired,
	}),

	reorder: PropTypes.shape({
		action: PropTypes.string.isRequired,
		getExtraData: PropTypes.func.isRequired,
	}),

	renderAddButton: PropTypes.func,
	renderAddForm: PropTypes.func,
	renderEditForm: PropTypes.func,
	renderView: PropTypes.func,
	renderRight: PropTypes.func,
	renderItem: PropTypes.func.isRequired,
	renderEditPopup: PropTypes.func,

	addFormProps: PropTypes.object,
	updateFormProps: PropTypes.object,

	popupSettings: PropTypes.object,
	EditableSortableListProps: PropTypes.object,
	ConfirmationPopupProps: PropTypes.object,

	translations: PropTypes.object,
	uiTranslations: PropTypes.object,

	//from ui
	ids: PropTypes.array,
	loading: PropTypes.bool,
};

const defaultProps = {
	addNewItemsTo: 'end',
	autoCreate: false,
	showAdd: true,
	showEdit: true,
	showDelete: true,
	showView: false,
	sortable: true,

	idKey: 'id',

	popupSettings: {
		level: 8,
		maxWidth: '600px',
		hideOnOverlayClick: false,
	},

	translations: {
		add: 'Add new item',
		edit: 'Edit item #',
	},

	uiTranslations: {
		confirmationTitle: 'Confirm deletion',
		confirmationText: 'Are you sure you want to delete this?',
		confirmationConfirm: 'Confirm',
		confirmationCancel: 'Cancel',
		add: 'Add',
		save: 'Save',
		view: 'View',
		edit: 'Edit',
	},

	//from ui
	loading: true,
};

const uiProps = ownProps => {
	return {
		[ownProps.name]: {
			ids: 'ids',
			loading: 'loading',
		},
	};
};

class CRUDList extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { name } = this.props;

		uiStore.set(name, {
			mounted: true,
			loading: true,
			ids: [],
			items: null,
		});

		this.getData();
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { name, popupSettings } = this.props;
		const level = _.get(popupSettings, 'level', 8);
		closePopup({ name: 'universal', level });

		uiStore.remove(name);
		//</editor-fold>
	}

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const { name, idKey } = this.props;
		const { action, extraData, parseResponse } = this.props.get;

		remoteRequest({
			url: action,
			data: extraData,
			onSuccess: response => {
				if (!uiStore.get(`${name}.mounted`, false)) {
					return;
				}

				if (_.isFunction(parseResponse)) {
					response = parseResponse(response);
				}

				const state = {};
				state.loading = false;

				const response_items = _.get(response, 'items', []);

				state.ids = _.map(response_items, item => {
					return item[idKey];
				});

				const items = {};

				_.forEach(response_items, item => {
					items[item[idKey]] = item;
				});
				state.items = items;
				state.loading = false;

				uiStore.update(name, state);
			},
			onError: response => {
				if (!uiStore.get(`${name}.mounted`, false)) {
					return;
				}
				showAlert({ content: response.msg });
			},
		});
		//</editor-fold>
	};

	onChange = () => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, name, idKey } = this.props;

		if (_.isFunction(onChange)) {
			const _items = uiStore.get(`${name}.items`, []);
			const items = [];
			const ids = uiStore.get(`${name}.ids`, []);

			_.forEach(ids, id => {
				const item = _.find(_items, i => {
					return i[idKey] == id;
				});

				if (!_.isUndefined(item)) {
					items.push(item);
				}
			});

			onChange({ items, CRUDList: this });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Createa
	 *
	 * ========================================================================*/

	addNewItem = item => {
		//<editor-fold defaultstate="collapsed" desc="addNewItem">
		const { addNewItemsTo, onCreate, name, idKey } = this.props;

		const ids = _.clone(uiStore.get(`${name}.ids`, []));

		if (addNewItemsTo === 'start') {
			ids.unshift(item[idKey]);
		} else {
			ids.push(item[idKey]);
		}

		if (_.isFunction(onCreate)) {
			onCreate({ item, CRUDList: this });
		}

		uiStore.batch({
			set: [
				{
					path: `${name}.ids`,
					value: ids,
				},
			],
			update: [
				{
					path: `${name}.items`,
					value: { [item[idKey]]: item },
				},
			],
		});

		this.onChange();
		//</editor-fold>
	};

	onAddNewClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onAddNewClick">
		const { popupSettings, translations } = this.props;

		openPopup({
			name: 'universal',
			data: {},
			component: () => {
				return this.renderAddForm();
			},
			settings: {
				title: _.get(translations, 'add', 'Add new item'),
				...popupSettings,
			},
		});
		//</editor-fold>
	};

	/* ========================================================================*
	*
	*                     Update
	*
	* ========================================================================*/

	onEditClick = id => {
		//<editor-fold defaultstate="collapsed" desc="onEditClick">
		this.openEditPopup({ id, currentTab: 'edit' });
		//</editor-fold>
	};

	onViewClick = id => {
		//<editor-fold defaultstate="collapsed" desc="onViewClick">
		this.openEditPopup({ id, currentTab: 'view' });
		//</editor-fold>
	};

	openEditPopup = ({ id, currentTab }) => {
		//<editor-fold defaultstate="collapsed" desc="openEditPopup">
		const { popupSettings, translations, name } = this.props;
		openPopup({
			name: 'universal',
			data: {
				name,
				id,
				render: item => {
					return this.renderEditPopup({ item, currentTab });
				},
			},
			component: Item,
			settings: {
				title: _.get(translations, 'edit', 'Edit item #') + id,
				...popupSettings,
			},
		});
		//</editor-fold>
	};

	update = item => {
		//<editor-fold defaultstate="collapsed" desc="update">
		const { onUpdate, name, idKey } = this.props;

		if (_.isFunction(onUpdate)) {
			onUpdate({ item, CRUDList: this });
		}

		uiStore.update(`${name}.items.${item[idKey]}`, item);

		this.onChange();
		//</editor-fold>
	};

	/* ========================================================================*
	*
	*                     Delete
	*
	* ========================================================================*/

	onDeleteClick = id => {
		//<editor-fold defaultstate="collapsed" desc="onDeleteClick">
		const { ConfirmationPopupProps, uiTranslations } = this.props;
		openPopup({
			name: 'confirmation',
			data: {
				...ConfirmationPopupProps,
				title: _.get(uiTranslations, 'confirmationTitle', 'Confirm deletion'),
				text: _.get(
					uiTranslations,
					'confirmationText',
					'Are you sure you want to delete this?',
				),
				confirm: _.get(uiTranslations, 'confirmationConfirm', 'Confirm'),
				cancel: _.get(uiTranslations, 'confirmationCancel', 'Cancel'),
				onConfirm: () => {
					this.delete(id);
					closePopup({ name: 'confirmation' });
				},
			},
		});
		//</editor-fold>
	};

	delete = id => {
		//<editor-fold defaultstate="collapsed" desc="delete">
		const { name, onDelete } = this.props;

		const ids = _.clone(uiStore.get(`${name}.ids`, []));
		const oldIds = _.clone(uiStore.get(`${name}.ids`, []));
		const index = _.indexOf(ids, id);

		const item = uiStore.get(`${name}.items.${id}`, {});

		if (index >= 0) {
			ids.splice(index, 1);
		}

		uiStore.batch({
			set: [
				{
					path: `${name}.ids`,
					value: ids,
				},
			],
			remove: `${name}.items.${id}`,
		});

		const { action, getExtraData } = this.props.delete;

		remoteRequest({
			url: action,
			data: getExtraData({ item }),
			onSuccess: () => {
				if (!uiStore.get(`${name}.mounted`, false)) {
					return;
				}

				if (_.isFunction(onDelete)) {
					onDelete({ item, CRUDList: this });
				}
				this.onChange();
			},
			onError: response => {
				if (!uiStore.get(`${name}.mounted`, false)) {
					return;
				}
				showAlert({ content: response.msg });
				uiStore.batch({
					set: [
						{
							path: `${name}.ids`,
							value: oldIds,
						},
						{
							path: `${name}.items.${id}`,
							value: item,
						},
					],
				});
			},
		});
		//</editor-fold>
	};

	/* ========================================================================*
	*
	*                     Reorder
	*
	* ========================================================================*/

	onSortEnd = ({ oldIndex, newIndex }) => {
		//<editor-fold defaultstate="collapsed" desc="onSortEnd">
		const { ids, name, onSortEnd } = this.props;

		const newIds = arrayMove(ids, oldIndex, newIndex);

		uiStore.set(`${name}.ids`, newIds);

		const { action, getExtraData } = this.props.reorder;

		remoteRequest({
			url: action,
			data: getExtraData({ ids: newIds }),
			onSuccess: () => {
				if (!uiStore.get(`${name}.mounted`, false)) {
					return;
				}

				if (_.isFunction(onSortEnd)) {
					onSortEnd({ ids: newIds, CRUDList: this });
				}
				this.onChange();
			},
		});
		//</editor-fold>
	};

	/* ========================================================================*
 *
 *                     Renderers
 *
 * ========================================================================*/

	renderList = () => {
		//<editor-fold defaultstate="collapsed" desc="renderList">
		const { ids, EditableSortableListProps, sortable } = this.props;

		return (
			<EditableSortableList
				sortable={sortable}
				items={ids}
				renderItem={this.renderItem}
				onSortEnd={this.onSortEnd}
				renderRight={this.renderRight}
				{...EditableSortableListProps}
			/>
		);
		//</editor-fold>
	};

	renderItem = ({ item: id }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { name, renderItem } = this.props;

		return (
			<Item
				name={name}
				id={id}
				render={item => {
					return renderItem({ item, CRUDList: this });
				}}
			/>
		);
		//</editor-fold>
	};

	renderRight = ({ classNames, item: id }) => {
		//<editor-fold defaultstate="collapsed" desc="renderRight">

		const { renderRight, showEdit, showView, showDelete, name } = this.props;

		return (
			<Item
				name={name}
				id={id}
				render={item => {
					if (_.isFunction(renderRight)) {
						return renderRight({
							classNames,
							id,
							item,
							showEdit,
							showView,
							showDelete,
							onViewClick: () => {
								this.onViewClick(id);
							},
							onEditClick: () => {
								this.onEditClick(id);
							},
							onDeleteClick: () => {
								this.onDeleteClick(id);
							},
							CRUDList: this,
						});
					}

					return (
						<Fragment>
							{showView && (
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="file-text"
									onClick={() => {
										this.onViewClick(id);
									}}
								/>
							)}
							{showEdit && (
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="pencil"
									onClick={() => {
										this.onEditClick(id);
									}}
								/>
							)}
							{showDelete && (
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="trash"
									onClick={() => {
										this.onDeleteClick(id);
									}}
								/>
							)}
						</Fragment>
					);
				}}
			/>
		);

		//</editor-fold>
	};

	renderAddForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAddForm">
		const { renderAddForm, uiTranslations, addFormProps, name } = this.props;
		const {
			action,
			extraData,
			parseResponse,
			onBeforeSubmit,
		} = this.props.create;

		let fields = null;

		if (_.isFunction(renderAddForm)) {
			fields = renderAddForm();
		}

		const title = _.get(uiTranslations, 'add', 'Add');

		return (
			<Form
				action={action}
				extraData={extraData}
				submit={{
					title: title,
				}}
				refresh={true}
				onBeforeSubmit={onBeforeSubmit}
				onSuccess={({ response }) => {
					if (!uiStore.get(`${name}.mounted`, false)) {
						return;
					}

					if (_.isFunction(parseResponse)) {
						response = parseResponse(response);
					}

					this.addNewItem(response.item);
				}}
				{...addFormProps}>
				{fields}
			</Form>
		);
		//</editor-fold>
	};

	renderAutoCreateForm = (title, icon) => {
		//<editor-fold defaultstate="collapsed" desc="renderAutoCreateForm">
		const { idKey, name } = this.props;
		const {
			action,
			extraData,
			parseResponse,
			onBeforeSubmit,
		} = this.props.create;

		return (
			<Form
				action={action}
				extraData={extraData}
				submitPosition="left"
				showResponse={false}
				onBeforeSubmit={onBeforeSubmit}
				onSuccess={({ response }) => {
					if (!uiStore.get(`${name}.mounted`, false)) {
						return;
					}

					if (_.isFunction(parseResponse)) {
						response = parseResponse(response);
					}

					this.addNewItem(response.item);

					const id = response.item[idKey];

					this.onEditClick(id);
				}}
				submit={{
					title: title,
					icon: icon,
				}}
			/>
		);
		//</editor-fold>
	};

	renderAddButton = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAddButton">
		const { translations, autoCreate, renderAddButton, showAdd } = this.props;

		if (!showAdd) {
			return;
		}

		if (_.isFunction(renderAddButton)) {
			return renderAddButton({
				translations,
				autoCreate,
				CRUDList: this,
			});
		}

		const title = _.get(translations, 'add', 'Add new item');
		const icon = {
			provider: 'icomoon',
			name: 'plus3',
		};

		let content;

		if (autoCreate) {
			content = this.renderAutoCreateForm(title, icon);
		} else {
			content = (
				<Button title={title} icon={icon} onClick={this.onAddNewClick} />
			);
		}

		return <div className="margin-bottom">{content}</div>;
		//</editor-fold>
	};

	renderEditPopup = ({ item, currentTab }) => {
		//<editor-fold defaultstate="collapsed" desc="renderEditPopup">
		const { showView, showEdit, renderEditPopup, uiTranslations } = this.props;

		if (_.isFunction(renderEditPopup)) {
			return renderEditPopup({
				item,
				currentTab,
				uiTranslations,
				CRUDList: this,
			});
		}

		const items = [];

		if (showView) {
			items.push({
				name: 'view',
				icon: {
					provider: 'icomoon',
					name: 'file-text',
				},
				title: _.get(uiTranslations, 'view', 'View'),
				content: this.renderView(item),
			});
		}

		if (showEdit) {
			items.push({
				name: 'edit',
				icon: {
					provider: 'icomoon',
					name: 'pencil',
				},
				title: _.get(uiTranslations, 'edit', 'Edit'),
				content: this.renderEdit(item),
			});
		}

		return <Tabs items={items} lazyLoad={true} current={currentTab} />;
		//</editor-fold>
	};

	renderView = item => {
		//<editor-fold defaultstate="collapsed" desc="renderView">
		const { renderView } = this.props;

		if (_.isFunction(renderView)) {
			return renderView({ item, CRUDList: this });
		}

		return <InfoTable rows={item} />;
		//</editor-fold>
	};

	renderEdit = item => {
		//<editor-fold defaultstate="collapsed" desc="renderEdit">
		const {
			renderEditForm,
			updateFormProps,
			uiTranslations,
			name,
		} = this.props;
		const {
			action,
			getExtraData,
			parseResponse,
			onBeforeSubmit,
		} = this.props.update;

		let fields = null;

		if (_.isFunction(renderEditForm)) {
			fields = renderEditForm({ item });
		}

		const title = _.get(uiTranslations, 'save', 'Save');

		return (
			<Form
				action={action}
				extraData={getExtraData({ item })}
				submit={{
					title: title,
				}}
				onBeforeSubmit={onBeforeSubmit}
				onSuccess={({ response }) => {
					if (!uiStore.get(`${name}.mounted`, false)) {
						return;
					}

					if (_.isFunction(parseResponse)) {
						response = parseResponse(response);
					}

					this.update(response.item);
				}}
				{...updateFormProps}>
				{fields}
			</Form>
		);
		//</editor-fold>
	};

	render() {
		const { loading } = this.props;

		if (loading) {
			return <Loading />;
		}

		return (
			<Fragment>
				{this.renderAddButton()}
				{this.renderList()}
			</Fragment>
		);
	}
}

CRUDList.propTypes = propTypes;

CRUDList.defaultProps = defaultProps;

CRUDList = WithUi(uiProps)(CRUDList);

CRUDList = WithLocale(CRUDList);

//<editor-fold defaultstate="collapsed" desc="Item">
class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { render, item } = this.props;

		return render(item);
	}
}

Item.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.any.isRequired,
	render: PropTypes.func.isRequired,
	//from ui
	item: PropTypes.object,
};

const itemUiProps = ownProps => {
	return {
		[ownProps.name]: {
			items: {
				[ownProps.id]: 'item',
			},
		},
	};
};

Item = WithUi(itemUiProps)(Item);
//</editor-fold>

export default CRUDList;
