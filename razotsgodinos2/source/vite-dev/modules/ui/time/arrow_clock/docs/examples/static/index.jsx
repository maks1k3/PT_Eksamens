import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ArrowClock from 'ui/time/arrow_clock';

const title = 'ArrowClock: static';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ArrowClock from 'ui/time/arrow_clock';

<ArrowClock
  time={moment().hour(12).minute(0).second(0)}
  live={false}
	showSeconds={false}
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
				time={moment()
					.hour(12)
					.minute(0)
					.second(0)}
				live={false}
				showSeconds={false}
			/>
		</ExampleHolder>
	);
};

export default Example;
