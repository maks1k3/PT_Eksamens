const props = [
	{
		name: 'name',
		type: 'string',
		isRequired: true,
		description: 'Content name.',
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
