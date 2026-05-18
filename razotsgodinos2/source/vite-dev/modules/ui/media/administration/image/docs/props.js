const props = [
	{
		name: 'id',
		type: 'number',
		isRequired: true,
		description: 'Image id from database.',
	},
	{
		name: 'showDelete',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'onUpdate',
		type: 'func',
	},
	{
		name: 'onDelete',
		type: 'func',
	},
	{
		name: 'ImageAdministrationProps',
		type: 'object',
		description: 'Properties for base ImageAdministration component.',
	},
	{
		name: 'DeleteButtonProps',
		type: 'object',
		description: 'Properties for DeleteButton component.',
	},
];

export default props;
