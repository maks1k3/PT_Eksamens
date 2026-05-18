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
		name: 'loading',
		type: 'bool',
		description: 'Show loading spinner.',
		default: 'false',
	},
	{
		name: 'opened',
		type: 'bool',
		description: 'Open/close options.',
		default: 'false',
	},
	{
		name: 'options',
		type: 'array',
		default: '[]',
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
		name: 'optionsUrl',
		type: 'string',
		description: 'Load options from url.',
	},
	{
		name: 'extraData',
		type: 'object',
		default: '{}',
		description: 'Extra data that will be sent to server.',
	},
	{
		name: 'parseOptions',
		type: 'func',
		description: 'Parse server response to extract options.',
	},
	{
		name: 'searchMinInput',
		type: 'number',
		default: '2',
		description: 'Minimum input length to start searching.',
	},
	{
		name: 'searchTimeout',
		type: 'number',
		default: '400',
		description: 'Number of milliseconds to wait for user to stop typing.',
	},
	{
		name: 'termKey',
		type: 'string',
		default: 'term',
		description: 'Search input value will be sent with this key.',
	},
	{
		name: 'autoload',
		type: 'bool',
		default: 'false',
		description: 'Whether to auto-load the default async options set.',
	},
	{
		name: 'onRemoteSearch',
		type: 'func',
		description: 'Custom function for ajax search.',
	},
	{
		name: 'onSearch',
		type: 'func',
		description: 'Custom function for search.',
	},
	{
		name: 'controlled',
		type: 'bool',
		default: 'false',
		description: 'AutoComplete will only update when value property changes.',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'readonly',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'closeOnOutsideClick',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'onChange',
		type: 'func',
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
		name: 'onSelect',
		type: 'func',
		description: 'Overrides default behaviour.',
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
		name: 'onInputKeyDown',
		type: 'func',
	},
	{
		name: 'onInputSubmit',
		type: 'func',
	},
	{
		name: 'onArrowKeyUp',
		type: 'func',
		description: 'Overrides default behaviour.',
	},
	{
		name: 'onArrowKeyDown',
		type: 'func',
		description: 'Overrides default behaviour.',
	},
	{
		name: 'renderOptions',
		type: 'func',
	},
	{
		name: 'renderOption',
		type: 'func',
	},
	{
		name: 'InputProps',
		type: 'object',
		description: 'Properties for search Input component.',
	},
	{
		name: 'DropdownProps',
		type: 'object',
		description: 'Properties for Dropdown component.',
	},
	{
		name: 'showValidationError',
		type: 'bool',
		default: 'false',
		description: 'Apply styles for form validation error.',
	},
];

export default props;
