import React, { PureComponent as Component } from 'react';
import WithUi from 'hoc/store/ui';
import Image from 'ui/media/image';
import styles from './OtherTip.module.less';

const uiProps = () => ({});

class OtherTip extends Component {
	goTo = (href) => {
		if (href) window.location.href = href;
	};

	getTitle = (item) => item?.title || item?.translations?.lv?.title || '';

	getPrice = (item) =>
		item?.price ??
		item?.lang_data?.price ??
		item?.translations?.lv?.data?.price ??
		'';

	getSize = (item) =>
		item?.lang_data?.size ?? item?.translations?.lv?.data?.size ?? '';

	renderCard = (item) => {
		const title = this.getTitle(item);
		const price = this.getPrice(item);
		const size = this.getSize(item);
		const href = item?.url;

		return (
			<div
				key={item.id}
				className={styles.item}
				role="button"
				tabIndex={0}
				onClick={() => this.goTo(href)}
				onKeyDown={(e) => {
					if ((e.key === 'Enter' || e.key === ' ') && href) {
						this.goTo(href);
					}
				}}>
				{item?.image && (
					<Image
						src={item.image.thumbnail || item.image.image}
						alt={title}
						className={styles.image}
					/>
				)}

				{!!price && <div className={styles.price}>{price} €</div>}

				<div className={styles.overlay}>
					{!!title && <div className={styles.imageTitle}>{title}</div>}
					{!!size && <div className={styles.size}>{size}</div>}
				</div>
			</div>
		);
	};

	render() {
		const items = (this.props.other_blog || []).filter(
			(item) => !!item?.tip_projects,
		);

		if (items.length < 2) return null;

		const currentIndex =
			typeof this.props.currentIndex === 'number' &&
			this.props.currentIndex >= 0
				? this.props.currentIndex
				: 0;

		const prevIndex = (currentIndex - 1 + items.length) % items.length;
		const nextIndex = (currentIndex + 1) % items.length;

		const prev = items[prevIndex];
		const next = items[nextIndex];

		return (
			<div className={styles.container}>
				<div className={styles.itemsWrapper}>
					<div className={styles.grid}>
						{prev && this.renderCard(prev)}
						{next && this.renderCard(next)}
					</div>
				</div>
			</div>
		);
	}
}

export default WithUi(uiProps)(OtherTip);
