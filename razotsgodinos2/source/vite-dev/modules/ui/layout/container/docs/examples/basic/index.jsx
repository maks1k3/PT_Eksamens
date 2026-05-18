import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Container from 'ui/layout/container';

const title = 'Container: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Container from 'ui/layout/container';

<Container>
	<div>This is container</div>
</Container>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Container>
				<div>This is container</div>
			</Container>
		</ExampleHolder>
	);
};

export default Example;
