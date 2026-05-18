import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FroalaEditor from 'ui/editors/froala_editor';

const title = 'FroalaEditor: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FroalaEditor from 'ui/editors/froala_editor';

<FroalaEditor disabled={true} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<FroalaEditor disabled={true} />
		</ExampleHolder>
	);
};

export default Example;
