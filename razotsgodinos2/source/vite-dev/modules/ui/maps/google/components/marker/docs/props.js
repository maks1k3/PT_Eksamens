const props = [
	{
		name: 'position',
		type: 'object',
	},
	{
		name: 'icon',
		type: 'string',
		description: 'Url to custom marker image.',
	},
	{
		name: 'draggable',
		type: 'bool',
	},
	{
		name: 'label',
		type: 'string',
	},
	{
		name: 'onClick',
		type: 'func',
	},
	{
		name: 'onMouseOver',
		type: 'func',
	},
	{
		name: 'onRecenter',
		type: 'func',
	},
	{
		name: 'onDragend',
		type: 'func',
	},
];

export default props;
