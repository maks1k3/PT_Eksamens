import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';
import AddButton from './components/add_button';
import Reorder from './components/reorder';
import Button from 'ui/controls/button';

import styles from './BlogCategories.module.less';

const propTypes = {};

const defaultProps = {};

const config = {
	title: 'Pievienot jaunu Bloga kategoriju',
	popupName: 'blog_category',
	tableName: 'dt_blog_categories',
	action: 'administration/blog/categories/actions',
	search: 'administration/blog/categories/search',
};

class BlogCategories extends Component {
	constructor(props) {
		super(props);
	}

	onReorderClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onReorderClick">
		openPopup({
			name: 'universal',
			data: {},
			settings: {
				hideOnOverlayClick: false,
				showCloseControl: false,
				maxWidth: '600px',
				title: 'Pārkārtot Bloga kategorijas',
			},
			component: Reorder,
		});
		//</editor-fold>
	};

	render() {
		return (
			<Card>
				<Title>Bloga Kategorijas</Title>
				<div className={styles.wrapper}>
					<div>
						<AddButton {...config} />
					</div>
					<div>
						<Button
							title="Pārkārtot Bloga kategorijas"
							theme="primary"
							icon={{
								provider: 'icomoon',
								name: 'sort',
							}}
							onClick={this.onReorderClick}
						/>
					</div>
				</div>
				<Table {...config} />
			</Card>
		);
	}
}

BlogCategories.propTypes = propTypes;

BlogCategories.defaultProps = defaultProps;

export default BlogCategories;
