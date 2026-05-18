const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'opened',
		type: 'bool',
		default: 'false',
		description: 'Toggle collapsible state.',
	},
	{
		name: 'lazyLoad',
		type: 'bool',
		default: 'false',
		description:
			'Collapsible content will not render until opened for first time.',
	},
	{
		name: 'title',
		type: 'node',
		description:
			'Title for header. If no title provided header will not render.',
	},
	{
		name: 'renderHeader',
		type: 'func',
		description: 'Function for custom header rendering.',
	},
	{
		name: 'children',
		type: 'node',
	},
	{
		name: 'onOpen',
		type: 'func',
		description: 'Fires when Collapsible is opened.',
	},
	{
		name: 'onClose',
		type: 'func',
		description: 'Fires when Collapsible is closed.',
	},
	{
		name: 'onClick',
		type: 'func',
		description: 'Overrides default onClick behaviour.',
	},
];

export default props;
