const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'theme',
		type: 'string: main, primary, success, info, warning, danger, custom',
		default: 'danger',
	},
	{
		name: 'showClose',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'onClose',
		type: 'func',
	},
	{
		name: 'content',
		type: 'node',
		isRequired: true,
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
	},
];

export default props;
