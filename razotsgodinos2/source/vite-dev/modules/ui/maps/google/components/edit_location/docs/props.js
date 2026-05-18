const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'address',
		type: 'string',
		default: '',
	},
	{
		name: 'lat',
		type: 'number',
		default: '56.95096612859509',
	},
	{
		name: 'lng',
		type: 'number',
		default: '24.136962890625',
	},
	{
		name: 'zoom',
		type: 'number',
		default: '7',
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
		name: 'AutoCompleteProps',
		type: 'object',
		description: 'Properties for AutoComplete component.',
	},
	{
		name: 'LocationMapProps',
		type: 'object',
		description: 'Properties for LocationMap component.',
	},
];

export default props;
