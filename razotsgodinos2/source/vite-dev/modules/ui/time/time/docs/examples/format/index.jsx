import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Time from 'ui/time/time';

const title = 'Time: format';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Time from 'ui/time/time';

<Time
  timeZone="Europe/Riga"
  format="ddd DD-MMM-YYYY, hh:mm:ss A"
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
			<Time timeZone="Europe/Riga" format="ddd DD-MMM-YYYY, hh:mm:ss A" />
		</ExampleHolder>
	);
};

export default Example;
