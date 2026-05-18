const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'title',
		type: 'string',
		default: 'Add file',
	},
	{
		name: 'theme',
		type: 'string: main, primary, success, info, warning, danger, custom',
		default: 'primary',
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
		default: '{provider: icomoon, name: plus3}',
	},
	{
		name: 'accept',
		type: 'string: image/*,video/*,audio/*',
	},
	{
		name: 'multiple',
		type: 'bool',
		default: 'false',
		description: 'Upload multiple files.',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'ButtonProps',
		type: 'object',
		default: 'Properties for Button component.',
	},
	{
		name: 'renderFiles',
		type: 'func',
	},
	{
		name: 'renderFile',
		type: 'func',
	},
	{
		name: 'showImagePreview',
		type: 'bool',
		default: 'false',
		description:
			'If file is an image then thumbnail of the image will be shown.',
	},
];

export default props;
