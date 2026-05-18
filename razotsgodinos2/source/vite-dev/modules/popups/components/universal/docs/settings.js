const props = [
	{
		name: 'useOverlayPopup',
		type: 'bool',
		default: 'false',
		description: 'If true popup will take entire screen.',
	},
	{
		name: 'level',
		type: 'number',
		default: '0',
		description: 'Level of this popup. Popups can apper one above another.',
	},
	{
		name: 'verticalAlign',
		type: 'string: top, middle, bottom',
		default: 'top',
		description: "Position of popup's content.",
	},
	{
		name: 'hideOnOverlayClick',
		type: 'bool',
		default: 'true',
		description:
			'Hide popup on overaly click. Should be false for popups where user enters a lot of data. Beacuse he can accidentally close popup.',
	},
	{
		name: 'showCloseControl',
		type: 'bool',
		default: 'false',
		description: 'Show close icon above popup.',
	},
	{
		name: 'maxWidth',
		type: 'string',
		default: '800px',
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
		name: 'showHeader',
		type: 'bool',
		default: 'true',
		description: "Show popup's header.",
	},
	{
		name: 'title',
		type: 'string',
		default: 'Universal popup',
		description: 'Title for header.',
	},
	{
		name: 'theme',
		type: 'string: main, primary, success, info, warning, danger, custom',
		default: 'main',
		description: 'Theme for header.',
	},
	{
		name: 'HeaderProps',
		type: 'object',
		default: '{}',
		description: 'Specify other props for header component.',
	},
	{
		name: 'ContentProps',
		type: 'object',
		default: '{}',
		description: 'Specify other props for content component.',
	},
	{
		name: 'closeOnEsc',
		type: 'bool',
		description: 'Close popup on Esc press.',
		default: 'true',
	},
];

export default props;
