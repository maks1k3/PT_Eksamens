const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'getGridProps',
		type: 'func',
		description: 'Function that must return minWidth and gutter.',
		isRequired: true,
	},
	{
		name: 'type',
		type: 'string: flex, float',
		default: 'float',
		description: 'Use flex or float css styles.',
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
];

export default props;
