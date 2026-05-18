const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'style',
		type: 'object',
		description: 'Styles for wrapper div.',
	},
	{
		name: 'inputStyle',
		type: 'object',
		description: 'Styles for HTML <input/> tag',
	},
	{
		name: 'type',
		type: 'string',
		description: 'HTML input type.',
	},
	{
		name: 'placeholder',
		type: 'string',
	},
	{
		name: 'showStyledPlaceholder',
		type: 'bool',
		default: 'false',
		description: 'Apply styles for placeholder.',
	},
	{
		name: 'showValidationError',
		type: 'bool',
		default: 'false',
		description: 'Apply styles for form validation error.',
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
		description: 'Icon that will be shown left.',
	},
	{
		name: 'clearable',
		type: 'bool',
		default: 'false',
		description: 'Allow to clear input.',
	},
	{
		name: 'clearIcon',
		type: 'object: {provider, name}',
		description: 'Custom clear icon.',
		default: "{provider: 'icomoon', name: 'cross3'}",
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
		name: 'onSubmit',
		type: 'func',
		description: 'On enter press.',
	},
	{
		name: 'onSearch',
		type: 'func',
		description: 'Fires when user stopped typing.',
	},
	{
		name: 'searchTimeout',
		type: 'number',
		default: '400',
		description: 'Number of milliseconds to wait for user to stop typing.',
	},
	{
		name: 'onKeyUp',
		type: 'func',
	},
	{
		name: 'onKeyDown',
		type: 'func',
	},
	{
		name: 'onKeyPress',
		type: 'func',
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
		name: 'onCopy',
		type: 'func',
	},
	{
		name: 'onCut',
		type: 'func',
	},
	{
		name: 'onPaste',
		type: 'func',
	},
	{
		name: 'onClear',
		type: 'func',
		description: 'Custom callback for clear icon click.',
	},
	{
		name: 'autoFocus',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'autoSelect',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'readonly',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'invisible',
		type: 'bool',
		default: 'false',
		description: 'No borders and transparent background.',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'loading',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'customFormat',
		type: 'func',
		description: 'Callback function to format input value.',
	},
	{
		name: 'max',
		type: 'number',
		description: 'Max number of chars.',
	},
	{
		name: 'number',
		type: 'object: {allowNegative, allowDecimal}',
		description:
			'Allow only numbers. With optional minus sign and decimal part.',
	},
	{
		name: 'autoComplete',
		type: 'string: on, off',
		description: "Disable browser's autocomplete.",
	},
	{
		name: 'renderLeft',
		type: 'func',
		description: 'Render content in left part of the input.',
	},
	{
		name: 'renderRight',
		type: 'func',
		description: 'Render content in right part of the input.',
	},
];

export default props;
