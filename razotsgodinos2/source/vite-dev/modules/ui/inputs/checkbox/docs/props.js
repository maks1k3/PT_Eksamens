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
		name: 'renderTick',
		type: 'func',
		description: 'Render custom checkbox tick.',
	},
	{
		name: 'renderLabel',
		type: 'func',
		description: 'Render label.',
	},
	{
		name: 'render',
		type: 'func',
		description: 'Custom render function.',
	},
];

export default props;
