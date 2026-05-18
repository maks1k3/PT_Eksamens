import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CKEditor from 'ui/editors/ckeditor';

const title = 'CKEditor: onChange';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CKEditor from 'ui/editors/ckeditor';

<CKEditor
	onChange={({ value, CKEditor }) => {
		console.log('onChange:', { value, CKEditor });
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
			<CKEditor
				onChange={({ value, CKEditor }) => {
					console.log('onChange:', { value, CKEditor });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
