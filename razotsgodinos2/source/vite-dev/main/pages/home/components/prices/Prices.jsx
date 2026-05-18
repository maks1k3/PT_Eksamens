// Prices.jsx
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Prices.module.less';
import Svg6 from './svg/Svg6';
import Svg7 from './svg/Svg7';
import Svg8 from './svg/Svg8';

import Button from 'ui/controls/button';
import getMainUrl from 'helpers/getMainUrl';
import Image from 'ui/media/image';
import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';

const propTypes = {
	items: PropTypes.array,
	loading: PropTypes.bool,
};

const defaultProps = {
	items: [],
	loading: false,
};

const uiProps = (ownProps) => {
	return {
		content: {
			tip_projects_title: {
				langData: 'langData1',
			},
			tip_projects_text: {
				langData: 'langData2',
			},
			tip_projects_btn: {
				langData: 'langData3',
			},
			home_tip_btn1: {
				langData: 'langData4',
			},
		},
	};
};

class Prices extends Component {
	constructor(props) {
		super(props);

		this.state = {
			startIndex: 0,
			isMobile: false,
		};

		this.listRef = React.createRef();
		this._raf = null;
	}

	componentDidMount() {
		this.updateIsMobile();
		window.addEventListener('resize', this.updateIsMobile);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateIsMobile);
		if (this._raf) cancelAnimationFrame(this._raf);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.items !== this.props.items) {
			this.setState({ startIndex: 0 }, () => {
				if (this.state.isMobile) this.scrollToIndex(0, false);
			});
		}

		if (prevState.isMobile !== this.state.isMobile) {
			if (this.state.isMobile) {
				this.scrollToIndex(this.state.startIndex, false);
			}
		}
	}

	updateIsMobile = () => {
		const isMobile =
			window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

		if (isMobile !== this.state.isMobile) {
			this.setState({ isMobile });
		}
	};

	visibleCount = 4;

	getList = () => {
		const { items } = this.props;
		if (!Array.isArray(items)) return [];
		return items.filter((i) => i.tip_projects);
	};

	openItem = (href) => {
		if (href) window.location.href = href;
	};

	getCardStep = () => {
		const el = this.listRef.current;
		if (!el) return 0;
		const cards = el.querySelectorAll(`.${styles.info_price_card}`);
		if (!cards.length) return 0;
		const r0 = cards[0].getBoundingClientRect();

		if (cards.length > 1) {
			const r1 = cards[1].getBoundingClientRect();
			const step = Math.round(r1.left - r0.left);
			return step > 0 ? step : Math.round(r0.width);
		}

		return Math.round(r0.width);
	};

	scrollToIndex = (idx, smooth = true) => {
		const el = this.listRef.current;
		if (!el) return;
		const step = this.getCardStep();
		if (!step) return;
		el.scrollTo({
			left: idx * step,
			behavior: smooth ? 'smooth' : 'auto',
		});
	};

	setStartIndex = (idx) => {
		const total = this.getList().length;
		if (!total) return;
		const next = ((idx % total) + total) % total;
		this.setState({ startIndex: next }, () => {
			if (this.state.isMobile) this.scrollToIndex(next, true);
		});
	};

	prev = () => {
		const total = this.getList().length;
		if (!total) return;

		this.setState(
			(s) => ({
				startIndex: (s.startIndex - 1 + total) % total,
			}),
			() => {
				if (this.state.isMobile)
					this.scrollToIndex(this.state.startIndex, true);
			},
		);
	};

	next = () => {
		const total = this.getList().length;
		if (!total) return;

		this.setState(
			(s) => ({
				startIndex: (s.startIndex + 1) % total,
			}),
			() => {
				if (this.state.isMobile)
					this.scrollToIndex(this.state.startIndex, true);
			},
		);
	};

	getVisibleItemsDesktop = () => {
		const list = this.getList();
		const total = list.length;
		const { startIndex } = this.state;

		if (!total) return [];

		const res = [];
		for (let i = 0; i < Math.min(this.visibleCount, total); i++) {
			res.push(list[(startIndex + i) % total]);
		}
		return res;
	};

	handleScroll = () => {
		if (!this.state.isMobile) return;

		if (this._raf) return;

		this._raf = requestAnimationFrame(() => {
			this._raf = null;
			const el = this.listRef.current;
			if (!el) return;
			const total = this.getList().length;
			if (!total) return;
			const step = this.getCardStep();
			if (!step) return;
			const idx = Math.round(el.scrollLeft / step);
			const clamped = Math.max(0, Math.min(total - 1, idx));
			if (clamped !== this.state.startIndex) {
				this.setState({ startIndex: clamped });
			}
		});
	};

	renderCards() {
		const { loading } = this.props;
		const { isMobile, startIndex } = this.state;
		if (loading) return null;
		if (isMobile) {
			const list = this.getList();

			return list.map((item, idx) => {
				const title = item.title || item.translations?.lv?.title || '';
				const href = item.url;

				const price =
					item.price ??
					item.lang_data?.price ??
					item.translations?.lv?.data?.price ??
					item.translations?.lv?.price ??
					'';

				const size =
					item.lang_data?.size ??
					item.translations?.lv?.data?.size ??
					item.size ??
					item.translations?.lv?.size ??
					'';
				const isActive = idx === startIndex;
				return (
					<div
						key={item.id || idx}
						className={styles.info_price_card}
						role="button"
						tabIndex={0}
						onClick={() => this.openItem(href)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') this.openItem(href);
						}}
						style={{ cursor: href ? 'pointer' : 'default' }}
						data-active={isActive ? 'true' : 'false'}>
						{item.image && (
							<Image
								src={item.image.thumbnail || item.image.image}
								alt={title}
								className={styles.imageEl}
							/>
						)}

						{!!price && <div className={styles.price}>{price} €</div>}

						<div className={styles.overlay}>
							<div className={styles.imageTitle}>{title}</div>
							{!!size && <div className={styles.size}>{size}</div>}
						</div>
					</div>
				);
			});
		}

		const visible = this.getVisibleItemsDesktop();
		return visible.map((item, i) => {
			const title = item.title || item.translations?.lv?.title || '';
			const href = item.url;

			const price =
				item.price ??
				item.lang_data?.price ??
				item.translations?.lv?.data?.price ??
				item.translations?.lv?.price ??
				'';

			const size =
				item.lang_data?.size ??
				item.translations?.lv?.data?.size ??
				item.size ??
				item.translations?.lv?.size ??
				'';
			const isActive = i === 0;

			return (
				<div
					key={item.id || `${item.id}-${i}`}
					className={styles.info_price_card}
					role="button"
					tabIndex={0}
					onClick={() => this.openItem(href)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') this.openItem(href);
					}}
					style={{ cursor: href ? 'pointer' : 'default' }}
					data-active={isActive ? 'true' : 'false'}>
					{item.image && (
						<Image
							src={item.image.thumbnail || item.image.image}
							alt={title}
							className={styles.imageEl}
						/>
					)}

					{!!price && <div className={styles.price}>{price} €</div>}

					<div className={styles.overlay}>
						<div className={styles.imageTitle}>{title}</div>
						{!!size && <div className={styles.size}>{size}</div>}
					</div>
				</div>
			);
		});
	}

	renderSlider() {
		const total = this.getList().length;
		const { startIndex } = this.state;

		if (total <= 1) return null;

		return (
			<div className={styles.sliderWrap}>
				<div className={styles.slider}>
					{Array.from({ length: total }).map((_, idx) => {
						const isActive = idx === startIndex;

						return (
							<button
								key={idx}
								type="button"
								className={`${styles.segment} ${
									isActive ? styles.segmentActive : ''
								}`}
								onClick={() => this.setStartIndex(idx)}
								aria-label={`Go to slide ${idx + 1}`}
								aria-current={isActive ? 'true' : undefined}
							/>
						);
					})}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.info}>
					<div className={styles.info_wrapper}>
						<div className={styles.layout1}>
							<div className={styles.text_container}>
								<Editable
									edit={{
										name: 'tip_projects_title',
									}}>
									<p className={styles.head_text}>
										{this.props.langData1?.tip_projects_Title}
									</p>
								</Editable>
								<Editable
									edit={{
										name: 'tip_projects_text',
									}}>
									<p className={styles.text}>
										{this.props.langData2?.tip_projects_Text}
									</p>
								</Editable>
							</div>

							<Button
								theme="custom"
								type="button"
								classNames={{
									wrapper: styles.tip_projects_Btn,
									wrapper_custom: styles.tip_projects_Btn,
									title: styles.tip_projects_Title,
								}}
								customTitle={
									<>
										<span className={styles.tip_projects_Text}>
											<Editable
												edit={{
													name: 'home_tip_btn1',
												}}>
												{this.props.langData4?.home_tip_Btn1}
											</Editable>
										</span>
										<Svg6 />
									</>
								}
								onClick={() => {
									window.location.href = getMainUrl(true) + 'cenu-kalkulators';
								}}
							/>
						</div>

						<div
							className={styles.layout2}
							ref={this.listRef}
							onScroll={this.handleScroll}>
							{this.renderCards()}
						</div>

						<div className={styles.layout3}>
							<div className={styles.arrows}>
								<Button
									theme="custom"
									classNames={{
										wrapper: styles.arrow_left,
										wrapper_custom: styles.arrow_left,
									}}
									onClick={this.prev}
									customTitle={<Svg7 />}
								/>

								<Button
									theme="custom"
									classNames={{
										wrapper: styles.arrow_right,
										wrapper_custom: styles.arrow_right,
									}}
									onClick={this.next}
									customTitle={<Svg8 />}
								/>
							</div>

							{this.renderSlider()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Prices.propTypes = propTypes;

Prices.defaultProps = defaultProps;

export default WithUi(uiProps)(Prices);
