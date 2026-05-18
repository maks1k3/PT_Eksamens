import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tabs from 'ui/controls/tabs';

const title = 'Tabs: basic';

import items from '../items';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Tabs from 'ui/controls/tabs';


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

<Tabs items={items} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Tabs items={items} />
		</ExampleHolder>
	);
};

export default Example;
