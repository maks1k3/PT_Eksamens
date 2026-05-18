const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'value',
		type: 'string',
	},
	{
		name: 'searchable',
		type: 'bool',
		description: 'Add a search bar to both fields',
		default: 'false',
	},
	{
		name: 'onChange',
		type: 'func',
		description: '',
		default: 'undefined',
	},
	{
		name: 'onSelect',
		type: 'func',
		description: 'Callback for selected values',
		default: 'undefined',
	},
	{
		name: 'onUnselect',
		type: 'func',
		description: 'Callback for unselected values',
		default: 'undefined',
	},
	{
		name: 'options',
		type: 'array',
		description: 'Multi select options',
		default: '[]',
	},

	{
		name: 'render',
		type: 'func',
		description: 'Custom renderer for the whole component',
		default: 'undefined',
	},
	{
		name: 'renderOption',
		type: 'func',
		description: 'Custom renderer for unselected and selected options',
		default: 'undefined',
	},

	{
		name: 'renderSearchInput',
		type: 'func',
		description: 'Custom renderer for search inputs',
		default: 'undefined',
	},
	{
		name: 'renderArrows',
		type: 'func',
		description: 'Custom renderer for arrows',
		default: 'undefined',
	},
	{
		name: 'renderList',
		type: 'func',
		description: 'Custom renderer for list',
		default: 'undefined',
	},
	{
		name: 'debounce',
		type: 'integer',
		description: 'Add debounce to holding down spacebar',
		default: '100',
	},
];

export default props;
