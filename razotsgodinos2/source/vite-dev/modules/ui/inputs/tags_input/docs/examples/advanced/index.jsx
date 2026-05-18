import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TagsInput from 'ui/inputs/tags_input';

const title = 'TagsInput: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TagsInput from 'ui/inputs/tags_input';

//caseSensitive
<TagsInput caseSensitive={true} />

//removeWithBackspace
<TagsInput removeWithBackspace={true} />

//onlyFromAutoComplete
<TagsInput
	onlyFromAutoComplete={true}
	options={[
		{
			value: 'age_of_mythology',
			label: 'Age of Mythology',
		},
		{
			value: 'starcraft',
			label: 'StarCraft',
		},
		{
			value: 'counter_strike',
			label: 'Counter strike',
		},
	]}
	AutoCompleteProps={{
		optionsUrl: 'example_api/autocomplete',
		valueKey: 'id',
		labelKey: 'name',
	}}
/>

//minChars
<TagsInput minChars={3} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<h3>caseSensitive</h3>
			<TagsInput caseSensitive={true} />
			<h3>removeWithBackspace</h3>
			<TagsInput removeWithBackspace={true} />
			<h3>onlyFromAutoComplete</h3>
			<TagsInput
				onlyFromAutoComplete={true}
				options={[
					{
						value: 'age_of_mythology',
						label: 'Age of Mythology',
					},
					{
						value: 'starcraft',
						label: 'StarCraft',
					},
					{
						value: 'counter_strike',
						label: 'Counter strike',
					},
				]}
				AutoCompleteProps={{
					optionsUrl: 'example_api/autocomplete',
					valueKey: 'id',
					labelKey: 'name',
				}}
			/>
			<h3>minChars</h3>
			<TagsInput minChars={3} />
		</ExampleHolder>
	);
};

export default Example;
