const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'firstColumnWidth',
		type: 'number',
		default: '200',
	},
	{
		name: 'rows',
		isRequired: true,
		type: 'array',
	},
	{
		name: 'recursive',
		type: 'bool',
		default: 'false',
	},
];

export default props;
