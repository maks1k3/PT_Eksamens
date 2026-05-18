import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import SimpleDrawer from 'ui/controls/drawer/SimpleDrawer';

const title = 'SimpleDrawer: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import SimpleDrawer from 'ui/controls/drawer/SimpleDrawer';

<SimpleDrawer
	content={
		<ul>
			<li>Menu item 1</li>
			<li>Menu item 2</li>
		</ul>
	}
/>

//open
ee.trigger(events.drawer.open);
//close
ee.trigger(events.drawer.close);
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}
		/>
	);
};

export default Example;
