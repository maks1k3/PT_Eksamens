const props = [
	{
		name: 'id',
		type: 'number',
		isRequired: true,
		description: 'File id from database.',
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
		name: 'FileAdministrationProps',
		type: 'object',
		description: 'Properties for base FileAdministration component.',
	},
	{
		name: 'DeleteButtonProps',
		type: 'object',
		description: 'Properties for DeleteButton component.',
	},
];

export default props;
