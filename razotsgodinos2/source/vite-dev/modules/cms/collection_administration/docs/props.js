const props = [
	{
		name: 'action',
		type: 'string: add, edit, sort',
		isRequired: true,
	},
	{
		name: 'id',
		type: 'number',
		description: 'Colllection item id.',
	},
	{
		name: 'name',
		type: 'string',
		isRequired: true,
		description: 'Colllection name.',
	},
	{
		name: 'collectionId',
		type: 'number',
		description: 'Colllection id.',
		default: '0',
	},
	{
		name: 'getTitle',
		type: 'func',
		isRequired: true,
		description: 'Function that returns title for collection items sorting.',
	},
	{
		name: 'Edit',
		type: 'func',
		isRequired: true,
		description: 'Collection item edit component.',
	},
	{
		name: 'extra',
		type: 'object',
		description: 'Extra properties for collection item edit component.',
	},
];

export default props;
