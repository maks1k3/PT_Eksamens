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
		name: 'placeholder',
		type: 'string',
		default: 'Search...',
	},
	{
		name: 'InputProps',
		type: 'object',
		description: 'Properties for Input component.',
		default: 'Default properties.',
	},
];

export default props;
