const props = [
	{
		name: 'items',
		type: 'array',
		description: 'Videos.',
		default: '[]',
	},
	{
		name: 'current',
		type: 'number',
		description: 'Index of current video.',
		default: '0',
	},
	{
		name: 'PopupProps',
		type: 'object',
		description: 'Properties for Popup component.',
		default: '{}',
	},
	{
		name: 'hideOnOverlayClick',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'autoPlay',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'onGalleryFinish',
		type: 'string or function',
		description:
			"'loop','close' or function({VideoPopup}){ VideoPopup.close()}",
		default: 'loop',
	},
];

export default props;
