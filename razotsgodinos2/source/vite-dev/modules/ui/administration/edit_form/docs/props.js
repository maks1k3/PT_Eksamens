const props = [
	{
		name: 'get',
		type: 'object',
		isRequired: true,
		description: 'Get data request configuration.',
	},
	{
		name: 'onGetDataSuccess',
		type: 'func',
		description: 'Fires when initial data is loaded from server.',
	},
	{
		name: 'update',
		type: 'object',
		isRequired: true,
		description: 'Update data request configuration.',
	},
	{
		name: 'render',
		type: 'func',
		isRequired: true,
		description: 'Render Form fields.',
	},
	{
		name: 'FormProps',
		type: 'object',
		description: 'Properties for Form component.',
	},
	{
		name: 'LoadingProps',
		type: 'object',
		description: 'Properties for Loading component.',
	},
];

export default props;
