import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AlertBox from 'ui/misc/alertbox';

const title = 'AlertBox: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AlertBox from 'ui/misc/alertbox';

<AlertBox
  theme="danger"
  content={(<span>This <b>is</b> error</span>)}
/>

<AlertBox
  theme="success"
  content="This is success"
/>

<AlertBox
  theme="info"
  content={(<span>This <b>is</b> info</span>)}
/>

<AlertBox
  theme="warning"
  content={(<span>This <b>is</b> warning</span>)}
/>

<AlertBox
  theme="primary"
  content={(<span>This <b>is</b> primary</span>)}
/>

<AlertBox
  theme="custom"
  content={(<span>This <b>is</b> custom</span>)}
/>
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
				<h2>Error</h2>
				<AlertBox
					theme="danger"
					content={
						<span>
							This <b>is</b> error
						</span>
					}
				/>
			</div>

			<div>
				<h2>Success</h2>
				<AlertBox theme="success" content="This is success" />
			</div>

			<div>
				<h2>Info</h2>
				<AlertBox
					theme="info"
					content={
						<span>
							This <b>is</b> info
						</span>
					}
				/>
			</div>

			<div>
				<h2>Warning</h2>
				<AlertBox
					theme="warning"
					content={
						<span>
							This <b>is</b> warning
						</span>
					}
				/>
			</div>

			<div>
				<h2>Primary</h2>
				<AlertBox
					theme="primary"
					content={
						<span>
							This <b>is</b> primary
						</span>
					}
				/>
			</div>

			<div>
				<h2>Custom</h2>
				<AlertBox
					theme="custom"
					content={
						<span>
							This <b>is</b> custom
						</span>
					}
				/>
			</div>
		</ExampleHolder>
	);
};

export default Example;
