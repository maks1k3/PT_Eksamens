const props = [
	{
		name: 'action',
		type: 'string',
		description:
			'Url to api method. Adds "_g.getMainUrl() + \'api/\'" prefix by default.',
	},
	{
		name: 'name',
		type: 'string',
		description:
			"Unique name of this form. If not undefined saves form inputs' data to Redux. Updates inputs' values from Redux on componentDidMount. Can be used when Form or Field components can be unmounted beacuse of different render for desktop and mobile. Because all data entered by user will be lost during unmount.",
	},
	{
		name: 'refresh',
		type: 'bool',
		default: 'false',
		description: 'Reset form after submit.',
	},
	{
		name: 'autoSubmit',
		type: 'bool',
		default: 'false',
		description:
			'Submit form on every input change. Can be used for small administration forms with Select, RadioGroup or Checkbox component. Input and Textarea will be blocked after user stopped typing. Use onChange prop if you need to autosave all form inputs.',
	},
	{
		name: 'extraData',
		type: 'object',
		default: '{}',
		description: 'Extra data that will be sent to server.',
	},
	{
		name: 'submit',
		type: 'object',
		description:
			"Properties for Button component. If undefined submit button won't be rendered.",
	},
	{
		name: 'submitPosition',
		type: 'string: left, right, center',
		default: 'right',
		description: 'Position of the submit button.',
	},
	{
		name: 'renderSubmit',
		type: 'func',
		description:
			'Customize submit button that will be rendered below the form. Use FormSubmitButton as separate component if you need to place submit button somewhere else.',
	},
	{
		name: 'showSuccess',
		type: 'bool',
		default: 'true',
		description: 'Show success response from server.',
	},
	{
		name: 'showError',
		type: 'bool',
		default: 'true',
		description: 'Show error response from server.',
	},
	{
		name: 'showResponse',
		type: 'bool',
		default: 'true',
		description:
			"Show response from server. If false both error and success responses won't be shown.",
	},
	{
		name: 'confirmation',
		type:
			'object: {title, text, theme, confirm, cancel, onConfirm, onCancel, classNames, settings}',
		description:
			'If not undefined ConfirmationPopup will be shown before form is submitted.',
	},
	{
		name: 'preventSubmitEvent',
		type: 'bool',
		default: 'false',
		description:
			"If true form won't be submitted on Input submit event. (Enter press)",
	},
	{
		name: 'onRemoteRequest',
		type: 'func',
		description: 'Override default remoteRequest functionality.',
	},
	{
		name: 'onSubmit',
		type: 'func',
		description: 'Do something after form is submitted.',
	},
	{
		name: 'onProcess',
		type: 'func',
		description:
			"Can be used to lock form and do some async operations with form's inputs data.",
	},
	{
		name: 'onValidate',
		type: 'func',
		description:
			'Perform some extra validation after all main validations are done.',
	},
	{
		name: 'onValidationFailed',
		type: 'func',
		description: 'Fires when any field validation fails.',
	},
	{
		name: 'onChange',
		type: 'func',
		description: 'Fires when any form input is changed.',
	},
	{
		name: 'searchTimeout',
		type: 'number',
		default: '400',
		description: 'Number of milliseconds to wait for user to stop typing.',
	},
	{
		name: 'onBeforeSubmit',
		type: 'func',
		description:
			'Here you can do some manipulations with data before form will be submitted.',
	},
	{
		name: 'onSuccess',
		type: 'func',
		description: 'Fires on success response from server.',
	},
	{
		name: 'onError',
		type: 'func',
		description: 'Fires on error response from server.',
	},
	{
		name: 'onFail',
		type: 'func',
		description:
			'Fires when server returned incorrect json. For example when error occurred on server.',
	},
	{
		name: 'debounce',
		type: 'bool',
		default: 'true',
		description:
			"If false onChange will fire without debounce. (Input and TextArea won't wait until user stops typing.)",
	},
	{
		name: 'FieldProps',
		type: 'object',
		description:
			"Properties for every Field component inside this form. If some Field has properties listed in FieldProps then Field's properties will be used instead of FieldProps.",
	},
	{
		name: 'children',
		type: 'node',
	},
];

export default props;
