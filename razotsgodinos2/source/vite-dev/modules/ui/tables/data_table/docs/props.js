const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'id',
		type: 'string',
		isRequired: true,
		description: 'Unique id.',
	},
	{
		name: 'extraData',
		type: 'object',
		default: '{}',
		description: 'Extra data that will be sent to server.',
	},
	{
		name: 'url',
		type: 'string',
		isRequired: true,
		description: 'Url to data source.',
	},
	{
		name: 'syncWithUrl',
		type: 'bool',
		default: 'false',
		description:
			'Saves current page, ordering, number of rows to display, filters and search term in url.',
	},
	{
		name: 'columns',
		type: 'array',
		default: '[]',
		description: 'Columns configuration.',
	},
	{
		name: 'filters',
		type: 'array',
		default: '[]',
		description: 'Filters configuration.',
	},
	{
		name: 'columnRenderers',
		type: 'object',
		default: '{}',
		description: 'Specify custom rendering for columns.',
	},
	{
		name: 'order',
		type: 'object',
		default: '{}',
		description: 'Specify default ordering.',
	},
	{
		name: 'resultsPerPage',
		type: 'number',
		default: '10',
		description: 'Specify default number of rows per page.',
	},
	{
		name: 'componentsProps',
		type: 'object',
		default: '{}',
		description: 'Specify properties for internal components.',
	},
	{
		name: 'callbacks',
		type: 'object',
		default: '{}',
		description: 'Override default behaviour by specifying callbacks.',
	},
	{
		name: 'render',
		type: 'func',
		description: 'Custom rendering.',
	},
	{
		name: 'rowIdKey',
		type: 'string',
		default: 'id',
		description: 'Change it if id is not primary key.',
	},
	{
		name: 'Table',
		type: 'component',
		description: 'Custom Table component',
	},
	{
		name: 'Pagination',
		type: 'component',
		description: 'Custom Pagination component',
	},
	{
		name: 'Info',
		type: 'component',
		description: 'Custom Info component',
	},
	{
		name: 'Search',
		type: 'component',
		description: 'Custom Search component',
	},
	{
		name: 'Length',
		type: 'component',
		description: 'Custom Length component',
	},
	{
		name: 'Controls',
		type: 'component',
		description: 'Custom Controls component',
	},
	{
		name: 'getRef',
		type: 'func',
		description: 'Use this to get reference to this component.',
	},
	{
		name: 'FormProps',
		type: 'object',
		description:
			'Form component props fro the Form that is used for controlling Search and Length inputs.',
	},
	{
		name: 'preventColumnsCollapse',
		type: 'bool',
		default: 'false',
		description:
			'Prevent columns from collapsing if there is not enough space.',
	},
	{
		name: 'initialState',
		type: 'object',
		default: '{}',
		description: 'Initial search, page, filters, columnsVisibility',
	},
];

export default props;
