const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'types',
		type: 'array',
		description: '(cities),(regions),address,geocode',
		default: "['address']",
	},
	{
		name: 'onLocationChange',
		type: 'func',
		description: 'description',
		default: '{}',
	},
	{
		name: 'apiKey',
		type: 'string',
		description: 'Custom api key',
		default: 'Api key from configuration',
	},
	{
		name: 'lang',
		type: 'string',
	},
	{
		name: 'libraries',
		type: 'array',
		description: 'Libraries for Google Maps.',
		default: "['places', 'visualization']",
	},
	{
		name: 'version',
		type: 'string',
		default: '3',
	},
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
		name: 'onChange',
		type: 'func',
	},
	{
		name: 'InputProps',
		type: 'object',
		description: 'Properties for Input component.',
	},
	{
		name: 'showValidationError',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
];

export default props;
