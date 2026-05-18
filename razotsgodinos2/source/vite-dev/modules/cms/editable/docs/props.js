const props = [
	{
		name: 'edit',
		type: 'object',
	},
	{
		name: 'add',
		type: 'object',
	},
	{
		name: 'sort',
		type: 'object',
	},
	{
		name: 'active',
		type: 'bool',
	},
	{
		name: 'children',
		type: 'element',
		isRequired: true,
		description: 'Only single child.',
	},
	{
		name: 'style',
		type: 'object',
	},
];

export default props;
