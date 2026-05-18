import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Pagination from 'ui/controls/pagination';

const title = 'Pagination: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Pagination from 'ui/controls/pagination';

<Pagination
	pageCount={10} //total number of pages
	pageRangeDisplayed={2} //range of pages displayed
	marginPagesDisplayed={1} //number of pages to display for margins
	page={4}
	onPageChange={({ page, Pagination }) => {
		console.log({
			onPageChange: {
				page,
				Pagination,
			},
		});
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
			<Pagination
				pageCount={10} //total number of pages
				pageRangeDisplayed={2} //range of pages displayed
				marginPagesDisplayed={1} //number of pages to display for margins
				page={4}
				onPageChange={({ page, Pagination }) => {
					console.log({
						onPageChange: {
							page,
							Pagination,
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
