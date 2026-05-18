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
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'readonly',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'mode',
		type: 'string: jsx, javascript, html, css, less, json',
		default: 'jsx',
	},
	{
		name: 'width',
		type: 'string',
		default: '100%',
	},
	{
		name: 'height',
		type: 'string',
		default: '500px',
	},
	{
		name: 'onChange',
		type: 'func',
	},
];

export default props;
