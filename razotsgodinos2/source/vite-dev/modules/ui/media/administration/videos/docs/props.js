const props = [
	{
		name: 'containerName',
		type: 'string',
		isRequired: true,
	},
	{
		name: 'containerId',
		type: 'number',
		isRequired: true,
	},
	{
		name: 'onChange',
		type: 'func',
	},
	{
		name: 'addNewItemsTo',
		type: 'string: end, start',
		default: 'end',
	},
	{
		name: 'showEdit',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'showDelete',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'VideosAdministrationProps',
		type: 'object',
		description: 'Properties for base VideosAdministrationProps component.',
	},
];

export default props;
