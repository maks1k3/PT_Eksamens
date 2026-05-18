const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'message',
		type: 'string',
		description: 'Message for before unload dialog.',
		default: "Are you sure you don't want to wait?",
	},
	{
		name: 'title',
		type: 'string',
		description: 'Text above progress bar.',
		default: 'Loading...',
	},
	{
		name: 'ProgressBarProps',
		type: 'object',
		description: 'Properties for ProgressBar component.',
		default: '{}',
	},
];

export default props;
