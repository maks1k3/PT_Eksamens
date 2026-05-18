import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CKEditor from 'ui/editors/ckeditor';

const title = 'CKEditor: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CKEditor from 'ui/editors/ckeditor';

<CKEditor value="<p><i>Some</i> <b>data</b></p>" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<CKEditor value="<p><i>Some</i> <b>data</b></p>" />
		</ExampleHolder>
	);
};

export default Example;
