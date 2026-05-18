import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'DataTable Info: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Info from 'ui/tables/data_table/components/info';

<Info
	id="dt_basic_example"
	classNames={classNames}
	translations={{
		showing: 'Showing',
		to: 'to',
		of: 'of',
		entries: 'entries',
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
			code={info.code}
		/>
	);
};

export default Example;
