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
		name: 'showCloseControl',
		type: 'bool',
		description: 'Button to close popup.',
		default: 'false',
	},
	{
		name: 'onClose',
		type: 'func',
		description: 'Overrides default behaviour.',
		default: 'false',
	},
	{
		name: 'renderPopup',
		type: 'func',
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
