import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AlertBox from 'ui/misc/alertbox';

const title = 'AlertBox: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AlertBox from 'ui/misc/alertbox';

<AlertBox content="This is error!" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<AlertBox content="This is error!" />
		</ExampleHolder>
	);
};

export default Example;
