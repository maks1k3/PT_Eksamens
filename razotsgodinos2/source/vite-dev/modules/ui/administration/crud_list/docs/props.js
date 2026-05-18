const props = [
	{
		name: 'name',
		type: 'string',
		isRequired: true,
		description: 'CRUDList name in Redux.',
	},
	{
		name: 'addNewItemsTo',
		type: 'string: end, start',
	},
	{
		name: 'autoCreate',
		type: 'bool',
		default: 'false',
		description: 'Create new item without using form.',
	},
	{
		name: 'onChange',
		type: 'func',
		description: 'Fires on all CRUD operations.',
	},
	{
		name: 'onCreate',
		type: 'func',
	},
	{
		name: 'onUpdate',
		type: 'func',
	},
	{
		name: 'onDelete',
		type: 'func',
	},
	{
		name: 'onSortEnd',
		type: 'func',
	},
	{
		name: 'showAdd',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'showDelete',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'showView',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'sortable',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'idKey',
		type: 'string',
		default: 'id',
	},
	{
		name: 'get',
		type: 'object',
		isRequired: true,
		description: 'Get action properties.',
	},
	{
		name: 'create',
		type: 'object',
		description: 'Create action properties.',
	},
	{
		name: 'update',
		type: 'object',
		description: 'Update action properties.',
	},
	{
		name: 'delete',
		type: 'object',
		description: 'Delete action properties.',
	},
	{
		name: 'reorder',
		type: 'object',
		description: 'Reorder action properties.',
	},
	{
		name: 'renderAddButton',
		type: 'func',
	},
	{
		name: 'renderAddForm',
		type: 'func',
	},
	{
		name: 'renderEditForm',
		type: 'func',
	},
	{
		name: 'renderView',
		type: 'func',
	},
	{
		name: 'renderRight',
		type: 'func',
	},
	{
		name: 'renderItem',
		type: 'func',
		isRequired: true,
	},
	{
		name: 'renderEditPopup',
		type: 'func',
	},
	{
		name: 'addFormProps',
		type: 'object',
	},
	{
		name: 'updateFormProps',
		type: 'object',
	},
	{
		name: 'popupSettings',
		type: 'object',
		default: `{level: 8,maxWidth: '600px',hideOnOverlayClick: false}`,
	},
	{
		name: 'EditableSortableListProps',
		type: 'object',
		description: 'Properties for EditableSortableList component.',
	},
	{
		name: 'ConfirmationPopupProps',
		type: 'object',
		description: 'Properties for confirmation popup component.',
	},
	{
		name: 'translations',
		type: `{add: 'Add new item', edit: 'Edit item #',}`,
	},
];

export default props;
