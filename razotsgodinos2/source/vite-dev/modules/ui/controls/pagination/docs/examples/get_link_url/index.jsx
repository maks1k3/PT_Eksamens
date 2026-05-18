import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Pagination from 'ui/controls/pagination';

const title = 'Pagination: getLinkUrl';

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
	center={true}
	getLinkUrl={page => {
		return \`/web_docs/controls/pagination?page=\${page}\`;
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
				center={true}
				getLinkUrl={page => {
					return `/web_docs/controls/pagination?page=${page}`;
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
