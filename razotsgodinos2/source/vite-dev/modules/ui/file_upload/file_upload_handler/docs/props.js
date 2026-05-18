const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'name',
		type: 'string',
		default: 'file',
		description: 'File input name.',
	},
	{
		name: 'action',
		type: 'string',
		description: 'File upload url.',
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
		name: 'autoUpload',
		type: 'bool',
		description: 'Automatically upload files after user adde them.',
		default: 'true',
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
		description: 'fires when file upload failed.',
	},
	{
		name: 'children',
		type: 'node',
	},
];

export default props;
