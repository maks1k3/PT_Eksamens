import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Dropdown from 'ui/controls/dropdown';

const title = 'Dropdown: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Dropdown from 'ui/controls/dropdown';


<Dropdown
	trigger="click me"
	content={<p>This is content</p>}
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
			<Dropdown trigger="click me" content={<p>This is content</p>} />
		</ExampleHolder>
	);
};

export default Example;
