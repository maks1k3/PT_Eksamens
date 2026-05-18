import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ArrowClock from 'ui/time/arrow_clock';

const title = 'ArrowClock: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ArrowClock from 'ui/time/arrow_clock';

<ArrowClock
  time={moment()}
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
			<ArrowClock time={moment()} />
		</ExampleHolder>
	);
};

export default Example;
