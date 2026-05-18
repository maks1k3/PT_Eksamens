const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
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
		description: 'TextArea will only update when value property changes.',
	},
	{
		name: 'value',
		type: 'string',
	},
	{
		name: 'valueId',
		type: 'string',
		description:
			'If TextArea is not controlled, value have changed but it is same as before use valueId to change value explicitly. This way we can avoid using refs.',
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
		name: 'autoSize',
		type: 'bool',
		default: 'true',
		description: 'TextArea height will change if text length changes.',
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
		name: 'maxChars',
		type: 'number',
		description: 'Max number of chars.',
	},
	{
		name: 'showCharsLimit',
		type: 'bool',
		default: 'false',
		description: 'Show how many characters left.',
	},
	{
		name: 'showCharsLimitWhenLeft',
		type: 'number',
		description: 'Show characters limit when {number} chars left.',
	},
];

export default props;
