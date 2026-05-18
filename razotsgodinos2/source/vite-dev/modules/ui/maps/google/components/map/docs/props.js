const props = [
	{
		name: 'showLoader',
		type: 'bool',
		default: 'true',
		description: 'Show Loader while google maps is loading.',
	},
	{
		name: 'className',
		type: 'string',
		description: 'Map wrapper className.',
	},
	{
		name: 'style',
		type: 'object',
		description: 'Map wrapper style.',
	},
	{
		name: 'apiKey',
		type: 'string',
		description: 'Custom api key',
		default: 'Api key from configuration',
	},
	{
		name: 'lang',
		type: 'string',
	},
	{
		name: 'libraries',
		type: 'array',
		description: 'Libraries for Google Maps.',
		default: "['places', 'visualization']",
	},
	{
		name: 'version',
		type: 'string',
		default: '3',
	},
	{
		name: 'zoom',
		type: 'number',
		default: '14',
	},
	{
		name: 'initialCenter',
		type: 'object:{lat, lng}',
		default: '{lat: 56.5515474,lng: 21.0388763,}',
		description: 'Center Map to this location onDidMount.',
	},
	{
		name: 'center',
		type: 'object:{lat, lng}',
		description: 'Center Map to this location on every render.',
	},
	{
		name: 'centerAroundCurrentLocation',
		type: 'bool',
		default: 'false',
		description: "Center Map to user's location.",
	},
	{
		name: 'mapType',
		type: 'string: roadmap, satellite, hybrid, terrain',
		default: 'roadmap',
	},
	{
		name: 'maxZoom',
		type: 'number',
	},
	{
		name: 'minZoom',
		type: 'number',
	},
	{
		name: 'clickableIcons',
		type: 'bool',
	},
	{
		name: 'disableDefaultUI',
		type: 'bool',
	},
	{
		name: 'zoomControl',
		type: 'bool',
	},
	{
		name: 'mapTypeControl',
		type: 'bool',
	},
	{
		name: 'scaleControl',
		type: 'bool',
	},
	{
		name: 'streetViewControl',
		type: 'bool',
	},
	{
		name: 'panControl',
		type: 'bool',
	},
	{
		name: 'rotateControl',
		type: 'bool',
	},
	{
		name: 'scrollwheel',
		type: 'bool',
	},
	{
		name: 'draggable',
		type: 'bool',
	},
	{
		name: 'keyboardShortcuts',
		type: 'bool',
	},
	{
		name: 'disableDoubleClickZoom',
		type: 'bool',
	},
	{
		name: 'noClear',
		type: 'bool',
		description: 'If true, do not clear the contents of the Map div.',
	},
	{
		name: 'styles',
		type: 'array',
	},
	{
		name: 'gestureHandling',
		type: 'string: cooperative, greedy, none, auto',
		default: 'auto',
	},
	{
		name: 'children',
		type: 'node',
	},
	{
		name: 'onReady',
		type: 'func',
	},
	{
		name: 'onClick',
		type: 'func',
	},
	{
		name: 'onDragend',
		type: 'func',
	},
	{
		name: 'onRecenter',
		type: 'func',
	},
	{
		name: 'onBoundsChanged',
		type: 'func',
	},
	{
		name: 'onCenterChanged',
		type: 'func',
	},
	{
		name: 'onDblclick',
		type: 'func',
	},
	{
		name: 'onDragstart',
		type: 'func',
	},
	{
		name: 'onHeadingChange',
		type: 'func',
	},
	{
		name: 'onIdle',
		type: 'func',
	},
	{
		name: 'onMaptypeidChanged',
		type: 'func',
	},
	{
		name: 'onMousemove',
		type: 'func',
	},
	{
		name: 'onMouseout',
		type: 'func',
	},
	{
		name: 'onMouseover',
		type: 'func',
	},
	{
		name: 'onProjectionChanged',
		type: 'func',
	},
	{
		name: 'onResize',
		type: 'func',
	},
	{
		name: 'onRightclick',
		type: 'func',
	},
	{
		name: 'onTilesloaded',
		type: 'func',
	},
	{
		name: 'onTiltChanged',
		type: 'func',
	},
	{
		name: 'onZoomChanged',
		type: 'func',
	},
];

export default props;
