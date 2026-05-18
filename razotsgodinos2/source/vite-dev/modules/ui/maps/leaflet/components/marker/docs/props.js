const props = [
	{
		name: 'position',
		type: 'array or object',
		isRequired: true,
	},
	{
		name: 'draggable',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'icon',
		type: 'object',
		description: 'Can be used for custom icons.',
	},
	{
		name: 'zIndexOffset',
		type: 'number',
		description:
			'By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like 1000 (or high negative value, respectively).',
	},
	{
		name: 'opacity',
		type: 'number',
		default: '1',
	},
	{
		name: 'title',
		type: 'string',
		default: '',
		description:
			'Text for the browser tooltip that appear on marker hover (no tooltip by default).',
	},
	{
		name: 'riseOnHover',
		type: 'bool',
		default: 'false',
		description:
			'If true, the marker will get on top of others when you hover the mouse over it.',
	},
	{
		name: 'onDragend',
		type: 'func',
		description: 'Fired when the user stops dragging the marker.',
	},
	{
		name: 'onDragstart',
		type: 'func',
		description: 'Fired when the user starts dragging the marker.',
	},
	{
		name: 'onMovestart',
		type: 'func',
		description: 'Fired when the marker starts moving (because of dragging).',
	},
	{
		name: 'onDrag',
		type: 'func',
		description: 'Fired repeatedly while the user drags the marker.',
	},
];

export default props;
