const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'bordered',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'hover',
		type: 'bool',
		description: 'Highlight hovered row.',
		default: 'false',
	},
	{
		name: 'header',
		type: 'array',
	},
	{
		name: 'renderHeader',
		type: 'func',
	},
	{
		name: 'footer',
		type: 'array',
	},
	{
		name: 'renderFooter',
		type: 'func',
	},
	{
		name: 'rows',
		type: 'array',
	},
	{
		name: 'renderRows',
		type: 'func',
	},
	{
		name: 'renderRow',
		type: 'func',
	},
	{
		name: 'renderCell',
		type: 'func',
	},
];

export default props;
