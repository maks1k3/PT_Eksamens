const props = [
	{
		name: 'autoCreate',
		type: 'bool',
		default: 'false',
		description: 'Create new item without using form.',
	},
	{
		name: 'containerName',
		type: 'string',
		isRequired: true,
		description: 'Redux namespace for administration popup.',
	},
	{
		name: 'tableName',
		type: 'string',
		isRequired: true,
		description: 'Datatables table name.',
	},
	{
		name: 'action',
		type: 'string',
		isRequired: true,
		description: 'Actions url.',
	},
	{
		name: 'search',
		type: 'string',
		isRequired: true,
		description: 'Search url.',
	},
	{
		name: 'getColumns',
		type: 'func',
		description: 'DataTable columns.',
	},
	{
		name: 'getFilters',
		type: 'func',
		description: 'DataTable filters.',
	},
	{
		name: 'getColumnRenderers',
		type: 'func',
		description: 'DataTable column renderers.',
	},
	{
		name: 'showAdd',
		type: 'bool',
		default: 'true',
		description: 'Show add button.',
	},
	{
		name: 'showEdit',
		type: 'bool',
		default: 'true',
		description: 'Show edit tab.',
	},
	{
		name: 'showDelete',
		type: 'bool',
		default: 'true',
		description: 'Show delete tab.',
	},
	{
		name: 'showView',
		type: 'bool',
		default: 'false',
		description: 'Show view tab.',
	},
	{
		name: 'addFormProps',
		type: 'object',
		description: 'Properties for add form.',
	},
	{
		name: 'renderAddForm',
		type: 'func',
		description: 'Render add form fields.',
	},
	{
		name: 'renderView',
		type: 'func',
		description: 'Render view tab.',
	},
	{
		name: 'editFormProps',
		type: 'object',
		description: 'Properties for edit form.',
	},
	{
		name: 'renderEditForm',
		type: 'func',
		description: 'Render edit form fields.',
	},
	{
		name: 'popupSettings',
		type: 'object',
		default: `{
			level: 2,
			maxWidth: '800px',
			hideOnOverlayClick: false,
		}`,
		description: 'Popup settings.',
	},
	{
		name: 'DataTableProps',
		type: 'object',
		description: 'Properties for DataTable.',
	},
	{
		name: 'translations',
		type: 'object',
		default: "{add: 'Add new item', edit: 'Edit item #'}",
	},
	{
		name: 'deleteFormProps',
		type: 'object',
		description: 'Properties for delete form.',
	},
	{
		name: 'renderAddButton',
		type: 'func',
		description: 'Render add button.',
	},
];

export default props;
