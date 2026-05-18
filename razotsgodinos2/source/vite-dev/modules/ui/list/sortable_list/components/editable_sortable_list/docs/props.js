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
		name: 'renderLeft',
		type: 'func',
		description: 'Customize left.',
	},
	{
		name: 'renderRight',
		type: 'func',
		description: 'Customize right.',
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
