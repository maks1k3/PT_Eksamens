const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'title',
		type: 'node',
		default: '',
		description: 'Content for tooltip',
	},
	{
		name: 'positionId',
		type: 'string',
		description: 'Change this string to update the position of a tooltip.',
	},
	{
		name: 'position',
		type: 'string',
		default: 'top',
		description: 'Position of the tooltip:top,left,right,bottom',
	},
	{
		name: 'destroyTooltipOnHide',
		type: 'bool',
		default: 'true',
		description: 'Destroy the tooltip from the DOM on close',
	},
	{
		name: 'renderContent',
		type: 'func',
		description: 'Render inner contents of tooltip',
	},
	{
		name: 'trigger',
		type: 'array',
		default: "['hover']",
		description: 'Trigger events for tooltip:hover,click,focus',
	},
	{
		name: 'renderPortalElements',
		type: 'func',
		description: 'Renderer for portal',
	},
	{
		name: 'onFocus',
		type: 'func',
		description: '',
	},
	{
		name: 'onBlur',
		type: 'func',
		description: '',
	},
	{
		name: 'onClick',
		type: 'func',
		description: '',
	},
	{
		name: 'onMouseEnter',
		type: 'func',
		description: '',
	},
	{
		name: 'onMouseLeave',
		type: 'func',
		description: '',
	},
	{
		name: 'onClickOutside',
		type: 'func',
		description: '',
	},
];

export default props;
