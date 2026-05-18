const props = [
	{
		name: 'homePageLink',
		type: 'string',
		default: '#',
		description: 'Link to the home of administration page.',
	},
	{
		name: 'homePageLinkMode',
		type: 'string: history, navigation, auto',
		default: 'auto',
		description: 'Link mode for homePageLink.',
	},
	{
		name: 'backgroundColor',
		type: 'string',
		default: '#37474F',
		description: 'Color of the navigation bar.',
	},
	{
		name: 'title',
		type: 'string',
		default: 'Administration',
		description: 'Title of the navigation bar.',
	},
	{
		name: 'logo',
		type: 'string',
		description: 'Path to an image.',
	},
	{
		name: 'drawerType',
		type: 'string: touch, simple',
		description: 'Use MobileSideBar or SimpleDrawer for mobile navigation.',
		default: 'touch',
	},
	{
		name: 'Sidebar',
		type: 'func',
		isRequired: true,
		description: 'Sidebar content.',
	},
	{
		name: 'Content',
		type: 'func',
		isRequired: true,
		description: 'Page content.',
	},
	{
		name: 'Right',
		type: 'func',
		description: 'Optional ui for the right side of navigation bar.',
	},
];

export default props;
