const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'opened',
		type: 'boolean',
		default: 'false',
		description: 'Toggle ContextMenu state.',
	},
	{
		name: 'renderTrigger',
		type: 'func',
		description: 'Render custom trigger.',
	},
	{
		name: 'children',
		type: 'node',
		description: 'Trigger.',
	},
	{
		name: 'closeOnContentClick',
		type: 'bool',
		description: 'Close ContextMenu on content click.',
		default: 'true',
	},
	{
		name: 'content',
		type: 'node',
		description: 'ContextMenu content.',
		isRequired: true,
	},

	{
		name: 'onOpen',
		type: 'func',
		description: 'Fires when ContextMenu is opened.',
	},
	{
		name: 'onClose',
		type: 'func',
		description: 'Fires when ContextMenu is closed.',
	},
	{
		name: 'onClick',
		type: 'func',
		description: 'Overrides default onClick behaviour.',
	},
];

export default props;
