const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'pageMode',
		type: 'bool',
		default: 'true',
		description: 'If true slides are grouped in pages.',
	},
	{
		name: 'centerMode',
		type: 'bool',
		default: 'false',
		description: 'Higlight and center current slide.',
	},
	{
		name: 'items',
		type: 'array',
		default: '[]',
	},
	{
		name: 'getGridProps',
		type: 'func',
		description: 'Function that must return minWidth and gutter.',
		default: '{ minWidth: 200, gutter: 10 }',
	},
	{
		name: 'current',
		type: 'number',
		default: '0',
		description: 'Current item or page if multiple.',
	},
	{
		name: 'multiple',
		type: 'bool',
		default: 'false',
		description:
			'Show multiple items. Use getGridProps to specify minWidth and gutter.',
	},
	{
		name: 'preventAutoPlayFromStopping',
		type: 'bool',
		default: 'false',
		description: 'Do not stop autoplay on mouseenter and touchstart.',
	},
	{
		name: 'draggable',
		type: 'bool',
		default: 'false',
		description: 'Drag with mouse.',
	},
	{
		name: 'dragTershold',
		type: 'number',
		default: '20',
		description: 'Number of px to ignore when swiping or dragging.',
	},
	{
		name: 'swipeable',
		type: 'bool',
		default: 'true',
		description: 'Swipe with fingers.',
	},
	{
		name: 'changeOnMouseWheel',
		type: 'bool',
		default: 'false',
		description: 'Change items when mouse wheel is scrolled.',
	},
	{
		name: 'infinite',
		type: 'bool',
		default: 'false',
		description: 'Loop Carousel.',
	},
	{
		name: 'autoplay',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'autoplaySpeed',
		type: 'number',
		default: '10000 - 10 seconds',
	},
	{
		name: 'autoplayCooldown',
		type: 'number',
		default: '20000 - 20 seconds',
		description:
			'Number of miliseconds to wait if user iteracts with Carousel.',
	},
	{
		name: 'fade',
		type: 'bool',
		default: 'false',
	},
	// {
	// 	name: 'changeCurrentOnArrowClick',
	// 	type: 'bool',
	// 	default: 'true',
	// 	description: 'On arow click scroll to next item instead of next page.',
	// },
	{
		name: 'transitionDuration',
		type: 'number',
		default: '500',
	},
	{
		name: 'transitionEasing',
		type: 'string: ease, ease-in, ease-out, linear',
		default: 'ease',
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
		name: 'showDots',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'renderDot',
		type: 'func',
	},
	{
		name: 'render',
		type: 'func',
	},
	{
		name: 'onCurrentChange',
		type: 'func',
	},
	{
		name: 'onOffsetChange',
		type: 'func',
	},
	{
		name: 'getRef',
		type: 'func',
		description: 'Use this to get reference to this component.',
	},
];

export default props;
