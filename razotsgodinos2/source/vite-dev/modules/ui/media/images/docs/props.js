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
		description: 'For Images component only.',
	},
	{
		name: 'type',
		type: 'string: default, photoSwipe, viewerJs',
		default: 'default',
	},
	{
		name: 'getGridProps',
		type: 'function',
		description: 'Function that must return minWidth and gutter.',
		default: '{ minWidth: 200, gutter: 10 }',
	},
	{
		name: 'collectionName',
		type: 'string',
		isRequired: true,
		description: 'For ImagesCollection component only.',
	},
	{
		name: 'collectionId',
		type: 'string',
		isRequired: true,
		description: 'For ImagesCollection component only.',
	},
	{
		name: 'masonry',
		type: 'bool',
		default: 'false',
		description: 'Display images as masonry.',
	},
	{
		name: 'onItemClick',
		type: 'function',
	},
	{
		name: 'renderItem',
		type: 'function',
	},
];

export default props;
