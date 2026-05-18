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
		name: 'width',
		type: 'string',
	},
	{
		name: 'height',
		type: 'string',
	},
	{
		name: 'className',
		type: 'string',
	},
	{
		name: 'style',
		type: 'object',
	},
	{
		name: 'onClick',
		type: 'bool',
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
	{
		name: 'showPlayIcon',
		type: 'bool',
		default: 'false',
		description: 'Standard video play icon.',
	},
	{
		name: 'title',
		type: 'string',
		description: 'Html title attribute',
	},
];

export default props;
