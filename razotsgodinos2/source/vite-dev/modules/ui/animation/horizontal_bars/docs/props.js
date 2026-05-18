const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'center',
		type: 'bool',
		description: 'Center loader horizontally',
	},
	{
		name: 'pageCenter',
		type: 'bool',
		description: 'Center loader horizontally and vertically',
	},
	{
		name: 'LoaderProps',
		type: 'object',
		description: 'Allows to override base loader wrapper properties',
	},
];

export default props;
