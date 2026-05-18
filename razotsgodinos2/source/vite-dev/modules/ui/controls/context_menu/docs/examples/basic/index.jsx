import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ContextMenu from 'ui/controls/context_menu';

const title = 'ContextMenu: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ContextMenu from 'ui/controls/context_menu';


<ContextMenu content={<div>This is content</div>}>
	<span>Click me</span>
</ContextMenu>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<ContextMenu content={<div>This is content</div>}>
				<span>Click me</span>
			</ContextMenu>
		</ExampleHolder>
	);
};

export default Example;
