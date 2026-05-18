const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'current',
		type: 'string',
	},
	{
		name: 'inUrl',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'urlKey',
		type: 'string',
		default: 'tabs',
	},
	{
		name: 'lazyLoad',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'items',
		type: 'array',
		isRequired: true,
	},
	{
		name: 'renderHorizontalTab',
		type: 'func',
	},
	{
		name: 'renderVerticalTab',
		type: 'func',
	},
	{
		name: 'onTabChange',
		type: 'func',
		description:
			'Fires on componentDidMount, when user changes tab, when current property changes or if Tabs are synced with url and their url key changes.',
	},
	{
		name: 'unmountOnClose',
		type: 'bool',
		default: 'false',
		description: "Closed tabs will be unmounted. If true lazyLoad won't work.",
	},
	{
		name: 'getRef',
		type: 'func',
		description: 'Use this to get reference to this component.',
	},
];

export default props;
