const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'title',
		type: 'string',
		default: 'Confirm action',
		description: "Popup header's title.",
	},
	{
		name: 'text',
		type: 'node',
		default: 'Are you sure?',
		description: "Popup's content text.",
	},
	{
		name: 'confirm',
		type: 'string',
		default: 'Confirm',
		description: 'Confirm button title.',
	},
	{
		name: 'cancel',
		type: 'string',
		default: 'Cancel',
		description: 'Cancel button title.',
	},
	{
		name: 'onConfirm',
		type: 'func',
		description: 'Fires when user clicks confirm button.',
	},
	{
		name: 'onCancel',
		type: 'func',
		description: 'Fires when user clicks cancel button or closes popup.',
	},
];

export default props;
