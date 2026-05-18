const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'src',
		type: 'string',
		isRequired: true,
	},
	{
		name: 'className',
		type: 'string',
	},
	{
		name: 'title',
		type: 'string',
	},
	{
		name: 'alt',
		type: 'string',
	},
	{
		name: 'style',
		type: 'object',
	},
	{
		name: 'center',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'responsive',
		type: 'bool',
		default: 'false',
		description: 'Adds responsive className.',
	},
	{
		name: 'containerWidth',
		type: 'number',
		description:
			'If provided new image width and height will be calculated maintaining aspect ration.',
	},
	{
		name: 'originalWidth',
		type: 'number',
		description: 'Natural image width.',
	},
	{
		name: 'originalHeight',
		type: 'number',
		description: 'Natural image height.',
	},
	{
		name: 'onClick',
		type: 'func',
	},
	{
		name: 'onLoad',
		type: 'func',
		description: 'Fires when image is loaded.',
	},
	{
		name: 'onError',
		type: 'func',
		description: 'Fires if image failed to load.',
	},
	{
		name: 'getDimensions',
		type: 'func',
		description: 'Get naturalWidth and naturalHeight if this image.',
	},
	{
		name: 'noImagePlaceholder',
		type: 'string',
		description: 'Show this placeholder if image failed to load.',
	},
	{
		name: 'lazyLoad',
		type: 'bool',
		default: 'false',
		description: "Image will be loaded when it enters browser's viewport.",
	},
	{
		name: 'lazyLoadOptions',
		type: 'object',
		default: `{
			root: null, //ViewPort
			rootMargin: '0px',
			threshold: 0.3,
		},`,
		description: 'Custom config for IntersectionObserver.',
	},
];

export default props;
