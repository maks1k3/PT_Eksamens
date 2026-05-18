const props = [
	{
		name: 'lat',
		type: 'number',
		default: '0',
	},
	{
		name: 'lng',
		type: 'number',
		default: '0',
	},
	{
		name: 'zoom',
		type: 'number',
		default: '14',
	},
	{
		name: 'onLocationChanged',
		type: 'func',
	},
	{
		name: 'onZoomChanged',
		type: 'func',
	},
	{
		name: 'MarkerProps',
		type: 'object',
		description: 'Properties for Marker component.',
	},
	{
		name: 'MapProps',
		type: 'object',
		description: 'Properties for Map component.',
	},
];

export default props;
