import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TagsInput from 'ui/inputs/tags_input';

const title = 'TagsInput: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TagsInput from 'ui/inputs/tags_input';

<TagsInput
	onChange={({ tags, value, TagsInput }) => {
		console.log('onChange:', { tags, value, TagsInput });
	}}
	onAddTag={({ tag, TagsInput }) => {
		console.log('onAddTag:', { tag, TagsInput });
	}}
	onRemoveTag={({ tag, TagsInput }) => {
		console.log('onRemoveTag:', { tag, TagsInput });
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
			<TagsInput
				onChange={({ tags, value, TagsInput }) => {
					console.log('onChange:', { tags, value, TagsInput });
				}}
				onAddTag={({ tag, TagsInput }) => {
					console.log('onAddTag:', { tag, TagsInput });
				}}
				onRemoveTag={({ tag, TagsInput }) => {
					console.log('onRemoveTag:', { tag, TagsInput });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
