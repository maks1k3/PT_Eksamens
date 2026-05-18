const props = [
	{
		name: 'attribution',
		type: 'string',
		description:
			'String to be shown in the attribution control, describes the layer data, e.g. "© Mapbox".',
	},
	{
		name: 'url',
		type: 'string',
		isRequired: true,
		description: 'Source of map tiles.',
	},
	{
		name: 'zIndex',
		type: 'number',
	},
];

export default props;
