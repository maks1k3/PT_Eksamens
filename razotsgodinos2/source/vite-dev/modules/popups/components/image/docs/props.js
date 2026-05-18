const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'PopupProps',
		type: 'object',
		description: 'Properties for Popup component.',
		default: '{}',
	},
	{
		name: 'showTitle',
		type: 'bool',
		description: 'Show image title.',
		default: 'true',
	},
	{
		name: 'showNumbers',
		type: 'bool',
		description: 'Show number of images.',
		default: 'true',
	},
	{
		name: 'items',
		type: 'array',
		description: 'Images.',
		default: '[]',
	},
	{
		name: 'current',
		type: 'number',
		description: 'Index of current image.',
		default: '0',
	},
	{
		name: 'onGalleryFinish',
		type: 'string or function',
		description:
			"'loop','close' or function({ImagePopup}){ ImagePopup.close()}",
		default: 'loop',
	},
];

export default props;
