import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AceEditor from 'ui/editors/ace_editor';

const title = 'AceEditor: onChange';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AceEditor from 'ui/editors/ace_editor';

<AceEditor
	onChange={({ value, AceEditor }) => {
		console.log('onChange:', { value, AceEditor });
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
			code={info.code}>
			<AceEditor
				onChange={({ value, AceEditor }) => {
					console.log('onChange:', { value, AceEditor });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
