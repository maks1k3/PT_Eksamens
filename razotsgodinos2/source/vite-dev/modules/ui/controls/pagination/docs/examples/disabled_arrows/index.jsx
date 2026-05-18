import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Pagination from 'ui/controls/pagination';

const title = 'Pagination: disableArrows';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Pagination from 'ui/controls/pagination';

<Pagination
	pageCount={100} //total number of pages
	pageRangeDisplayed={6} //range of pages displayed
	marginPagesDisplayed={3} //number of pages to display for margins
	page={2}
	disableArrows={true}
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
			<Pagination
				pageCount={100}
				pageRangeDisplayed={6}
				marginPagesDisplayed={3}
				page={2}
				disableArrows={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
