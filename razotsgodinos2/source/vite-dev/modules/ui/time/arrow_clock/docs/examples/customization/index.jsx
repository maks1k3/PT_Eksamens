import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ArrowClock from 'ui/time/arrow_clock';

const title = 'ArrowClock: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ArrowClock from 'ui/time/arrow_clock';

<ArrowClock
  live={true}
  time={moment().add(Math.floor((Math.random() * 1000) + 1),'minutes')}
  color="#6cc644"
  size={500}
  showSeconds={true}
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
			<ArrowClock
				live={true}
				time={moment().add(Math.floor(Math.random() * 1000 + 1), 'minutes')}
				color="#6cc644"
				size={500}
				showSeconds={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
