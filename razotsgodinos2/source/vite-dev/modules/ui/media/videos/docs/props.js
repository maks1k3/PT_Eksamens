const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'items',
		type: 'array',
		isRequired: true,
		description: 'For Videos component only.',
	},
	{
		name: 'getGridProps',
		type: 'function',
		description: 'Function that must return minWidth and gutter.',
		default: '{ minWidth: 200, gutter: 10 }',
	},
	{
		name: 'onItemClick',
		type: 'function',
	},
	{
		name: 'renderItem',
		type: 'function',
	},
	{
		name: 'collectionName',
		type: 'string',
		isRequired: true,
		description: 'For VideosCollection component only.',
	},
	{
		name: 'collectionId',
		type: 'string',
		isRequired: true,
		description: 'For VideosCollection component only.',
	},
];

export default props;
