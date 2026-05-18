import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AceEditor from 'ui/editors/ace_editor';

const title = 'AceEditor: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AceEditor from 'ui/editors/ace_editor';

<AceEditor value="Some data" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<AceEditor value="Some data" />
		</ExampleHolder>
	);
};

export default Example;
