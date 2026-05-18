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
		name: 'loading',
		type: 'bool',
		default: 'false',
		description: 'Show loading spinner.',
	},
	{
		name: 'opened',
		type: 'bool',
		default: 'false',
		description: 'Open/close menu.',
	},
	{
		name: 'options',
		type: 'array',
		default: '[]',
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
		name: 'async',
		type: 'bool',
		default: 'false',
		description: 'Search for options ont the server.',
	},
	{
		name: 'autoload',
		type: 'bool',
		default: 'false',
		description: 'Whether to auto-load the default async options set.',
	},
	{
		name: 'asyncMinInput',
		type: 'number',
		default: '2',
		description: 'Minimum input length to start searching.',
	},
	{
		name: 'asyncTimeout',
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
		name: 'controlled',
		type: 'bool',
		default: 'false',
		description: 'Select will only update when value property changes.',
	},
	{
		name: 'multi',
		type: 'bool',
		default: 'false',
		description: 'Allow selection of multiple options.',
	},
	{
		name: 'searchable',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'clearable',
		type: 'bool',
		default: 'false',
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
		name: 'closeOnSelect',
		type: 'bool',
	},
	{
		name: 'loadOptions',
		type: 'func',
		description: 'Custom function for options loading.',
	},
	{
		name: 'asyncSearch',
		type: 'func',
		description: 'Custom function for async search.',
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
		name: 'onOpen',
		type: 'func',
	},
	{
		name: 'onClose',
		type: 'func',
	},
	{
		name: 'onValueClick',
		type: 'func',
		description: 'On selected value click.',
	},
	{
		name: 'placeholder',
		type: 'string',
		default: 'Select',
	},
	{
		name: 'clearValueText',
		type: 'string',
		default: 'Clear value',
	},
	{
		name: 'noResultsText',
		type: 'string',
		default: 'No results found',
	},
	{
		name: 'searchPromptText',
		type: 'string',
		default: 'Type to search',
	},
	{
		name: 'loadingPlaceholder',
		type: 'string',
		default: 'Loading...',
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
		description: 'Left icon.',
	},
	{
		name: 'caretUpIcon',
		type: 'object: {provider, name}',
		default: "{provider: 'fa', name: 'caret-up'}",
	},
	{
		name: 'caretDownIcon',
		type: 'object: {provider, name}',
		default: "{provider: 'fa', name: 'caret-down'}",
	},
	{
		name: 'clearIcon',
		type: 'object: {provider, name}',
		default: "{provider: 'icomoon', name: 'cross3'}",
	},
	{
		name: 'renderMenu',
		type: 'func',
		description: 'Render options holder.',
	},
	{
		name: 'renderValue',
		type: 'func',
	},
	{
		name: 'renderMultiValue',
		type: 'func',
	},
	{
		name: 'renderPlaceholder',
		type: 'func',
	},
	{
		name: 'renderClear',
		type: 'func',
	},
	{
		name: 'renderCaret',
		type: 'func',
	},
	{
		name: 'renderOption',
		type: 'func',
	},
	{
		name: 'renderLoading',
		type: 'func',
	},
	{
		name: 'renderLeft',
		type: 'func',
	},
	{
		name: 'renderRight',
		type: 'func',
	},
	{
		name: 'renderSelect',
		type: 'func',
		description: 'Render main select input.',
	},
	{
		name: 'showValidationError',
		type: 'bool',
		default: 'false',
		description: 'Apply styles for form validation error.',
	},
];

export default props;
