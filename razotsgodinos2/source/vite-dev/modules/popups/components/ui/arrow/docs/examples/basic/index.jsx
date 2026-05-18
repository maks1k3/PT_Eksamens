import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'Arrow: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Arrow from 'popups/components/ui/arrow';

<Arrow
	classNames={styles}
	type="left"
	onClick={() => {
		console.log('On left arrow click.');
	}}
/>
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
