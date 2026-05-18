import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Select from 'ui/inputs/select';

const title = 'Select: custom text';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Select from 'ui/inputs/select';

<Select
  placeholder="Atlasīt"
  clearValueText="Notīrīt vērtību"
  noResultsText="Netika atrasts neviens rezultāts"
  searchPromptText="Ierakstiet, lai meklētu"
  loadingPlaceholder="Ielādē"
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
			<Select
				placeholder="Atlasīt"
				clearValueText="Notīrīt vērtību"
				noResultsText="Netika atrasts neviens rezultāts"
				searchPromptText="Ierakstiet, lai meklētu"
				loadingPlaceholder="Ielādē"
				clearable={true}
				searchable={true}
				value="option_2"
				options={[
					{
						value: 'option_1',
						label: 'Option 1',
					},
					{
						value: 'option_2',
						label: 'Option 2',
					},
					{
						value: 'option_3',
						label: 'Option 3',
					},
					{
						value: 'option_4',
						label: 'Option 4',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
