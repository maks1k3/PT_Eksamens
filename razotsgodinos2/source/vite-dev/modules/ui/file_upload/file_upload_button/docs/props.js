const props = [
	{
		name: 'action',
		type: 'string',
		description: 'File upload url.',
	},
	{
		name: 'name',
		type: 'string',
		description: '	File input name.',
		default: 'file',
	},
	{
		name: 'extraData',
		type: 'object',
		description: 'Additional data that will be sent to server.',
		default: '{}',
	},
	{
		name: 'multiple',
		type: 'bool',
		description: 'Upload multiple files.',
		default: 'false',
	},
	{
		name: 'accept',
		type: 'string: image/*,video/*,audio/*',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'customUpload',
		type: 'func',
		description: 'Custom upload function.',
	},
	{
		name: 'onUploadStarted',
		type: 'func',
	},
	{
		name: 'onUploadFinished',
		type: 'func',
	},
	{
		name: 'onUploadProgress',
		type: 'func',
	},
	{
		name: 'onChange',
		type: 'func',
		description: 'Get files on change.',
	},
	{
		name: 'onSuccess',
		type: 'func',
		description: 'Fires when server returned {response:}.',
	},
	{
		name: 'onError',
		type: 'func',
		description: 'Fires when server returned {error:}.',
	},
	{
		name: 'onFail',
		type: 'func',
		description: 'Fires when file upload failed.',
	},
	{
		name: 'title',
		type: 'string',
		description: "Button's title.",
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
		description: "Button's title.",
	},
	{
		name: 'ButtonProps',
		type: 'object',
		description: 'Properties for Button component.',
	},
	{
		name: 'ProgressBarProps',
		type: 'object',
		description: 'Properties for ProgressBar component.',
	},
	{
		name: 'renderButton',
		type: 'func',
	},
	{
		name: 'renderUploadProgress',
		type: 'func',
	},
];

export default props;
