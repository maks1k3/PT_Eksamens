const props = [
	{
		name: 'positions',
		type: 'array',
	},
	{
		name: 'gradient',
		type: 'array',
	},
	{
		name: 'radius',
		type: 'number',
		default: '20',
	},
	{
		name: 'opacity',
		type: 'number',
		default: '0.2',
	},
	{
		name: 'onClick',
		type: 'func',
	},
	{
		name: 'onMouseover',
		type: 'func',
	},
	{
		name: 'onRecenter',
		type: 'func',
	},
];

export default props;
