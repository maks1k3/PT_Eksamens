import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Switch from 'ui/inputs/switch';

const title = 'Switch: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Switch from 'ui/inputs/switch';

<Switch theme="main" label="Main" value="1" />
<Switch theme="primary" label="Primary" value={1} />
<Switch theme="success" label="Success" value={true} />
<Switch theme="info" label="Info" value="1" />
<Switch theme="warning" label="Warning" value="1" />
<Switch theme="danger" label="Danger" value="1" />
<Switch theme="custom" label="Custom" value="1" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Switch theme="main" label="Main" value="1" />
			<Switch theme="primary" label="Primary" value={1} />
			<Switch theme="success" label="Success" value={true} />
			<Switch theme="info" label="Info" value="1" />
			<Switch theme="warning" label="Warning" value="1" />
			<Switch theme="danger" label="Danger" value="1" />
			<Switch theme="custom" label="Custom" value="1" />
		</ExampleHolder>
	);
};

export default Example;
