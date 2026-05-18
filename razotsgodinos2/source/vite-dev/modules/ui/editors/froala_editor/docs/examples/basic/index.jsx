import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FroalaEditor from 'ui/editors/froala_editor';

const title = 'FroalaEditor: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FroalaEditor from 'ui/editors/froala_editor';

<FroalaEditor value="Some value" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<FroalaEditor value="Some value" />
		</ExampleHolder>
	);
};

export default Example;
