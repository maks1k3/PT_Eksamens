import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'DataTable Search: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Search from 'ui/tables/data_table/components/search';

<Search
	id="dt_basic_example"
	classNames={classNames}
	placeholder="Search..."
	InputProps={{
		icon: {
			provider: 'fa',
			name: 'search',
		},
		clearable: true,
		autoComplete: 'off',
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
