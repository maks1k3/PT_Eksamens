const props = [
	{
		name: 'id',
		type: 'number',
		isRequired: true,
		description: 'Video id from database.',
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
		name: 'VideoAdministrationProps',
		type: 'object',
		description: 'Properties for base VideoAdministration component.',
	},
	{
		name: 'DeleteButtonProps',
		type: 'object',
		description: 'Properties for DeleteButton component.',
	},
];

export default props;
