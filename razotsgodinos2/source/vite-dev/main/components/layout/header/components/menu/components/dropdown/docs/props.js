const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'animate',
		type: 'bool',
		default: 'false',
		description: 'Add content appearance animation.',
	},
	{
		name: 'trigger',
		type: 'node',
		description: 'Dropdown trigger node.',
	},
	{
		name: 'renderTrigger',
		type: 'func',
		description: 'Render custom trigger.',
	},
	{
		name: 'content',
		type: 'node',
		description: 'Dropdown content.',
		isRequired: true,
	},
	{
		name: 'lazyLoad',
		type: 'bool',
		default: 'false',
		description:
			'Dropdown content will not render until opened for first time.',
	},
	{
		name: 'align',
		type: 'string',
		description:
			'Dropdown alignment: bottom-left, bottom-right, top-left, top-right, auto.',
		default: 'bottom-right',
	},
	{
		name: 'closeOnOutsideClick',
		type: 'bool',
		description: 'Close Dropdown on outside click.',
		default: 'true',
	},
	{
		name: 'closeOnContentClick',
		type: 'bool',
		description: 'Close Dropdown on content click.',
		default: 'true',
	},
	{
		name: 'onOpen',
		type: 'func',
		description: 'Fires when Dropdown is opened.',
	},
	{
		name: 'onClose',
		type: 'func',
		description: 'Fires when Dropdown is closed.',
	},
	{
		name: 'opened',
		type: 'bool',
		default: 'false',
		description: 'Toggle Dropdown state.',
	},
	{
		name: 'absolutelyPositioned',
		type: 'bool',
		default: 'false',
		description:
			'If true Dropdown content will appear in the root of the DOM similar to ContextMenu.',
	},
	{
		name: 'adjustAbsolutePosition',
		type: 'func',
		description: 'Allows to adjust width, top and bottom position.',
	},
	{
		name: 'getTriggerRef',
		type: 'func',
		description:
			'Use this to provider a React.ref for "trigger" DOM element if custom renderTrigger is used.',
	},
];

export default props;
