import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Pagination from 'ui/controls/pagination';

const title = 'Pagination: controlled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Pagination from 'ui/controls/pagination';

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
		};
	}

	render() {
		const { page } = this.state;
		return (
			<Pagination
				controlled={true}
				pageCount={10} //total number of pages
				pageRangeDisplayed={2} //range of pages displayed
				marginPagesDisplayed={1} //number of pages to display for margins
				page={page}
				onPageChange={({ page, Pagination }) => {
					this.setState({
						page: page,
					});
				}}
			/>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
		};
	}

	render() {
		const { page } = this.state;
		return (
			<Pagination
				controlled={true}
				pageCount={10} //total number of pages
				pageRangeDisplayed={2} //range of pages displayed
				marginPagesDisplayed={1} //number of pages to display for margins
				page={page}
				onPageChange={({ page, Pagination }) => {
					this.setState({
						page: page,
					});
				}}
			/>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Test />
		</ExampleHolder>
	);
};

export default Example;
