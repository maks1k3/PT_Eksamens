import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TagsInput from 'ui/inputs/tags_input';

const title = 'TagsInput: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TagsInput from 'ui/inputs/tags_input';

<TagsInput disabled={true}/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<TagsInput disabled={true} />
		</ExampleHolder>
	);
};

export default Example;
