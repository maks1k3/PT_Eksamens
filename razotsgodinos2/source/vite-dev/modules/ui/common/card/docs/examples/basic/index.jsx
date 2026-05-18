import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Card from 'ui/common/card';

const title = 'Card: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Card from 'ui/common/card';

<Card>
	<div>This is some content</div>
</Card>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Card>
				<div>This is some content</div>
			</Card>
		</ExampleHolder>
	);
};

export default Example;
