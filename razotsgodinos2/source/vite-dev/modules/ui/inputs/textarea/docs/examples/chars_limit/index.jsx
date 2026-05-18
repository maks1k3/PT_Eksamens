import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';

const title = 'TextArea: chars limit';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TextArea from 'ui/inputs/textarea';

//maxChars, showCharsLimit
<TextArea maxChars={100} showCharsLimit={true} />

//showCharsLimitWhenLeft
<TextArea
	maxChars={10}
	showCharsLimit={true}
	showCharsLimitWhenLeft={2}
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
			<h3>maxChars, showCharsLimit</h3>
			<TextArea maxChars={100} showCharsLimit={true} />
			<h3>showCharsLimitWhenLeft</h3>
			<TextArea
				maxChars={10}
				showCharsLimit={true}
				showCharsLimitWhenLeft={2}
			/>
		</ExampleHolder>
	);
};

export default Example;
