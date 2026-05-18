const props = [
	{
		name: 'action',
		type: 'string',
		default: '{}',
	},
	{
		name: 'extraData',
		type: 'object',
		description: 'Extra data that will be sent to server.',
	},
	{
		name: 'onProcess',
		type: 'func',
		description:
			'Do something with form data after submit while form is locked.',
	},
	{
		name: 'title',
		type: 'string',
		default: 'Delete',
		description: 'Button title.',
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
		default: '{ provider: icomoon, name: trash}',
		description: 'Button icon.',
	},
	{
		name: 'confirmationTitle',
		type: 'string',
		default: 'Confirm action',
		description: "Confirmation popup's title.",
	},
	{
		name: 'confirmationText',
		type: 'string',
		default: 'Are you sure you want to delete this?',
		description: "Confirmation popup's text.",
	},
	{
		name: 'confirmationTheme',
		type: 'string',
		default: 'danger',
		description: "Confirmation popup's theme.",
	},
	{
		name: 'confirmationConfirm',
		type: 'string',
		default: 'Confirm',
		description: "Confirmation popup's confirm button text.",
	},
	{
		name: 'confirmationCancel',
		type: 'string',
		default: 'Cancel',
		description: "Confirmation popup's cancel button text.",
	},
	{
		name: 'onSuccess',
		type: 'func',
		description: 'On successful deletion callback.',
	},
	{
		name: 'onError',
		type: 'func',
		description: 'On deletion failed callback.',
	},
	{
		name: 'FormProps',
		type: 'object',
		description:
			'Form component props. DeleteButton uses Form component under the hood.',
	},
];

export default props;
