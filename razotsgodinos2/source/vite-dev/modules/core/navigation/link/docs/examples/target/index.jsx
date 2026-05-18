import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Link from 'core/navigation/link';

const title = 'Link: target';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Link from 'core/navigation/link';

<Link target="_blank" to="https://google.com">Blank</Link>
<Link target="_self" to="https://google.com">Self</Link>
<Link target="_parent" to="https://google.com">Parent</Link>
<Link target="_top" to="https://google.com">Top</Link>
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
				<Link target="_blank" to="https://google.com">
					Blank
				</Link>
			</div>
			<div>
				<Link target="_self" to="https://google.com">
					Self
				</Link>
			</div>
			<div>
				<Link target="_parent" to="https://google.com">
					Parent
				</Link>
			</div>
			<div>
				<Link target="_top" to="https://google.com">
					Top
				</Link>
			</div>
		</ExampleHolder>
	);
};

export default Example;
