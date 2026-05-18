const props = [
	{
		name: 'value',
		type: 'string',
	},
	{
		name: 'valueId',
		type: 'string',
		description:
			'If Input is not controlled, value have changed but it is same as before use valueId to change value explicitly. This way we can avoid using refs.',
	},
	{
		name: 'toolbar',
		type: 'string: tiny, small, default, pro, custom, full',
		default: 'default',
	},
	{
		name: 'customToolbar',
		type: 'array',
	},
	{
		name: 'lang',
		type: 'string',
		default: 'en',
	},
	{
		name: 'onChange',
		type: 'func',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'uiColor',
		type: 'string',
		default: '#f8f8f8',
	},
	{
		name: 'width',
		type: 'string',
	},
	{
		name: 'height',
		type: 'string',
	},
];

export default props;
