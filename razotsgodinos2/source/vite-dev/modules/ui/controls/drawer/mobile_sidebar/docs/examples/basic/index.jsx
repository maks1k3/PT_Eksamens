import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import MobileSideBar from 'ui/controls/drawer';

const title = 'MobileSidebar: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MobileSideBar from 'ui/controls/drawer';

<MobileSideBar
	sidebar={
		<div style={{ backgroundColor: '#fff', width: 250, height: '100%' }}>
			<ul>
				<li>Menu item 1</li>
				<li>Menu item 2</li>
			</ul>
		</div>
	}
	content={
		<div>
			<header>This is page header</header>
			<h1>This is title</h1>
			<div>This is content</div>
			<footer>This is page footer</footer>
		</div>
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
