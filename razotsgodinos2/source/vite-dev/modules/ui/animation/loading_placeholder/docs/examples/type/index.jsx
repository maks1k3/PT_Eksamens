import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import LoadingPlaceholder from 'ui/animation/loading_placeholder';

const title = 'LoadingPlaceholder: type';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import LoadingPlaceholder from 'ui/animation/loading_placeholder';

<LoadingPlaceholder type="post" />
<LoadingPlaceholder type="rows" />
<LoadingPlaceholder type="image-rows" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<h3>Post</h3>
			<LoadingPlaceholder type="post" />
			<h3>Rows</h3>
			<LoadingPlaceholder type="rows" />
			<h3>Image rows</h3>
			<LoadingPlaceholder type="image-rows" />
		</ExampleHolder>
	);
};

export default Example;
