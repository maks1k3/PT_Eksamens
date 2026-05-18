import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Link from 'core/navigation/link';

const title = 'Link: mode';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Link from 'core/navigation/link';

<Link mode="history" to="/"> Mode: history api</Link>
<Link mode="navigation" to="/"> Mode: navigation</Link>
<Link mode="auto" to="/"> Mode: history api if browser_window.hasHistoryApi</Link>
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
				<Link mode="history" to="/">
					Mode: history api
				</Link>
			</div>
			<div>
				<Link mode="navigation" to="/">
					Mode: navigation
				</Link>
			</div>
			<div>
				<Link mode="auto" to="/">
					Mode: history api if browser_window.hasHistoryApi
				</Link>
			</div>
		</ExampleHolder>
	);
};

export default Example;
