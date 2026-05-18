import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/maps/google/components/autocomplete';

const title = 'Google AutoComplete: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/maps/google/components/autocomplete';

<AutoComplete
	types={['(regions)']} //(cities),(regions),address,geocode
	lang="lv"
	value="Riga"
	InputProps={{
		clearable: true,
		placeholder: 'Enter address',
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
			<AutoComplete
				types={['(regions)']} //(cities),(regions),address,geocode
				lang="lv"
				value="Riga"
				InputProps={{
					clearable: true,
					placeholder: 'Enter address',
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
