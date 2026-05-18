import React from 'react';

const items = [];

items.push({
	name: 'tab_item',
	title: 'First',
	content: <div>First item</div>,
});

items.push({
	name: 'profile',
	title: 'Profile',
	icon: {
		provider: 'icomoon',
		name: 'profile',
	},
	content: <div>This is profile tab</div>,
});

items.push({
	name: 'change_password',
	title: 'Change password',
	icon: {
		provider: 'icomoon',
		name: 'key',
	},
	content: <div>This is change password tab</div>,
});

items.push({
	name: 'edit',
	title: 'Edit',
	icon: {
		provider: 'icomoon',
		name: 'pencil',
	},
	content: <div>This is edit tab</div>,
});

items.push({
	name: 'delete',
	title: 'Delete',
	icon: {
		provider: 'icomoon',
		name: 'trash',
	},
	content: <div>Delete tab content</div>,
});

export default items;
