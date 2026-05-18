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
		name: 'title',
		type: 'string',
		default: '',
	},
	{
		name: 'showCloseControl',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'onClose',
		type: 'func',
	},
];

export default props;
