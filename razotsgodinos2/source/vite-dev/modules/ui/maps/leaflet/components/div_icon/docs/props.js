const props = [
	{
		name: 'children',
		type: 'node',
	},
	{
		name: 'position',
		type: 'array or object',
		isRequired: true,
		description: 'Position for Marker.',
	},
	{
		name: 'MarkerProps',
		type: 'object',
		description: 'Other Marker component props.',
	},
	{
		name: 'iconSize',
		type: 'array or object',
	},
	{
		name: 'iconAnchor',
		type: 'array or object',
	},
];

export default props;
