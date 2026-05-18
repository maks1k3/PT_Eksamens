const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'showRefresh',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'onRefreshClick',
		type: 'func',
	},
	{
		name: 'onImageClick',
		type: 'func',
	},
	{
		name: 'image',
		type: 'string',
	},
	{
		name: 'rows',
		type: 'array',
	},
	{
		name: 'ImageProps',
		type: 'object',
	},
	{
		name: 'refreshIcon',
		type: 'object: {provider, name}',
		default: '{provider: fa, name: refresh}',
	},
	{
		name: 'renderRows',
		type: 'func',
	},
];

export default props;
