const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'sortable',
		type: 'bool',
		default: 'true',
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
		name: 'getGridProps',
		type: 'func',
		description: 'Function that must return minWidth and gutter.',
		default: '{ minWidth: 200, gutter: 10 }',
	},
	{
		name: 'renderCell',
		type: 'func',
		description: 'Customize cell.',
	},
	{
		name: 'renderBottom',
		type: 'func',
		description: 'Customize bottom.',
	},
	{
		name: 'render',
		type: 'func',
		description: 'Customize main render.',
	},
	{
		name: 'SortableListProps',
		type: 'object',
		description: 'Properties form SortableList component.',
	},
	{
		name: 'onSortEnd',
		type: 'func',
	},
	{
		name: 'onEditClick',
		type: 'func',
	},
	{
		name: 'onDeleteClick',
		type: 'func',
	},
	{
		name: 'onViewClick',
		type: 'func',
	},
];

export default props;
