const props = [
	{
		name: 'children',
		type: 'element',
		isRequired: true,
	},
	{
		name: 'marker',
		type: 'object',
	},
	{
		name: 'visible',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'onClose',
		type: 'func',
	},
	{
		name: 'onOpen',
		type: 'func',
	},
];

export default props;
