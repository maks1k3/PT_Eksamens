import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Time from 'ui/time/time';

const title = 'Time: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Shows current time.',
	code: `
import Time from 'ui/time/time';

<Time/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Time />
		</ExampleHolder>
	);
};

export default Example;
