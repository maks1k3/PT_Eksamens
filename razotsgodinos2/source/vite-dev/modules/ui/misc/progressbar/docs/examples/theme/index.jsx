import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ProgressBar from 'ui/misc/progressbar';

const title = 'ProgressBar: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ProgressBar from 'ui/misc/progressbar';

<ProgressBar theme="main" label="Main" percent={67} />
<ProgressBar theme="primary" label="Default: primary" percent={41} />
<ProgressBar theme="success" label="Success" percent={100} />
<ProgressBar theme="info" label="Info" percent={65} animate={true} />
<ProgressBar theme="warning" label="Warning" percent={80} />
<ProgressBar theme="danger" label="Danger" percent={100} />
<ProgressBar theme="custom" label="Custom" percent={75} />
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
				<ProgressBar theme="main" label="Main" percent={67} />
			</div>

			<div style={{ marginBottom: '10px' }}>
				<ProgressBar theme="primary" label="Default: primary" percent={41} />
			</div>

			<div style={{ marginBottom: '10px' }}>
				<ProgressBar theme="success" label="Success" percent={100} />
			</div>

			<div style={{ marginBottom: '10px' }}>
				<ProgressBar theme="info" label="Info" percent={65} animate={true} />
			</div>

			<div style={{ marginBottom: '10px' }}>
				<ProgressBar theme="warning" label="Warning" percent={80} />
			</div>

			<div style={{ marginBottom: '10px' }}>
				<ProgressBar theme="danger" label="Danger" percent={100} />
			</div>

			<div style={{ marginBottom: '10px' }}>
				<ProgressBar theme="custom" label="Custom" percent={75} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
