import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AceEditor from 'ui/editors/ace_editor';

const title = 'AceEditor: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AceEditor from 'ui/editors/ace_editor';

<AceEditor disabled={true} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<AceEditor disabled={true} />
		</ExampleHolder>
	);
};

export default Example;
