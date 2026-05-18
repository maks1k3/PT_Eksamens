const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'name',
		type: 'string',
		isRequired: true,
		description: "Unique name of this form's field.",
	},
	{
		name: 'component',
		type: 'func',
		isRequired: true,
		description: 'Specify input component.',
	},
	{
		name: 'componentProps',
		type: 'object',
		default: '{}',
		description: 'Properties for input component.',
	},
	{
		name: 'label',
		type: 'string',
		description:
			'If label is undefined only input and error text on validation error will be renderd. Use render property for full render customization.',
	},
	{
		name: 'value',
		type: 'string',
		description:
			'Initial value for the input. This value will be used as default value for form reset method if defaultValue is undefined.',
	},
	{
		name: 'defaultValue',
		type: 'string',
		description:
			'Default value for the input that will be used as default value for form reset method. Use value property for initial input value.',
	},
	{
		name: 'disabled',
		type: 'bool',
		description:
			'Disable input. Use this to manually disable/enable specific inputs.',
	},
	{
		name: 'isRequired',
		type: 'bool',
		description: "Input's value shouldn't be empty.",
	},
	{
		name: 'isEmail',
		type: 'bool',
		description: "Input's value should be a valid email address.",
	},
	{
		name: 'isValidUrl',
		type: 'bool',
		description:
			"Input's should be valid url with 'http://' or 'https://' prefix.",
	},
	{
		name: 'isEqualTo',
		type: 'string',
		description: "Input's value should be the same as specified input's value.",
	},
	{
		name: 'mustAccept',
		type: 'bool',
		description: 'Used for Checkbox component if Checkbox must be checked.',
	},
	{
		name: 'min',
		type: 'number',
		description: "Input's value shouldn't be less then specified number chars.",
	},
	{
		name: 'errorMsg',
		type: 'object',
		default: '{}',
		description:
			'Use this for custom error messages for validation properties.',
	},
	{
		name: 'customValidation',
		type: 'func',
		description: 'Add custom validation for current input.',
	},
	{
		name: 'displayType',
		type: 'string: row, column',
		description:
			'Used when label is not undefined. Row: label will render to the left of the input. Column: label will render above input. Overrides default behaviour when "column" is used on mobile devices and "row" on desktops.',
	},
	{
		name: 'labelWidth',
		type: 'string',
		description: 'Specify width of the label.',
	},
	{
		name: 'inputWidth',
		type: 'string',
		description: 'Specify width of the input.',
	},
	{
		name: 'render',
		type: 'func',
		description: 'Customize render of Field component.',
	},
	{
		name: 'onChange',
		type: 'func',
		description: 'Fires when input is changed without delay.',
	},
	{
		name: 'onSubmit',
		type: 'func',
		description: 'Override onSubmit for specific Field.',
	},
];

export default props;
