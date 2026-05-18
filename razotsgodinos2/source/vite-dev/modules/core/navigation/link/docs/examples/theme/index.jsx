import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Link from 'core/navigation/link';

const title = 'Link: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Link from 'core/navigation/link';

<Link theme="main">Main</Link>
<Link theme="content">Content</Link>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div>
				<Link theme="main">Main</Link>
			</div>
			<div>
				<Link theme="content">Content</Link>
			</div>
		</ExampleHolder>
	);
};

export default Example;
