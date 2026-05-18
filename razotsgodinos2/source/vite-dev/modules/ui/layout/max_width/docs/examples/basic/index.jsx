import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import MaxWidth from 'ui/layout/max_width';

const title = 'MaxWidth: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MaxWidth from 'ui/layout/max_width';

<MaxWidth>
	<div style={{ backgroundColor: '#ccc' }}>This is content 800px</div>
</MaxWidth>

<MaxWidth width="600px">
	<div style={{ backgroundColor: '#ccc' }}>This is content 600px</div>
</MaxWidth>

<MaxWidth width="50%">
	<div style={{ backgroundColor: '#ccc' }}>This is content 50%</div>
</MaxWidth>
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
				<MaxWidth>
					<div style={{ backgroundColor: '#ccc' }}>This is content 800px</div>
				</MaxWidth>
				<MaxWidth width="600px">
					<div style={{ backgroundColor: '#ccc' }}>This is content 600px</div>
				</MaxWidth>
				<MaxWidth width="50%">
					<div style={{ backgroundColor: '#ccc' }}>This is content 50%</div>
				</MaxWidth>
			</div>
		</ExampleHolder>
	);
};

export default Example;
