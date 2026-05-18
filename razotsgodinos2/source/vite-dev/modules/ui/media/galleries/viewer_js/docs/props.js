const props = [
	{
		name: 'items',
		type: 'array',
		description: 'Images',
	},
	{
		name: 'current',
		type: 'number',
		description: 'Index of current image.',
		default: '0',
	},
	{
		name: 'options',
		type: 'object',
		description: 'Viewer.js options.',
	},
];

export default props;
