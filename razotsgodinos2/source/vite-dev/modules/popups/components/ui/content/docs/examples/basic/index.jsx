import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'Content: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Content from 'popups/components/ui/content';

<Content classNames={styles} noHeader={false} noPadding={false}>
	<div>This is content</div>
</Content>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}
		/>
	);
};

export default Example;
