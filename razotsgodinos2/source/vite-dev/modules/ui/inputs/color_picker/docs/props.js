const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
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
		name: 'placeholder',
		type: 'string',
	},
	{
		name: 'clearable',
		type: 'bool',
		default: 'false',
		description: 'Allow to clear input.',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'showInput',
		type: 'bool',
		default: 'true',
		description: 'Show input.',
	},
	{
		name: 'InputProps',
		type: 'object',
		description: 'Properties for Input component.',
	},
	{
		name: 'DropdownProps',
		type: 'object',
		description: 'Properties for DropdownProps component.',
	},
	{
		name: 'ChromePickerProps',
		type: 'object',
		description: 'Properties for ChromePicker component.',
	},
	{
		name: 'opened',
		type: 'bool',
		default: 'false',
		description: 'Show/hide ColorPicker.',
	},
	{
		name: 'name',
		type: 'type',
		isRequired: true,
		description: 'description',
		default: '{}',
	},
	{
		name: 'closeOnTab',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'closeOnOutsideClick',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'onOpen',
		type: 'func',
	},
	{
		name: 'onClose',
		type: 'func',
	},
	{
		name: 'onChange',
		type: 'func',
	},
	{
		name: 'showValidationError',
		type: 'bool',
		default: 'false',
		description: 'Apply styles for form validation error.',
	},
];

export default props;
