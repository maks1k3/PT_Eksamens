const props = [
	{
		name: 'level',
		type: 'number',
		default: '15',
		description: 'Level of this popup. Popups can apper one above another.',
	},
	{
		name: 'verticalAlign',
		type: 'string: top, middle, bottom',
		default: 'top',
		description: "Position of popup's content.",
	},

	{
		name: 'maxWidth',
		type: 'string',
		default: '600px',
		description: "Maximum width of popup's content.",
	},
	{
		name: 'openAnimation',
		type: 'string',
		default: '',
		description: 'CSS class name for keyframes animation.',
	},
	{
		name: 'closeAnimation',
		type: 'string',
		default: '',
		description: 'CSS class name for keyframes animation.',
	},
	{
		name: 'PopupProps',
		type: 'object',
		default: '{}',
		description: 'Specify other props for popup component.',
	},
	{
		name: 'ContentProps',
		type: 'object',
		default: '{}',
		description: 'Specify other props for content component.',
	},
];

export default props;
