import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FroalaEditor from 'ui/editors/froala_editor';

const title = 'FroalaEditor: onChange';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FroalaEditor from 'ui/editors/froala_editor';

<FroalaEditor
	onChange={({ value, FroalaEditor }) => {
		console.log('onChange:', { value, FroalaEditor });
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
			<FroalaEditor
				onChange={({ value, FroalaEditor }) => {
					console.log('onChange:', { value, FroalaEditor });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
