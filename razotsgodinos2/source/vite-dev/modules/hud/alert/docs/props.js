const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'theme',
		type: 'string: main, primary, success, info, warning, danger, custom',
		default: 'danger',
	},
	{
		name: 'content',
		type: 'node',
		default: '',
	},
	{
		name: 'AlertBoxProps',
		type: 'object',
		description: 'AlertBox component properties.',
		default: '{}',
	},
];

export default props;
