import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Collapsible from 'ui/controls/collapsible';

const title = 'Collapsible: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Collapsible from 'ui/controls/collapsible';


<Collapsible title="This is collapsible">
	<div style={{ background: '#5f6d83', height: 300 }}>
		This is content
	</div>
</Collapsible>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Collapsible title="This is collapsible">
				<div style={{ background: '#5f6d83', height: 300 }}>
					This is content
				</div>
			</Collapsible>
		</ExampleHolder>
	);
};

export default Example;
