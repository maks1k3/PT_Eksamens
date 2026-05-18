import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Link from 'core/navigation/link';

const title = 'Link: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Link from 'core/navigation/link';

<Link to="/something?param=1#top">Link 1</Link>

<Link
	to={{
		path: '/something',
		params: {
			param: 1,
		},
		hash: 'top',
	}}>
	Link 2
</Link>
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
				<Link to="/something?param=1#top">Link 1</Link>
			</div>
			<div>
				<Link
					to={{
						path: '/something',
						params: {
							param: 1,
						},
						hash: 'top',
					}}>
					Link 2
				</Link>
			</div>
		</ExampleHolder>
	);
};

export default Example;
