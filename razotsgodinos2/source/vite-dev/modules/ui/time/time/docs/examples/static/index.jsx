import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Time from 'ui/time/time';

const title = 'Time: static';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Time from 'ui/time/time';

<Time live={false}/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Time live={false} />
		</ExampleHolder>
	);
};

export default Example;
