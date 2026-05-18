const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'percent',
		type: 'number',
		default: '100',
	},
	{
		name: 'animate',
		type: 'bool',
		description: 'Show animation.',
		default: 'true',
	},
	{
		name: 'showPercent',
		type: 'bool',
		description: 'Show percentage.',
		default: 'false',
	},
	{
		name: 'label',
		type: 'string',
		description: 'Text on progress bar.',
	},
	{
		name: 'theme',
		type: 'string: main, primary, success, info, warning, danger, custom',
		default: 'primary',
	},
];

export default props;
