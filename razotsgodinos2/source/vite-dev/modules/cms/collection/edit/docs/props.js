const props = [
	{
		name: 'id',
		type: 'number',
		isRequired: true,
		description: 'Collection item id.',
	},
	{
		name: 'children',
		type: 'node',
	},
	{
		name: 'onBeforeSubmit',
		type: 'func',
	},
	{
		name: 'onSuccess',
		type: 'func',
	},
	{
		name: 'FormProps',
		type: 'object',
		description: 'Properties for Form component.',
	},
];

export default props;
