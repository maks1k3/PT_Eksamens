const props = [
	{
		name: 'provider',
		type: 'string',
		isRequired: true,
		description: 'mdi, ion, icomoon, glyphicon, foundation, fa',
	},
	{
		name: 'name',
		type: 'string',
		isRequired: true,
		description: 'Icon name',
	},
	{
		name: 'className',
		type: 'string',
	},
	{
		name: 'onClick',
		type: 'function',
	},
	{
		name: 'style',
		type: 'object',
	},
	{
		name: 'title',
		type: 'string',
		description: 'Html title attribute',
	},
];

export default props;
