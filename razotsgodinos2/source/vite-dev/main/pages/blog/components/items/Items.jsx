import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './Items.module.less';
import LoadingPlaceholder from './components/loading_placeholder/LoadingPlaceholder';
import Image from 'ui/media/image';
import Button from 'ui/controls/button';
import Svg1 from 'main/pages/blog/components/svg/SvgAdd';
import Editable from 'cms/editable';

const propTypes = {};
const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		content: {
			add_more_btn: {
				langData: 'langData',
			},
		},
	};
};

const PAGE_SIZE = 6;

class Items extends Component {
	state = {
		visibleCount: PAGE_SIZE,
	};

	componentDidUpdate(prevProps) {
		if (prevProps.items !== this.props.items) {
			this.setState({ visibleCount: PAGE_SIZE });
		}
	}

	getFilteredItems = () => {
		const { items = [] } = this.props;
		return items.filter((item) => !item.tip_projects);
	};

	loadMore = () => {
		this.setState((prev) => ({
			visibleCount: prev.visibleCount + PAGE_SIZE,
		}));
	};

	renderItems = () => {
		const { loading } = this.props;
		const { visibleCount } = this.state;

		if (loading) {
			return (
				<>
					<LoadingPlaceholder />
					<LoadingPlaceholder />
					<LoadingPlaceholder />
				</>
			);
		}

		const filtered = this.getFilteredItems();
		const visible = filtered.slice(0, visibleCount);

		return (
			<>
				{visible.map((item) => {
					const title = item.title || item.translations?.lv?.title || '';
					const href = item.url;

					return (
						<div
							key={item.id}
							className={styles.item}
							role="button"
							tabIndex={0}
							onClick={() => {
								if (href) window.location.href = href;
							}}
							onKeyDown={(e) => {
								if ((e.key === 'Enter' || e.key === ' ') && href) {
									window.location.href = href;
								}
							}}
							style={{ cursor: href ? 'pointer' : 'default' }}>
							{item.image && (
								<Image
									src={item.image.thumbnail || item.image.image}
									alt={title}
									className={styles.image}
								/>
							)}

							{!!title && (
								<div className={styles.overlay}>
									<div className={styles.imageTitle}>{title}</div>
									<div className={styles.describtion}>
										Lapene kas liks Tev justies pacilāti
									</div>
								</div>
							)}
						</div>
					);
				})}
			</>
		);
	};

	render() {
		const { className = '', containerClassName = '', loading } = this.props;
		const { visibleCount } = this.state;

		const filtered = this.getFilteredItems();
		const hasMore = visibleCount < filtered.length;

		return (
			<div className={`${styles.wrapper} ${className}`}>
				<div className={`${styles.container} ${containerClassName}`}>
					{this.renderItems()}
				</div>

				{hasMore && (
					<Button
						theme="custom"
						type="button"
						onClick={this.loadMore}
						disabled={loading}
						classNames={{
							wrapper: styles.addBtn,
							wrapper_custom: styles.addBtn,
							title: styles.addTitle,
						}}
						customTitle={
							<>
								<span className={styles.addText}>
									<Editable
										edit={{
											name: 'add_more_btn',
										}}>
										{this.props.langData?.add_more}
									</Editable>
								</span>
								<Svg1 />
							</>
						}
					/>
				)}
			</div>
		);
	}
}

Items.propTypes = propTypes;
Items.defaultProps = defaultProps;

export default WithUi(uiProps)(Items);
