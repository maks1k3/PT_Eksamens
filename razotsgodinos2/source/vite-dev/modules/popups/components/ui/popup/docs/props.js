const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'name',
		type: 'string',
		isRequired: true,
		description: "Popup's name.",
	},
	{
		name: 'level',
		type: 'number',
		description: "Popup's level in hierarchy.",
		default: '0',
	},
	{
		name: 'showOverlay',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'hideOnOverlayClick',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'onOverlayClick',
		type: 'func',
		description: 'Overrides default behaviour.',
	},
	{
		name: 'showCloseControl',
		type: 'bool',
		description: 'Button to close popup.',
	},
	{
		name: 'onClose',
		type: 'func',
		description: 'Overrides default behaviour.',
	},
	{
		name: 'verticalAlign',
		type: 'string: top, middle, bottom',
		default: 'top',
	},
	{
		name: 'contentWrapStyle',
		type: 'object',
	},
	{
		name: 'renderPopup',
		type: 'func',
	},
	{
		name: 'inner',
		type: 'node',
		description: 'For content inside container.',
	},
	{
		name: 'children',
		type: 'node',
	},
	{
		name: 'openAnimation',
		type: 'string',
		default: '',
		description: 'OpenAnimation className.',
	},
	{
		name: 'closeAnimation',
		type: 'string',
		default: '',
		description: 'CloseAnimation className.',
	},
];

export default props;
