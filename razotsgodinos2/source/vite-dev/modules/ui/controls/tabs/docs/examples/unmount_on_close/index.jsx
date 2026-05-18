import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tabs from 'ui/controls/tabs';

const title = 'Tabs: unmountOnClose';

import items from '../items';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: "Only active tab's content will appear in the DOM.",
	code: `
import Tabs from 'ui/controls/tabs';

<Tabs items={items} unmountOnClose={true} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Tabs items={items} unmountOnClose={true} />
		</ExampleHolder>
	);
};

export default Example;
