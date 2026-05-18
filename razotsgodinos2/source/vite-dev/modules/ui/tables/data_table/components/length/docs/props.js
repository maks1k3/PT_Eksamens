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
		name: 'SelectProps',
		type: 'object',
		description: 'Properties for Select component.',
		default: 'Default options.',
	},
	{
		name: 'translations',
		type: 'object',
		default: 'Default translations.',
	},
];

export default props;
