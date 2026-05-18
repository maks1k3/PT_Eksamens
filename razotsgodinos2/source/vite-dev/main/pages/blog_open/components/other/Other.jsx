import React, { PureComponent as Component } from 'react';
import WithUi from 'hoc/store/ui';
import Image from 'ui/media/image';
import styles from './Other.module.less';

const uiProps = () => ({});

class Other extends Component {
	goTo = (href) => {
		if (href) window.location.href = href;
	};

	renderCard = (item) => {
		if (!item) return null;

		const title = item.title || item.translations?.lv?.title || '';
		const href = item.url;

		return (
			<div
				key={item.id}
				className={styles.card}
				role="button"
				tabIndex={0}
				onClick={() => this.goTo(href)}
				onKeyDown={(e) => {
					if ((e.key === 'Enter' || e.key === ' ') && href) {
						this.goTo(href);
					}
				}}>
				{item.image && (
					<Image
						src={item.image.thumbnail || item.image.image}
						alt={title}
						className={styles.cardImage}
					/>
				)}

				{!!title && <div className={styles.cardTitle}>{title}</div>}
			</div>
		);
	};

	render() {
		const items = (this.props.other_blog || []).filter(
			(item) => !item?.tip_projects,
		);

		if (items.length < 2) return null;

		const currentIndex =
			typeof this.props.currentIndex === 'number' &&
			this.props.currentIndex >= 0
				? this.props.currentIndex
				: 0;

		const prevIndex = (currentIndex - 1 + items.length) % items.length;
		const nextIndex = (currentIndex + 1) % items.length;

		const first = items[prevIndex];
		const second = items[nextIndex];

		return (
			<div className={styles.container}>
				<div className={styles.itemsWrapper}>
					<div className={styles.grid}>
						{first && this.renderCard(first)}
						{second && this.renderCard(second)}
					</div>

					{first?.url && (
						<button
							type="button"
							className={`${styles.option} ${styles.optionLeft}`}
							onClick={(e) => {
								e.stopPropagation();
								this.goTo(first.url);
							}}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									d="M15.5302 18.9698C15.5999 19.0395 15.6552 19.1222 15.6929 19.2132C15.7306 19.3043 15.75 19.4019 15.75 19.5004C15.75 19.599 15.7306 19.6965 15.6929 19.7876C15.6552 19.8786 15.5999 19.9614 15.5302 20.031C15.4606 20.1007 15.3778 20.156 15.2868 20.1937C15.1957 20.2314 15.0982 20.2508 14.9996 20.2508C14.9011 20.2508 14.8035 20.2314 14.7124 20.1937C14.6214 20.156 14.5387 20.1007 14.469 20.031L6.96899 12.531C6.89926 12.4614 6.84394 12.3787 6.80619 12.2876C6.76845 12.1966 6.74902 12.099 6.74902 12.0004C6.74902 11.9019 6.76845 11.8043 6.80619 11.7132C6.84394 11.6222 6.89926 11.5394 6.96899 11.4698L14.469 3.96979C14.6097 3.82906 14.8006 3.75 14.9996 3.75C15.1986 3.75 15.3895 3.82906 15.5302 3.96979C15.671 4.11052 15.75 4.30139 15.75 4.50042C15.75 4.69944 15.671 4.89031 15.5302 5.03104L8.55993 12.0004L15.5302 18.9698Z"
									fill="white"
								/>
							</svg>
							<span className={styles.text}>
								Iepriekšējais <span className={styles.hide}>projekts</span>
							</span>
						</button>
					)}

					{second?.url && (
						<button
							type="button"
							className={`${styles.option} ${styles.optionRight}`}
							onClick={(e) => {
								e.stopPropagation();
								this.goTo(second.url);
							}}>
							<span className={styles.text}>
								Nākamais <span className={styles.hide}>projekts</span>
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									d="M8.46979 5.03021C8.40006 4.96054 8.34475 4.87782 8.307 4.78676C8.26926 4.6957 8.24983 4.5981 8.24983 4.49958C8.24983 4.40106 8.26926 4.30346 8.307 4.2124C8.34475 4.12134 8.40006 4.03862 8.46979 3.96896C8.53946 3.89929 8.62218 3.84397 8.71324 3.80623C8.8043 3.76849 8.9019 3.74906 9.00042 3.74906C9.09894 3.74906 9.19654 3.76849 9.2876 3.80623C9.37866 3.84397 9.46138 3.89929 9.53104 3.96896L17.031 11.469C17.1007 11.5386 17.1561 11.6213 17.1938 11.7124C17.2316 11.8034 17.251 11.901 17.251 11.9996C17.251 12.0981 17.2316 12.1957 17.1938 12.2868C17.1561 12.3778 17.1007 12.4606 17.031 12.5302L9.53104 20.031C9.39031 20.171 9.19944 20.25 9.00042 20.25C8.80139 20.25 8.61052 20.171 8.46979 20.031C8.32906 19.8903 8.25 19.6994 8.25 19.5004C8.25 19.3014 8.32906 19.1105 8.46979 18.9698L15.4401 12.0004L8.46979 5.03021Z"
									fill="white"
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
		);
	}
}

export default WithUi(uiProps)(Other);
