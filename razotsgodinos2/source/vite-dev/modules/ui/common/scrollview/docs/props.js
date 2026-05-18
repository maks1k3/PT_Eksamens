const props = [
	{
		name: 'children',
		type: 'node',
	},
	{
		name: 'isolated',
		type: 'bool',
		default: 'false',
		description: 'Make ScrollView scrolling isolated from window scrolling.',
	},
	{
		name: 'autoHide',
		type: 'bool',
		default: 'false',
		description: 'Hide scrollbars when not scolling.',
	},
	{
		name: 'autoHeight',
		type: 'bool',
		default: 'false',
		description: 'Take all available height.',
	},
	{
		name: 'onScroll',
		type: 'func',
	},
	{
		name: 'onScrolledToBottom',
		type: 'func',
	},
	{
		name: 'onScrolledToTop',
		type: 'func',
	},
	{
		name: 'height',
		type: 'number',
	},
	{
		name: 'width',
		type: 'number',
	},
	{
		name: 'renderThumbVertical',
		type: 'func',
	},
	{
		name: 'renderThumbHorizontal',
		type: 'func',
	},
];

export default props;
