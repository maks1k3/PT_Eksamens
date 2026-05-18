import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tabs from 'ui/controls/tabs';

const title = 'Tabs: lazyLoad';

import items from '../items';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		"Tabs content won't appear in the DOM if it wasn't previously opened before. If it was previously opened then it will be hidden with display:none",

	code: `
import Tabs from 'ui/controls/tabs';

<Tabs items={items} lazyLoad={true} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Tabs items={items} lazyLoad={true} />
		</ExampleHolder>
	);
};

export default Example;
