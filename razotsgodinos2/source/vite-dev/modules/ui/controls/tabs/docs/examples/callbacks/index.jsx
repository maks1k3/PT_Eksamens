import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tabs from 'ui/controls/tabs';

const title = 'Tabs: callbacks';

import items from '../items';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Tabs from 'ui/controls/tabs';

<Tabs
	items={items}
	onTabChange={({ current, Tabs }) => {
		console.log('onTabChange:', { current, Tabs });
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Tabs
				items={items}
				onTabChange={({ current, Tabs }) => {
					console.log('onTabChange:', { current, Tabs });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
