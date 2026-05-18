import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CKEditor from 'ui/editors/ckeditor';

const title = 'CKEditor: toolbar';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CKEditor from 'ui/editors/ckeditor';

<CKEditor
  toolbar="tiny"
/>

<CKEditor
  toolbar="small"
/>

<CKEditor
  toolbar="default"
/>

<CKEditor
  toolbar="pro"
/>

<CKEditor
  toolbar="full"
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
			<div>
				<h3>Toolbar tiny</h3>
				<CKEditor toolbar="tiny" />
			</div>

			<div>
				<h3>Toolbar small</h3>
				<CKEditor toolbar="small" />
			</div>

			<div>
				<h3>Toolbar default</h3>
				<CKEditor toolbar="default" />
			</div>

			<div>
				<h3>Toolbar pro</h3>
				<CKEditor toolbar="pro" />
			</div>

			<div>
				<h3>Toolbar full</h3>
				<CKEditor toolbar="full" />
			</div>
		</ExampleHolder>
	);
};

export default Example;
