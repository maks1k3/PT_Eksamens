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
		name: 'translations',
		type: 'object',
		default: 'Default translations.',
	},
];

export default props;
