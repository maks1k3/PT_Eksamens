const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'theme',
		type: 'string: main, primary, success, info, warning, danger, custom',
		default: 'main',
	},
	{
		name: 'fullWidth',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'title',
		type: 'string',
	},
	{
		name: 'customTitle',
		type: 'node',
		description: 'React node as title.',
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
	},
	{
		name: 'style',
		type: 'object',
	},
	{
		name: 'type',
		type: 'string: button, submit, reset',
		default: 'button',
		description: 'HTML button attribute.',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'loading',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'onClick',
		type: 'func',
	},
	{
		name: 'renderLoader',
		type: 'func',
	},
	{
		name: 'renderTitle',
		type: 'func',
	},
];

export default props;
