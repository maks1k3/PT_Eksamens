import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AceEditor from 'ui/editors/ace_editor';

const title = 'AceEditor: mode';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AceEditor from 'ui/editors/ace_editor';

<AceEditor
  mode="jsx"
/>

<AceEditor
  mode="javascript"
/>

<AceEditor
  mode="html"
/>

<AceEditor
  mode="css"
/>

<AceEditor
  mode="less"
/>

<AceEditor
  mode="json"
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
				<h3>jsx</h3>
				<AceEditor mode="jsx" />
			</div>

			<div>
				<h3>javascript</h3>
				<AceEditor mode="javascript" />
			</div>

			<div>
				<h3>html</h3>
				<AceEditor mode="html" />
			</div>

			<div>
				<h3>css</h3>
				<AceEditor mode="css" />
			</div>

			<div>
				<h3>less</h3>
				<AceEditor mode="less" />
			</div>

			<div>
				<h3>json</h3>
				<AceEditor mode="json" />
			</div>
		</ExampleHolder>
	);
};

export default Example;
