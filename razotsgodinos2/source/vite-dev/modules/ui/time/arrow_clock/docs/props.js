const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'time',
		type: 'object',
		description: 'moment.js time instance',
		isRequired: true,
	},
	{
		name: 'live',
		type: 'bool',
		default: 'true',
		description: 'If true time will update every second.',
	},
	{
		name: 'color',
		type: 'string',
		default: '#000',
		description: 'Color of the clock.',
	},
	{
		name: 'size',
		type: 'number',
		default: '100',
		description: 'Size of the clock in px.',
	},
	{
		name: 'showSeconds',
		type: 'bool',
		default: 'true',
		description: 'Show seconds arrow.',
	},
];

export default props;
