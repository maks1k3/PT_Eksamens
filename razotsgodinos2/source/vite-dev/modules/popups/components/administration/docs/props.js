const props = [
	{
		name: 'name',
		type: 'string',
		isRequired: true,
		description: "Unique key for popup's data in Redux.",
	},
	{
		name: 'popupName',
		type: 'string',
		isRequired: true,
		description: 'Name of the popup.',
	},
	{
		name: 'url',
		type: 'string',
		isRequired: true,
		description: 'Url for fetching data from server.',
	},
	{
		name: 'extraData',
		type: 'object',
		description: 'Extra data that will be sent to server.',
		default: '{}',
	},
	{
		name: 'onSuccess',
		type: 'func',
	},
	{
		name: 'onError',
		type: 'func',
	},
	{
		name: 'onFail',
		type: 'func',
	},
	{
		name: 'onClose',
		type: 'func',
		description: 'Overrides default behaviour.',
	},
	{
		name: 'getTitle',
		type: 'func',
	},
	{
		name: 'getImage',
		type: 'func',
	},
	{
		name: 'getRows',
		type: 'func',
	},
	{
		name: 'showHeader',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'showRefresh',
		type: 'bool',
		default: 'true',
	},
	{
		name: 'PopupProps',
		type: 'object',
		description: 'Other Popup component props.',
	},
	{
		name: 'HeaderProps',
		type: 'object',
	},
	{
		name: 'ContentProps',
		type: 'object',
	},
	{
		name: 'LoadingProps',
		type: 'object',
	},
	{
		name: 'AdministrationPopupHeaderProps',
		type: 'object',
	},
	{
		name: 'level',
		type: 'number',
		default: '0',
	},
	{
		name: 'verticalAlign',
		type: 'string',
		default: 'top',
	},
	{
		name: 'hideOnOverlayClick',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'showCloseControl',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'contentWrapStyle',
		type: 'object',
		default: '{maxWidth: 1024px}',
	},
	{
		name: 'parseResponse',
		type: 'func',
		description: 'Modify response',
	},
	{
		name: 'children',
		type: 'node',
	},
];

export default props;
