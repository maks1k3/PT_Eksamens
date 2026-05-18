const props = [
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
		name: 'onSortEnd',
		type: 'func',
		isRequired: true,
	},
	{
		name: 'getGridProps',
		type: 'func',
		description: 'Function that must return minWidth and gutter.',
	},
	{
		name: 'keyExtractor',
		type: 'func',
		description: 'Function that must return key.',
	},
	{
		name: 'useDragHandle',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'axis',
		type: 'string: x, y, xy',
		default: 'y',
		description: 'Items can be sorted horizontally, vertically or in a grid.',
	},
	{
		name: 'lockAxis',
		type: 'string: x, y',
		description:
			"If you'd like, you can lock movement to an axis while sorting.",
	},
];

export default props;
