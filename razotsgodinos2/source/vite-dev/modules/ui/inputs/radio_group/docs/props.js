const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'theme',
		type: 'string: main, primary, success, info, warning, danger, custom',
		default: 'main',
	},
	{
		name: 'controlled',
		type: 'bool',
		default: 'false',
		description: 'Input will only update when value property changes.',
	},
	{
		name: 'value',
		type: 'string',
	},
	{
		name: 'valueId',
		type: 'string',
		description:
			'If Input is not controlled, value have changed but it is same as before use valueId to change value explicitly. This way we can avoid using refs.',
	},
	{
		name: 'options',
		type: 'array',
		isRequired: true,
	},
	{
		name: 'valueKey',
		type: 'string',
		default: 'value',
		description: 'The option property to use for the value.',
	},
	{
		name: 'labelKey',
		type: 'string',
		default: 'label',
		description: 'The option property to use for the label.',
	},
	{
		name: 'onChange',
		type: 'func',
	},
	{
		name: 'onFocus',
		type: 'func',
	},
	{
		name: 'onBlur',
		type: 'func',
	},
	{
		name: 'readonly',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'showValidationError',
		type: 'bool',
		default: 'false',
		description: 'Apply styles for form validation error.',
	},
	{
		name: 'label',
		type: 'string',
	},
	{
		name: 'renderOption',
		type: 'func',
		description: 'Customize option appearance.',
	},
	{
		name: 'renderOptions',
		type: 'func',
		description: "Customize options's position.",
	},
];

export default props;
