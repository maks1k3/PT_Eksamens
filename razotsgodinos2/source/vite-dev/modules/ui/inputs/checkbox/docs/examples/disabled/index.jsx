import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Checkbox from 'ui/inputs/checkbox';

const title = 'Checkbox: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Checkbox from 'ui/inputs/checkbox';

<Checkbox value={'0'} disabled={true} />
<Checkbox value={'1'} disabled={true} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Checkbox value={'0'} disabled={true} />
			<Checkbox value={'1'} disabled={true} />
		</ExampleHolder>
	);
};

export default Example;
