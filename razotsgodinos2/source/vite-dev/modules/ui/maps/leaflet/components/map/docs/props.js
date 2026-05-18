const props = [
	{
		name: 'className',
		type: 'string',
	},
	{
		name: 'children',
		type: 'node',
	},
	{
		name: 'id',
		type: 'string',
		description: 'The id of the <div> container for the map.',
	},
	{
		name: 'whenReady',
		type: 'func',
		description: 'A function called as soon as the map is ready.',
	},
	{
		name: 'animate',
		type: 'bool',
		default: 'false',
		description: 'If true, panning will always be animated if possible.',
	},
	{
		name: 'bounds',
		type: 'array',
		description:
			'A rectangle for the map to contain. It will be centered, and the map will zoom in as close as it can while still showing the full bounds.',
	},
	{
		name: 'maxBounds',
		type: 'array',
		description:
			'When this option is set, the map restricts the view to the given geographical bounds, bouncing the user back if the user tries to pan outside the view.',
	},
	{
		name: 'worldCopyJump',
		type: 'bool',
		default: 'false',
		description:
			'With this option enabled, the map tracks when you pan to another "copy" of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible.',
	},
	{
		name: 'minZoom',
		type: 'number',
		description:
			'The minimum zoom level down to which this layer will be displayed (inclusive).',
	},
	{
		name: 'maxZoom',
		type: 'number',
		description:
			'The maximum zoom level up to which this layer will be displayed (inclusive).',
	},
	{
		name: 'noWrap',
		type: 'bool',
		default: 'false',
		description:
			"Whether the layer is wrapped around the antimeridian. If true, the GridLayer will only be displayed once at low zoom levels. Has no effect when the map CRS doesn't wrap around. Can be used in combination with bounds to prevent requesting tiles outside the CRS limits.",
	},
	{
		name: 'zoom',
		type: 'number',
		description: 'Zoom level',
	},
	{
		name: 'center',
		type: 'array or object',
		description: 'Center coordinate.',
	},
	{
		name: 'style',
		type: 'object',
		description: 'Map div styles.',
	},
	{
		name: 'dragging',
		type: 'bool',
		default: 'true',
		description:
			'If true, allows the map to be draggable with mouse/touch or not.',
	},
	{
		name: 'keyboard',
		type: 'bool',
		default: 'true',
		description:
			'If true, allows users to navigate the map with keyboard arrows and +/- keys.',
	},
	{
		name: 'doubleClickZoom',
		type: 'boolean or string',
		default: 'true',
		description:
			"If true, the map can be zoomed in by double clicking on it and zoomed out by double clicking while holding shift. If passed 'center', double-click zoom will zoom to the center of the view regardless of where the mouse was.",
	},
	{
		name: 'scrollWheelZoom',
		type: 'boolean or string',
		default: 'true',
		description:
			"If true or center, allows the map to be zoomed by using the mouse wheel. If passed 'center', it will zoom to the center of the view regardless of where the mouse was.",
	},
	{
		name: 'onClick',
		type: 'func',
		description: 'Fired when the user clicks (or taps) the map.',
	},
	{
		name: 'onResize',
		type: 'func',
		description: 'Fired when the map is resized.',
	},
	{
		name: 'onUnload',
		type: 'func',
		description: 'Fired when the map is destroyed with remove method.',
	},
	{
		name: 'onViewreset',
		type: 'func',
		description:
			'Fired when the map needs to redraw its content (this usually happens on map zoom or load). Very useful for creating custom overlays.',
	},
	{
		name: 'onLoad',
		type: 'func',
		description:
			'Fired when the map is initialized (when its center and zoom are set for the first time).',
	},
	{
		name: 'onMovestart',
		type: 'func',
		description:
			'Fired when the view of the map starts changing (e.g. user starts dragging the map).',
	},
	{
		name: 'onZoom',
		type: 'func',
		description:
			'Fired repeatedly during any change in zoom level, including zoom and fly animations.',
	},
	{
		name: 'onMove',
		type: 'func',
		description:
			'Fired repeatedly during any movement of the map, including pan and fly animations.',
	},
	{
		name: 'onZoomend',
		type: 'func',
		description: 'Fired when the map has changed, after any animations.',
	},
	{
		name: 'onMoveend',
		type: 'func',
		description:
			'Fired when the center of the map stops changing (e.g. user stopped dragging the map).',
	},
];

export default props;
