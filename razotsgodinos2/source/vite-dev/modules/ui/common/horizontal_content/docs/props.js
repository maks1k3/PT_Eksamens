const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'height',
		type: 'string',
	},
	{
		name: 'draggable',
		type: 'bool',
		default: 'false',
		description: 'Drag with mouse.',
	},
	{
		name: 'swipeable',
		type: 'bool',
		default: 'true',
		description: 'Swipe with fingers.',
	},
	{
		name: 'scrollOnMouseWheel',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'mouseWheelScrollDistance',
		type: 'number',
		default: '50',
	},
	{
		name: 'items',
		type: 'array',
		default: '[]',
	},
	{
		name: 'renderItem',
		type: 'func',
		isRequired: true,
	},
	{
		name: 'showArrows',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'renderArrow',
		type: 'func',
	},
	{
		name: 'arrowClickScrollDistance',
		type: 'number',
		default: '200',
	},
	{
		name: 'arrowClickScrollDuration',
		type: 'number',
		default: '500',
	},
	{
		name: 'render',
		type: 'func',
	},
	{
		name: 'onOffsetChange',
		type: 'func',
	},
	{
		name: 'initialOffset',
		type: 'number',
	},
	{
		name: 'getRef',
		type: 'func',
		description: 'Use this to get reference to this component.',
	},
];

export default props;
