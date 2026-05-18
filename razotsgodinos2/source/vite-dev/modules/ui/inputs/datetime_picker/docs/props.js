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
			'If DateTimePicker is not controlled, value have changed but it is same as before use valueId to change value explicitly. This way we can avoid using refs.',
	},
	{
		name: 'placeholder',
		type: 'string',
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
		name: 'dateFormat',
		type: 'string or bool',
		default: 'YYYY-MM-DD',
		description: 'Date format. If false only timeFormat will be used.',
	},
	{
		name: 'timeFormat',
		type: 'string or bool',
		default: 'HH:mm:ss',
		description: 'Time format. If false only dateFormat will be used.',
	},
	{
		name: 'isValidDate',
		type: 'func',
		description:
			'It is possible to disable dates in the calendar if the user are not allowed to select them, e.g. dates in the past. This is done using the prop isValidDate, which admits a function in the form function(currentDate, selectedDate) where both arguments are moment objects. The function shall return true for selectable dates, and false for disabled ones.',
	},
	{
		name: 'opened',
		type: 'bool',
		default: 'false',
		description: 'Show/hide calendar.',
	},
	{
		name: 'viewMode',
		type: 'string: years, months, days, time',
		default: 'days',
	},
	// {
	// 	name: 'closeOnSelect',
	// 	type: 'bool',
	// 	default: 'false',
	// },
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
		name: 'timeConstraints',
		type: 'object',
		default: '{}',
		description:
			"Add some constraints to the timepicker. It accepts an object with the format { hours: { min: 9, max: 15, step: 2 }}, this example means the hours can't be lower than 9 and higher than 15, and it will change adding or subtracting 2 hours everytime the buttons are clicked. The constraints can be added to the hours, minutes, seconds and milliseconds.",
	},
	{
		name: 'renderDay',
		type: 'func',
	},
	{
		name: 'renderMonth',
		type: 'func',
	},
	{
		name: 'renderYear',
		type: 'func',
	},
	{
		name: 'renderYears',
		type: 'func',
	},
	{
		name: 'renderMonths',
		type: 'func',
	},
	{
		name: 'renderDays',
		type: 'func',
	},
	{
		name: 'renderTime',
		type: 'func',
	},
	{
		name: 'utc',
		type: 'bool',
		default: 'false',
		description:
			"When true, input time values will be interpreted as UTC (Zulu time) by Moment.js. Otherwise they will default to the user's local timezone.",
	},
	{
		name: 'locale',
		type: 'string',
		default: 'en',
	},
	{
		name: 'strictParsing',
		type: 'bool',
		default: 'true',
		description:
			"Whether to use Moment.js's strict parsing when parsing input.",
	},
	{
		name: 'icon',
		type: 'object: {provider, name}',
		description: 'Icon that will be shown left.',
	},
	{
		name: 'onOpen',
		type: 'func',
	},
	{
		name: 'onBlur',
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
		name: 'onViewModeChange',
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
