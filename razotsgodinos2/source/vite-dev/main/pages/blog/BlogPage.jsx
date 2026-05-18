import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import Categories from './components/categories/Categories';
import Items from './components/items/Items';
import { head } from 'lodash-es';

const propTypes = {};
const defaultProps = {};

const uiProps = () => ({});

class BlogPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: null,
			items: [],
			loading: true,
			sort: 'newest',
		};
	}

	componentDidMount() {
		this.getData();
	}

	sortItems = (rows) => {
		const { sort } = this.state;
		const list = Array.isArray(rows) ? [...rows] : [];

		list.sort((a, b) => {
			const da =
				new Date(String(a?.created_at || '').replace(' ', 'T')).getTime() || 0;
			const db =
				new Date(String(b?.created_at || '').replace(' ', 'T')).getTime() || 0;
			return sort === 'newest' ? db - da : da - db;
		});

		return list;
	};

	getData = (category_id = null) => {
		this.setState({ loading: true });

		remoteRequest({
			url: 'blog/search',
			data: { category_id },
			onSuccess: (response) => {
				const rows = response?.rows || [];
				this.setState({
					loading: false,
					items: this.sortItems(rows),
				});
			},
			onError: (response) => {
				this.setState({ loading: false });
				showAlert({ content: response.msg });
			},
		});
	};

	setCategory = (category_id = null) => {
		this.setState({ category: category_id }, () => {
			this.getData(category_id);
		});
	};

	setSort = (sort) => {
		this.setState((prev) => {
			const nextItems = [...(prev.items || [])].sort((a, b) => {
				const da =
					new Date(String(a?.created_at || '').replace(' ', 'T')).getTime() ||
					0;
				const db =
					new Date(String(b?.created_at || '').replace(' ', 'T')).getTime() ||
					0;
				return sort === 'newest' ? db - da : da - db;
			});

			return { sort, items: nextItems };
		});
	};

	render() {
		const { category, items, loading, sort } = this.state;

		return (
			<>
				<Categories
					setCategory={this.setCategory}
					setSort={this.setSort}
					sort={sort}
					loading={loading}
					active_category={category}
				/>
				<Items items={items} loading={loading} />
			</>
		);
	}
}

BlogPage.propTypes = propTypes;
BlogPage.defaultProps = defaultProps;

BlogPage = WithUi((ownProps) => {
	return {
		images: {
			[head(ownProps.images)]: 'image',
		},
	};
})(BlogPage);

export default WithUi(uiProps)(BlogPage);
