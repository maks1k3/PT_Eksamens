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
		description: 'For Files component only.',
	},
	{
		name: 'renderItem',
		type: 'func',
	},
	{
		name: 'collectionName',
		type: 'string',
		isRequired: true,
		description: 'For FilesCollection component only.',
	},
	{
		name: 'collectionId',
		type: 'string',
		isRequired: true,
		description: 'For FilesCollection component only.',
	},
];

export default props;
