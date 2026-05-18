import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Link from 'core/navigation/link';

const title = 'Link: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Link from 'core/navigation/link';

<Link
	to="/something?param=1#top"
	onClick={({ Link }) => {
		console.log({ onClick: { Link } });
	}}>
	onClick
</Link>

<Link
	to="#"
	onClickCallback={({ Link }) => {
		console.log({ onClickCallback: { Link } });
	}}>
	onClickCallback
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
				<Link
					to="/something?param=1#top"
					onClick={({ Link }) => {
						console.log({ onClick: { Link } });
					}}>
					onClick
				</Link>
			</div>
			<div>
				<Link
					to="#"
					onClickCallback={({ Link }) => {
						console.log({ onClickCallback: { Link } });
					}}>
					onClickCallback
				</Link>
			</div>
		</ExampleHolder>
	);
};

export default Example;
