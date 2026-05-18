import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Checkbox from 'ui/inputs/checkbox';

const title = 'Checkbox: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Checkbox from 'ui/inputs/checkbox';

<Checkbox theme="main" label="Main" value="1" />
<Checkbox theme="primary" label="Primary" value={1} />
<Checkbox theme="success" label="Success" value={true} />
<Checkbox theme="info" label="Info" value="1" />
<Checkbox theme="warning" label="Warning" value="1" />
<Checkbox theme="danger" label="Danger" value="1" />
<Checkbox theme="custom" label="Custom" value="1" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Checkbox theme="main" label="Main" value="1" />
			<Checkbox theme="primary" label="Primary" value={1} />
			<Checkbox theme="success" label="Success" value={true} />
			<Checkbox theme="info" label="Info" value="1" />
			<Checkbox theme="warning" label="Warning" value="1" />
			<Checkbox theme="danger" label="Danger" value="1" />
			<Checkbox theme="custom" label="Custom" value="1" />
		</ExampleHolder>
	);
};

export default Example;
