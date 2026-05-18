import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tabs from 'ui/controls/tabs';

const title = 'Tabs: inUrl and urlKey';

import items from '../items';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Tabs from 'ui/controls/tabs';


<Tabs inUrl={true} urlKey="tabs" items={items} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Tabs inUrl={true} urlKey="tabs" items={items} />
		</ExampleHolder>
	);
};

export default Example;
