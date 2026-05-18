const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'options',
		type: 'array',
		isRequired: true,
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
		default: '{provider: icommon, name: menu9}',
	},
];

export default props;
