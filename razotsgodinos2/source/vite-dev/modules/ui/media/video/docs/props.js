const props = [
	{
		name: 'src',
		isRequired: true,
		type: 'string',
	},
	{
		name: 'autoPlay',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'provider',
		type: 'string',
		description: 'Video provider: youtube, coub, vimeo, rutube, custom.',
		default: 'custom',
	},
	{
		name: 'style',
		type: 'object',
	},
];

export default props;
