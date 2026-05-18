import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Projects.module.less';
import Svg1 from './svg/Svg1';
import Svg2 from './svg/Svg2';
import Svg3 from './svg/Svg3';

import Button from 'ui/controls/button';
import getMainUrl from 'helpers/getMainUrl';
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
			our_projects: {
				langData: 'langData',
			},
			home_projects_btn1: {
				langData: 'langData1',
			},
		},
	};
};

class Projects extends Component {
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
		return items.filter((item) => !item.tip_projects);
	};

	onOpenAll = () => {
		window.location.href = getMainUrl(true) + 'projekti';
	};

	openItem = (href) => {
		if (href) window.location.href = href;
	};

	getCardStep = () => {
		const el = this.listRef.current;
		if (!el) return 0;
		const cards = el.querySelectorAll(`.${styles.info_project_card}`);
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

	setStartIndex = (idx) => {
		const total = this.getList().length;
		if (!total) return;

		const next = ((idx % total) + total) % total;

		this.setState({ startIndex: next }, () => {
			if (this.state.isMobile) this.scrollToIndex(next, true);
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
				const sub = item.subtitle || item.translations?.lv?.subtitle || '';
				const href = item.url;

				const isActive = idx === startIndex;

				return (
					<div
						key={item.id || idx}
						className={styles.info_project_card}
						role="button"
						tabIndex={0}
						onClick={() => this.openItem(href)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') this.openItem(href);
						}}
						style={{ cursor: href ? 'pointer' : 'default' }}>
						<div
							className={styles.image}
							style={{
								backgroundImage: item.image?.image
									? `linear-gradient(0deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.10) 100%), url("${item.image.image}")`
									: undefined,
							}}
						/>

						{isActive && <div className={styles.rect} />}

						<div className={styles.card_text_container}>
							<p className={styles.head_text}>{title}</p>

							{isActive && (
								<div className={styles.describtion}>
									Lapene kas liks Tev justies pacilāti
								</div>
							)}

							{!!sub && <p className={styles.text}>{sub}</p>}
						</div>
					</div>
				);
			});
		}

		const visible = this.getVisibleItemsDesktop();

		return visible.map((item, i) => {
			const title = item.title || item.translations?.lv?.title || '';
			const sub = item.subtitle || item.translations?.lv?.subtitle || '';
			const href = item.url;

			const isActive = i === 0;

			return (
				<div
					key={item.id}
					className={styles.info_project_card}
					role="button"
					tabIndex={0}
					onClick={() => this.openItem(href)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') this.openItem(href);
					}}
					style={{ cursor: href ? 'pointer' : 'default' }}>
					<div
						className={styles.image}
						style={{
							backgroundImage: item.image?.image
								? `linear-gradient(0deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.10) 100%), url("${item.image.image}")`
								: undefined,
						}}
					/>

					{isActive && <div className={styles.rect} />}

					<div className={styles.card_text_container}>
						<p className={styles.head_text}>{title}</p>

						{isActive && (
							<div className={styles.describtion}>
								Lapene kas liks Tev justies pacilāti
							</div>
						)}

						{!!sub && <p className={styles.text}>{sub}</p>}
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
					<div className={styles.info_container}>
						<div className={styles.info_container_layout1}>
							<Editable
								edit={{
									name: 'our_projects',
								}}>
								<p>{this.props.langData?.our_Projects}</p>
							</Editable>

							<Button
								theme="custom"
								classNames={{
									wrapper: styles.info_text2,
									wrapper_custom: styles.info_text2,
									title: styles.btnTitle,
								}}
								customTitle={
									<div className={styles.btn_wrap}>
										<Editable
											edit={{
												name: 'home_projects_btn1',
											}}>
											{this.props.langData1?.home_projects_Btn1}
										</Editable>
										<Svg1 />
									</div>
								}
								onClick={this.onOpenAll}
							/>
						</div>

						<div
							className={styles.info_container_layout2}
							ref={this.listRef}
							onScroll={this.handleScroll}>
							{this.renderCards()}
						</div>

						<div className={styles.info_container_layout3}>
							<div className={styles.arrows}>
								<Button
									theme="custom"
									classNames={{
										wrapper: styles.arrow_left,
										wrapper_custom: styles.arrow_left,
									}}
									onClick={this.prev}
									customTitle={<Svg2 />}
								/>

								<Button
									theme="custom"
									classNames={{
										wrapper: styles.arrow_right,
										wrapper_custom: styles.arrow_right,
									}}
									onClick={this.next}
									customTitle={<Svg3 />}
								/>
							</div>

							{this.renderSlider()}
						</div>
					</div>
				</div>
				<div className={styles.rectangle} />
			</div>
		);
	}
}

Projects.propTypes = propTypes;
Projects.defaultProps = defaultProps;
export default WithUi(uiProps)(Projects);
