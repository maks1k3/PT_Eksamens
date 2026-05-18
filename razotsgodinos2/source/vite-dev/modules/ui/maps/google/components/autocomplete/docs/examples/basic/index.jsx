import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/maps/google/components/autocomplete';

const title = 'Google AutoComplete: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/maps/google/components/autocomplete';

<AutoComplete
	types={['address']} //(cities),(regions),address,geocode
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
				types={['address']} //(cities),(regions),address,geocode
			/>
		</ExampleHolder>
	);
};

export default Example;
