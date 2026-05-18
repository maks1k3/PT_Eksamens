const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'level',
		type: 'number: 1, 2, 3, 4, 5, 6',
		description: 'h1, h2, h3, h4, h5, h6',
		default: '3',
	},
	{
		name: 'children',
		type: 'node',
	},
];

export default props;
