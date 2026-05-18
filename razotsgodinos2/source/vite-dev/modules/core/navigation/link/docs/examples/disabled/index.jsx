import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Link from 'core/navigation/link';

const title = 'Link: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Link from 'core/navigation/link';

<Link to="https://google.com" mode="navigation" disabled={true}>Link</Link>   
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Link to="https://google.com" mode="navigation" disabled={true}>
				Link
			</Link>
		</ExampleHolder>
	);
};

export default Example;
