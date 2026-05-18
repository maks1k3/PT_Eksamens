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
		description: "DataTable's id.",
	},
	{
		name: 'enabled',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'options',
		type: 'object',
		default: 'Default options.',
	},
	{
		name: 'columns',
		type: 'array',
		default: '[]',
	},
	{
		name: 'filters',
		type: 'array',
		default: '[]',
	},
	{
		name: 'callbacks',
		type: 'object',
		default: '{}',
	},
	{
		name: 'translations',
		type: 'object',
		default: 'Default translations.',
	},
];

export default props;
