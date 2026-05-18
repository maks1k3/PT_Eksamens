import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'Button: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Button from 'ui/controls/button';

<Button
  theme="main"
  title="Main"
/>
<Button
  theme="primary"
  title="Primary"
/>
<Button
  theme="success"
  title="Success"
/>
<Button
  theme="info"
  title="Info"
/>
<Button
  theme="warning"
  title="Warning"
/>
<Button
  theme="danger"
  title="Danger"
/>
<Button
  theme="custom"
  title="Custom"
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
			<div style={{ marginBottom: '10px' }}>
				<Button theme="main" title="Main" />
			</div>
			<div style={{ marginBottom: '10px' }}>
				<Button theme="primary" title="Primary" />
			</div>
			<div style={{ marginBottom: '10px' }}>
				<Button theme="success" title="Success" />
			</div>
			<div style={{ marginBottom: '10px' }}>
				<Button theme="info" title="Info" />
			</div>
			<div style={{ marginBottom: '10px' }}>
				<Button theme="warning" title="Warning" />
			</div>
			<div style={{ marginBottom: '10px' }}>
				<Button theme="danger" title="Danger" />
			</div>
			<div style={{ marginBottom: '10px' }}>
				<Button theme="custom" title="Custom" />
			</div>
		</ExampleHolder>
	);
};

export default Example;
