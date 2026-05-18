import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './Content.module.less';

const propTypes = {};
const defaultProps = {};
const uiProps = () => ({});

class Content extends Component {
	formatDate = (dateString) => {
		if (!dateString) return '';

		const date = new Date(String(dateString).replace(' ', 'T'));
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		return `${day} / ${month} / ${year}`;
	};

	render() {
		const { blog } = this.props;

		return (
			<div className={styles.wrapper}>
				<div className={styles.left}>
					{!!blog?.created_at && (
						<div className={styles.date}>
							{this.formatDate(blog.created_at)}
						</div>
					)}

					<div className={styles.title}>{blog?.title}</div>

					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: blog?.lang_data?.content || '' }}
					/>
				</div>

				<div className={styles.right}>
					<div className={styles.category}>
						{blog?.categories && Object.values(blog.categories).length > 0
							? Object.values(blog.categories)[0].title
							: ''}
					</div>
				</div>
			</div>
		);
	}
}

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default WithUi(uiProps)(Content);
