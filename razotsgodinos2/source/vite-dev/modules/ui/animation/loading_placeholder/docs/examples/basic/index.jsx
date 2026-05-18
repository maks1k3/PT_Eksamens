import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import LoadingPlaceholder from 'ui/animation/loading_placeholder';

const title = 'LoadingPlaceholder: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import LoadingPlaceholder from 'ui/animation/loading_placeholder';

<LoadingPlaceholder/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<LoadingPlaceholder />
		</ExampleHolder>
	);
};

export default Example;
