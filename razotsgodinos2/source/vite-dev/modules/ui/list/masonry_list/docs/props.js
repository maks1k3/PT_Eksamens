const props = [
	{
		name: 'getGridProps',
		type: 'func',
		description: 'Function that must return minWidth and gutter.',
		isRequired: true,
	},
	{
		name: 'items',
		type: 'array',
		isRequired: true,
	},
	{
		name: 'renderItem',
		type: 'func',
		isRequired: true,
	},
	{
		name: 'render',
		type: 'func',
		description: 'Customize main render.',
	},
	{
		name: 'pack',
		type: 'bool',
		isRequired: true,
		description: 'Flag to force pack on every update.',
		default: 'false',
	},
];

export default props;
