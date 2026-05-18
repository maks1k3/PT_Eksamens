const props = [
	{
		name: 'eventTime',
		type: 'number',
		description: 'Event time in unix timestamp from server.',
		isRequired: true,
	},
	{
		name: 'currentTime',
		type: 'number',
		description: 'Current time in unix timestamp from server.',
		isRequired: true,
	},
	{
		name: 'onFinish',
		type: 'func',
		description: 'Callback that will fire when countdown finishes.',
	},
	{
		name: 'render',
		type: 'func',
		isRequired: true,
		description: 'Renders countdown',
	},
	{
		name: 'translations',
		type: 'object',
		description:
			'Translations for years, months, weeks, days, hours, minutes seconds.',
		default: 'Has default translations for en, lv and ru.',
	},
	{
		name: 'speed',
		type: 'number',
		description: 'Countdown speed in milliseconds.',
		default: '1000',
	},
];

export default props;
