const props = [
	{
		name: 'timeZone',
		type: 'string',
		default: 'Europe/Riga',
		description: 'Valid timezone.',
	},
	{
		name: 'format',
		type: 'string',
		default: 'HH:mm:ss',
	},
	{
		name: 'live',
		type: 'bool',
		description: 'If true time will update every second.',
		default: 'true',
	},
];

export default props;
