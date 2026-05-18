import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'DataTable Pagination: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Pagination from 'ui/tables/data_table/components/pagination';

<Pagination
	id="dt_basic_example"
	classNames={classNames}
	PaginationProps={{
		center: true,
	}}
	callbacks={callbacks}
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
