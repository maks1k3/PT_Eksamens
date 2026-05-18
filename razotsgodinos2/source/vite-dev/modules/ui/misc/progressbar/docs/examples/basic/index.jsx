import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ProgressBar from 'ui/misc/progressbar';

const title = 'ProgressBar: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ProgressBar from 'ui/misc/progressbar';

<ProgressBar percent={65} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<ProgressBar percent={65} />
		</ExampleHolder>
	);
};

export default Example;
