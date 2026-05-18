import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import CarouselContainer from './CarouselContainer';

import Icon from 'ui/misc/icon';

import styles from './Carousel.module.less';
import {
	chunk,
	concat,
	flatten,
	isFunction,
	isNull,
	map,
	size,
	take,
	takeRight,
} from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	pageMode: PropTypes.bool,
	centerMode: PropTypes.bool, //works only if pageMode is false and infinite is true
	items: PropTypes.array,
	getGridProps: PropTypes.func,
	current: PropTypes.number, //current item or page if multiple

	multiple: PropTypes.bool, //show multiple items. Use getGridProps to specify minWidth and gutter
	draggable: PropTypes.bool, //drag with mouse
	dragTershold: PropTypes.number, //number of px to ignore when swiping or dragging
	swipeable: PropTypes.bool, //swipe with fingers
	changeOnMouseWheel: PropTypes.bool, //change items when mouse wheel is scrolled
	infinite: PropTypes.bool,
	autoplay: PropTypes.bool,
	preventAutoPlayFromStopping: PropTypes.bool,
	autoplaySpeed: PropTypes.number,
	autoplayCooldown: PropTypes.number, //number of miliseconds to wait if user iteracts with Carousel
	fade: PropTypes.bool,
	transitionDuration: PropTypes.number, //transition duration in ms
	transitionEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'linear']),

	renderItem: PropTypes.func.isRequired,
	showArrows: PropTypes.bool,
	renderArrow: PropTypes.func,
	showDots: PropTypes.bool,
	renderDot: PropTypes.func,
	render: PropTypes.func,

	onCurrentChange: PropTypes.func,
	onOffsetChange: PropTypes.func,

	//custom ref
	getRef: PropTypes.func,

	//from container
	containerWidth: PropTypes.number.isRequired,
	columnWidth: PropTypes.number.isRequired,
	itemsWidth: PropTypes.number.isRequired,
	numberOfDots: PropTypes.number.isRequired,
	columns: PropTypes.number.isRequired,
	gridItemWidth: PropTypes.string.isRequired,
	gutter: PropTypes.number.isRequired,
};

const defaultProps = {
	classNames: {},
	pageMode: true,
	centerMode: false,
	items: [],
	current: 0,
	// getGridProps: () => {
	// 	const minWidth = 200;
	// 	const gutter = 10;
	//
	// 	return { minWidth, gutter };
	// },
	multiple: false,
	draggable: false,
	dragTershold: 20,
	swipeable: true,
	changeOnMouseWheel: false,
	infinite: false,
	autoplay: false,
	preventAutoPlayFromStopping: false,
	autoplaySpeed: 10000, //10 seconds
	autoplayCooldown: 20000, //20 seconds
	fade: false,
	transitionDuration: 500,
	transitionEasing: 'ease',

	showArrows: true,
	showDots: true,
};

class Carousel extends Component {
	constructor(props) {
		super(props);

		this.mounted = false;

		this.lock = false;

		this.container = React.createRef();
		this.itemsWrapper = React.createRef();
		this.itemsContainer = React.createRef();

		this.autoplayInterval = null;
		this.autoplayStartTimeout = null;

		this.mouseDown = false;
		this.start = { x: 0, y: 0 };
		this.currentOffsetMovement = 0;
		this.transitionDirection = null;

		const { current } = this.props;

		this.offset = this.getOffsetForCurrent(current);

		this.isTouchdevice = browser_window.isTouchDevice;

		this.state = {
			inTransition: false,
			current: current,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		const {
			autoplay,
			autoplaySpeed,
			draggable,
			swipeable,
			getRef,
			preventAutoPlayFromStopping,
			changeOnMouseWheel,
		} = this.props;

		if (isFunction(getRef)) {
			getRef(this);
		}

		if (autoplay) {
			this.autoplayInterval = setInterval(this.autoplay, autoplaySpeed);
		}

		this.setOffset(this.offset);

		if (draggable || swipeable) {
			let events = `${draggable ? 'mousedown' : ''} ${
				swipeable ? 'touchstart' : ''
			}`;
			$(this.itemsWrapper.current).on(events, this.onMouseDown);

			events = `${draggable ? 'mouseup mouseleave' : ''} ${
				swipeable ? 'touchend' : ''
			}`;
			$(this.itemsWrapper.current).on(events, this.onMouseUp);

			events = `${draggable ? 'mousemove' : ''} ${
				swipeable ? 'touchmove' : ''
			}`;
			$(this.itemsWrapper.current).on(events, this.onMouseMove);
		}

		if (changeOnMouseWheel) {
			this.itemsWrapper.current.addEventListener('wheel', this.onWheel, {
				passive: false,
			});
		}

		if (autoplay && !preventAutoPlayFromStopping) {
			$(this.container.current).on(
				'mouseenter touchstart',
				this.onStopAutoPlay,
			);
			$(this.container.current).on('mouseleave touchend', this.onStartAutoPlay);
		}

		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.current !== this.props.current) {
			if (this.state.current !== this.props.current) {
				this.offset = this.getOffsetForCurrent(this.props.current);
				this.setOffset(this.offset);
				this.setState({
					current: this.props.current,
				});
			}
		}

		if (
			prevProps.containerWidth !== this.props.containerWidth ||
			prevProps.items.length !== this.props.items.length ||
			prevProps.columnWidth !== this.props.columnWidth
		) {
			this.isTouchdevice = browser_window._isTouchDevice();
			this.reset();
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		const {
			draggable,
			swipeable,
			autoplay,
			preventAutoPlayFromStopping,
			changeOnMouseWheel,
		} = this.props;

		if (draggable || swipeable) {
			let events = `${draggable ? 'mousedown' : ''} ${
				swipeable ? 'touchstart' : ''
			}`;
			$(this.itemsWrapper.current).off(events, this.onMouseDown);

			events = `${draggable ? 'mouseup mouseleave' : ''} ${
				swipeable ? 'touchend' : ''
			}`;
			$(this.itemsWrapper.current).off(events, this.onMouseUp);

			events = `${draggable ? 'mousemove' : ''} ${
				swipeable ? 'touchmove' : ''
			}`;
			$(this.itemsWrapper.current).off(events, this.onMouseMove);
		}

		if (!isNull(this.autoplayInterval)) {
			clearInterval(this.autoplayInterval);
		}

		if (!isNull(this.autoplayStartTimeout)) {
			clearTimeout(this.autoplayStartTimeout);
		}

		if (autoplay && !preventAutoPlayFromStopping) {
			$(this.container.current).off(
				'mouseenter touchstart',
				this.onStopAutoPlay,
			);
			$(this.container.current).off(
				'mouseleave touchend',
				this.onStartAutoPlay,
			);
		}

		if (changeOnMouseWheel) {
			this.itemsWrapper.current.removeEventListener('wheel', this.onWheel);
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	reset = () => {
		//<editor-fold defaultstate="collapsed" desc="reset">
		this.lock = false;
		this.mouseDown = false;
		this.start = { x: 0, y: 0 };
		this.currentOffsetMovement = 0;

		const { numberOfDots } = this.props;

		let current =
			this.props.current > numberOfDots - 1 ? 0 : this.props.current;
		this.offset = this.getOffsetForCurrent(current);
		this.setOffset(this.offset);
		this.setState({
			current: current,
		});
		this.onCurrentChange(this.props.current);
		//</editor-fold>
	};

	setOffset = (offset, finalOffset = null) => {
		//<editor-fold defaultstate="collapsed" desc="setOffset">
		const { transitionDuration, transitionEasing, fade } = this.props;

		if (fade || !this.mounted) {
			return;
		}

		this.lock = true;

		const container = $(this.itemsContainer.current);

		let styles = {};

		styles.transform = `translateX(${-offset}px)`;

		styles.transition = `transform ${transitionDuration}ms ${transitionEasing}`;

		this.setState({ inTransition: true }, () => {
			container.css(styles);
			if (isNull(finalOffset)) {
				this.onOffsetChange(offset);
			}

			setTimeout(() => {
				styles = {};
				styles.transition = '';

				if (!isNull(finalOffset)) {
					styles.transform = `translateX(${-finalOffset}px)`;
				}
				this.transitionDirection = null;
				if (this.mounted) {
					this.setState({ inTransition: false }, () => {
						container.css(styles);
						this.onOffsetChange(isNull(finalOffset) ? offset : finalOffset);
						this.lock = false;
					});
				}
			}, transitionDuration);
		});

		//</editor-fold>
	};

	getOffsetForCurrent = (current) => {
		//<editor-fold defaultstate="collapsed" desc="getOffsetForCurrent">
		const { pageMode } = this.props;

		return pageMode
			? this.getOffsetForPage(current)
			: this.getOffsetForItem(current);
		//</editor-fold>
	};

	isLeftArrowDisabled = () => {
		//<editor-fold defaultstate="collapsed" desc="isLeftArrowDisabled">
		const { infinite, pageMode } = this.props;
		const offset = this.offset;

		if (infinite) {
			return false;
		}

		if (pageMode) {
			if (!this.hasPreviousPage()) {
				return true;
			}
		} else {
			if (offset <= 0) {
				return true;
			}
		}

		return false;
		//</editor-fold>
	};

	isRightArrowDisabled = () => {
		//<editor-fold defaultstate="collapsed" desc="isRightArrowDisabled">
		const { infinite, itemsWidth, pageMode, columns, columnWidth, centerMode } =
			this.props;
		const offset = this.offset;

		if (infinite) {
			return false;
		}

		if (pageMode) {
			if (!this.hasNextPage()) {
				return true;
			}
		} else {
			if (centerMode) {
				return offset >= itemsWidth - columns * columnWidth - columnWidth / 2;
			} else if (offset >= itemsWidth - columns * columnWidth) {
				return true;
			}
		}

		return false;
		//</editor-fold>
	};

	hasNextPage = () => {
		//<editor-fold defaultstate="collapsed" desc="hasNextPage">
		const { numberOfDots, infinite } = this.props;
		const { current } = this.state;

		if (infinite) {
			return true;
		}

		return current + 1 < numberOfDots;
		//</editor-fold>
	};

	hasPreviousPage = () => {
		//<editor-fold defaultstate="collapsed" desc="hasPreviousPage">
		const { infinite } = this.props;
		const { current } = this.state;

		if (infinite) {
			return true;
		}

		return current - 1 >= 0;
		//</editor-fold>
	};

	getOffsetForPage = (page) => {
		//<editor-fold defaultstate="collapsed" desc="getOffsetForPage">
		const { items, infinite, fade, columns, columnWidth } = this.props;

		let newOffset;

		const chunks = chunk(items, columns);
		const currentItems = take(chunks, page + 1);

		newOffset =
			columnWidth * size(flatten(currentItems)) - columns * columnWidth;

		if (infinite && !fade) {
			newOffset = newOffset + columnWidth * columns;
		}

		if (newOffset < 0) {
			newOffset = 0;
		}

		return newOffset;
		//</editor-fold>
	};

	getOffsetForItem = (current) => {
		//<editor-fold defaultstate="collapsed" desc="getOffsetForItem">
		const { infinite, fade, columnWidth, centerMode, columns } = this.props;

		let newOffset;

		newOffset = columnWidth * current;

		if (infinite && !fade) {
			newOffset = newOffset + columnWidth * columns;
		}

		if (newOffset < 0) {
			newOffset = 0;
		}

		if (centerMode) {
			newOffset -= 0.5 * (columnWidth * columns) - columnWidth / 2;
		}

		return newOffset;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Autoplay
	 *
	 * ========================================================================*/

	startAutoPlay = () => {
		//<editor-fold defaultstate="collapsed" desc="startAutoPlay">
		const { autoplay, autoplaySpeed, autoplayCooldown } = this.props;

		if (!autoplay) {
			return;
		}

		if (!isNull(this.autoplayInterval)) {
			clearInterval(this.autoplayInterval);
			this.autoplayInterval = null;
		}

		if (!isNull(this.autoplayStartTimeout)) {
			clearTimeout(this.autoplayStartTimeout);
			this.autoplayStartTimeout = null;
		}

		this.autoplayStartTimeout = setTimeout(() => {
			this.autoplayInterval = setInterval(this.autoplay, autoplaySpeed);
		}, autoplayCooldown);
		//</editor-fold>
	};

	stopAutoPlay = () => {
		//<editor-fold defaultstate="collapsed" desc="stopAutoPlay">
		const { autoplay } = this.props;

		if (!autoplay) {
			return;
		}

		if (!isNull(this.autoplayInterval)) {
			clearInterval(this.autoplayInterval);
			this.autoplayInterval = null;
		}
		//</editor-fold>
	};

	autoplay = () => {
		//<editor-fold defaultstate="collapsed" desc="autoplay">
		const { pageMode } = this.props;

		if (pageMode) {
			if (this.hasNextPage()) {
				this.nextPage();
			} else {
				this.setPage(0);
			}
		} else {
			if (!this.isRightArrowDisabled()) {
				this.next();
			} else {
				this.setItem(0);
			}
		}
		//</editor-fold>
	};

	onStartAutoPlay = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onStartAutoPlay">
		if (
			this.isTouchDevice &&
			_g.inArray(event.type, ['mouseenter', 'mouseleave'])
		) {
			return;
		}
		this.startAutoPlay();
		//</editor-fold>
	};

	onStopAutoPlay = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onStopAutoPlay">
		if (
			this.isTouchDevice &&
			_g.inArray(event.type, ['mouseenter', 'mouseleave'])
		) {
			return;
		}

		this.stopAutoPlay();
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Controls
	 *
	 * ========================================================================*/

	previous = () => {
		//<editor-fold defaultstate="collapsed" desc="previous">
		if (this.lock) {
			return;
		}

		const disabled = this.isLeftArrowDisabled();

		if (disabled) {
			return;
		}

		const { infinite, fade, numberOfDots, columnWidth } = this.props;

		const { current } = this.state;

		let _current = current - 1;

		let item = _current < 0 ? numberOfDots - 1 : _current;

		let newOffset = this.getOffsetForItem(item);
		let finalOffset = null;

		if (infinite && !fade) {
			if (_current < 0) {
				this.transitionDirection = 'left';
				finalOffset = newOffset;
				newOffset = this.offset - columnWidth;
			}
		}

		this.offset = isNull(finalOffset) ? newOffset : finalOffset;

		this.setOffset(newOffset, finalOffset);

		this.setState({
			current: item,
		});
		this.onCurrentChange(item);
		//</editor-fold>
	};

	previousPage = () => {
		//<editor-fold defaultstate="collapsed" desc="previousPage">
		if (this.lock) {
			return;
		}

		if (!this.hasPreviousPage()) {
			return;
		}

		const { infinite, fade, numberOfDots } = this.props;

		const { current } = this.state;

		let _current = current - 1;

		let page = _current < 0 ? numberOfDots - 1 : _current;

		let newOffset = this.getOffsetForPage(page);
		let finalOffset = null;

		if (infinite && !fade) {
			if (_current < 0) {
				finalOffset = newOffset;
				newOffset = 0;
			}
		}

		this.offset = isNull(finalOffset) ? newOffset : finalOffset;

		this.setOffset(newOffset, finalOffset);

		this.setState({
			current: page,
		});
		this.onCurrentChange(page);
		//</editor-fold>
	};

	next = () => {
		//<editor-fold defaultstate="collapsed" desc="next">
		if (this.lock) {
			return;
		}
		const disabled = this.isRightArrowDisabled();

		if (disabled) {
			return;
		}

		const { columnWidth, infinite, fade, numberOfDots } = this.props;

		const { current } = this.state;

		let _current = current + 1;

		let item = _current > numberOfDots - 1 ? 0 : _current;

		let newOffset = this.getOffsetForItem(item);
		let finalOffset = null;

		if (infinite && !fade) {
			if (_current > numberOfDots - 1) {
				finalOffset = newOffset;
				newOffset = this.offset + columnWidth;
				this.transitionDirection = 'right';
			}
		}

		this.offset = isNull(finalOffset) ? newOffset : finalOffset;

		this.setOffset(newOffset, finalOffset);

		this.setState({
			current: item,
		});
		this.onCurrentChange(item);
		//</editor-fold>
	};

	nextPage = () => {
		//<editor-fold defaultstate="collapsed" desc="nextPage">
		if (this.lock) {
			return;
		}

		if (!this.hasNextPage()) {
			return;
		}

		const { infinite, fade, numberOfDots, itemsWidth, columns, columnWidth } =
			this.props;

		const { current } = this.state;

		let _current = current + 1;

		let page = _current > numberOfDots - 1 ? 0 : _current;

		let newOffset = this.getOffsetForPage(page);
		let finalOffset = null;

		if (infinite && !fade) {
			if (_current > numberOfDots - 1) {
				finalOffset = newOffset;
				newOffset = itemsWidth - columns * columnWidth;
			}
		}

		this.offset = isNull(finalOffset) ? newOffset : finalOffset;

		this.setOffset(newOffset, finalOffset);

		this.setState({
			current: page,
		});
		this.onCurrentChange(page);
		//</editor-fold>
	};

	setPage = (page) => {
		//<editor-fold defaultstate="collapsed" desc="setPage">
		if (this.lock) {
			return;
		}

		this.offset = this.getOffsetForPage(page);
		this.setOffset(this.offset);
		this.setState({
			current: page,
		});

		this.onCurrentChange(page);
		//</editor-fold>
	};

	setItem = (item) => {
		//<editor-fold defaultstate="collapsed" desc="setItem">
		if (this.lock) {
			return;
		}

		this.offset = this.getOffsetForItem(item);
		this.setOffset(this.offset);
		this.setState({
			current: item,
		});

		this.onCurrentChange(item);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	onMouseDown = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onMouseDown">
		if (this.lock) {
			return;
		}

		this.mouseDown = true;
		const point = _g.pointerEventToXY(event);

		this.start = point;
		//</editor-fold>
	};

	onMouseUp = () => {
		//<editor-fold defaultstate="collapsed" desc="onMouseUp">
		if (this.lock) {
			return;
		}

		const mouseWasUp = this.mouseDown;
		this.mouseDown = false;

		if (mouseWasUp) {
			const { dragTershold, pageMode } = this.props;

			const changeCurrent =
				Math.abs(this.currentOffsetMovement) >= dragTershold;

			if (pageMode) {
				if (
					changeCurrent &&
					this.currentOffsetMovement > 0 &&
					this.hasNextPage()
				) {
					this.nextPage();
				} else if (
					changeCurrent &&
					this.currentOffsetMovement < 0 &&
					this.hasPreviousPage()
				) {
					this.previousPage();
				} else {
					this.setOffset(this.offset);
				}
			} else {
				if (changeCurrent && this.currentOffsetMovement > 0) {
					this.next();
				} else if (changeCurrent && this.currentOffsetMovement < 0) {
					this.previous();
				} else {
					this.setOffset(this.offset);
				}
			}
		}

		this.currentOffsetMovement = 0;
		//</editor-fold>
	};

	onMouseMove = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onMouseMove">
		if (this.lock) {
			return;
		}

		if (!this.mouseDown) {
			return;
		}

		const point = _g.pointerEventToXY(event);

		this.currentOffsetMovement = this.start.x - point.x;

		const { fade } = this.props;

		if (fade) {
			return;
		}

		$(this.itemsContainer.current).css(
			'transform',
			`translateX(${-(this.offset + this.currentOffsetMovement)}px)`,
		);
		//</editor-fold>
	};

	onWheel = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onWheel">
		event.preventDefault();

		const { pageMode } = this.props;

		const { deltaY } = event;

		if (deltaY < 0) {
			if (pageMode) {
				this.previousPage();
			} else {
				this.previous();
			}
		} else {
			if (pageMode) {
				this.nextPage();
			} else {
				this.next();
			}
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onOffsetChange = (offset) => {
		//<editor-fold defaultstate="collapsed" desc="onOffsetChange">
		const { onOffsetChange } = this.props;

		if (isFunction(onOffsetChange)) {
			onOffsetChange({ offset, Carousel: this });
		}
		//</editor-fold>
	};

	onCurrentChange = (current) => {
		//<editor-fold defaultstate="collapsed" desc="onCurrentChange">
		const { onCurrentChange } = this.props;

		if (isFunction(onCurrentChange)) {
			onCurrentChange({ current, Carousel: this });
		}
		//</editor-fold>
	};

	onDotClick = (index) => {
		//<editor-fold defaultstate="collapsed" desc="onDotClick">
		const { current, pageMode } = this.state;

		if (index === current) {
			return;
		}

		if (pageMode) {
			this.setPage(index);
		} else {
			this.setItem(index);
		}
		//</editor-fold>
	};

	onLeftArrowClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onLeftArrowClick">
		const { pageMode } = this.props;

		if (pageMode) {
			this.previousPage();
		} else {
			this.previous();
		}
		//</editor-fold>
	};

	onRightArrowClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onRightArrowClick">
		const { pageMode } = this.props;

		if (pageMode) {
			this.nextPage();
		} else {
			this.next();
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderLeftArrow = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLeftArrow">
		const { showArrows, renderArrow, numberOfDots } = this.props;

		if (!showArrows || numberOfDots === 1) {
			return null;
		}

		const disabled = this.isLeftArrowDisabled();

		if (isFunction(renderArrow)) {
			return renderArrow({
				classNames,
				direction: 'left',
				onClick: this.onLeftArrowClick,
				disabled,
				Carousel: this,
			});
		}

		const className = _g.classNames(
			classNames['arrow'],
			classNames['arrow-left'],
			{
				[classNames['arrow_disabled']]: disabled,
			},
		);

		return (
			<Icon
				className={className}
				provider="fa"
				name="caret-left"
				onClick={this.onLeftArrowClick}
			/>
		);
		//</editor-fold>
	};

	renderRightArrow = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderRightArrow">
		const { showArrows, numberOfDots, renderArrow } = this.props;

		if (!showArrows || numberOfDots === 1) {
			return null;
		}

		const disabled = this.isRightArrowDisabled();

		if (isFunction(renderArrow)) {
			return renderArrow({
				classNames,
				direction: 'right',
				onClick: this.onRightArrowClick,
				disabled,
				Carousel: this,
			});
		}

		const className = _g.classNames(
			classNames['arrow'],
			classNames['arrow-right'],
			{
				[classNames['arrow_disabled']]: disabled,
			},
		);

		return (
			<Icon
				className={className}
				provider="fa"
				name="caret-right"
				onClick={this.onRightArrowClick}
			/>
		);
		//</editor-fold>
	};

	renderArrows = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderArrows">
		return (
			<Fragment>
				{this.renderLeftArrow(classNames)} {this.renderRightArrow(classNames)}
			</Fragment>
		);
		//</editor-fold>
	};

	renderDots = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderDots">
		const { showDots, renderDot, numberOfDots } = this.props;
		const { current } = this.state;

		if (!showDots || numberOfDots === 1) {
			return null;
		}

		const dots = [];

		for (let i = 0; i < numberOfDots; i++) {
			dots.push(i);
		}

		const _dots = map(dots, (dot, index) => {
			const active = index === current;

			const onClick = () => {
				this.onDotClick(index);
			};

			if (isFunction(renderDot)) {
				return renderDot({
					classNames,
					index,
					active,
					onClick: onClick,
					Carousel: this,
				});
			}

			const className = _g.classNames(classNames['dot'], {
				[classNames['dot_active']]: active,
			});

			return <div key={index} className={className} onClick={onClick} />;
		});

		const className = _g.classNames('clearfix', classNames['dots-wrapper']);

		return <div className={className}>{_dots}</div>;
		//</editor-fold>
	};

	renderItems = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderItems">
		const { infinite, items, itemsWidth, containerWidth, fade, columns } =
			this.props;

		let _items = [];

		if (infinite && !fade) {
			if (size(items) < columns) {
				let j = 0;
				for (let i = 0; i < columns * 2; i++) {
					if (items[j]) {
						_items[i] = items[j];
					}

					if (j >= size(items) - 1) {
						j = 0;
					} else {
						j++;
					}
				}

				j = size(items) - 1;
				for (let i = 0; i < columns; i++) {
					if (items[j]) {
						_items.unshift(items[j]);
					}

					if (j <= 0) {
						j = size(items) - 1;
					} else {
						j--;
					}
				}

				_items = map(_items, this.renderItem);
			} else {
				let leftItems = takeRight(items, columns);
				let rightItems = take(items, columns);

				_items = map(concat(leftItems, items, rightItems), this.renderItem);
			}
		} else {
			_items = map(items, this.renderItem);
		}

		const style = {};
		style.width = itemsWidth;

		return (
			<div
				ref={this.itemsWrapper}
				className={classNames['items-outer-wrapper']}
				style={{ width: containerWidth }}>
				<div
					ref={this.itemsContainer}
					className={`clearfix ${classNames['items-wrapper']}`}
					style={style}>
					{_items}
				</div>
			</div>
		);
		//</editor-fold>
	};

	renderItem = (item, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { current, inTransition } = this.state;
		const classNames = this.classNames;
		const {
			fade,
			centerMode,
			renderItem,
			containerWidth,
			gridItemWidth,
			gutter,
			columnWidth,
			transitionDuration,
			transitionEasing,
			columns,
			items,
		} = this.props;

		let isInCenter = false;

		if (centerMode) {
			isInCenter = current === index - columns;

			if (inTransition && !isNull(this.transitionDirection)) {
				if (this.transitionDirection === 'left') {
					isInCenter = index === columns - 1;
				} else if (this.transitionDirection === 'right') {
					isInCenter = index === size(items) + 2 * columns - columns;
				}
			}
		}

		const content = renderItem({
			item,
			index,
			classNames,
			gridItemWidth,
			isInCenter,
			Carousel: this,
		});

		const style = {};

		if (gridItemWidth !== '100%') {
			style.width = columnWidth - gutter;
			style.marginLeft = gutter / 2;
			style.marginRight = gutter / 2;
		} else {
			style.width = containerWidth;
		}

		if (fade) {
			const isActive = index === current;
			style.opacity = isActive ? 1 : 0;

			if (isActive) {
				style.zIndex = isActive ? 2 : 1;
			}

			style.position = 'relative';
			style.top = 0;
			style.left = -(index * containerWidth);
			style.transition = `opacity ${transitionDuration}ms ${transitionEasing}`;
		}

		return (
			<div key={index} className={classNames['item']} style={style}>
				{content}
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const arrows = this.renderArrows(classNames);
		const dots = this.renderDots(classNames);
		const items = this.renderItems(classNames);

		const { render } = this.props;

		if (isFunction(render)) {
			return render({
				classNames,
				arrows,
				dots,
				items,
				containerRef: this.container,
				Carousel: this,
			});
		}

		return (
			<div ref={this.container}>
				<div className={classNames['wrapper']}>
					{arrows} {items}
				</div>
				{dots}
			</div>
		);
	}
}

Carousel.propTypes = propTypes;

Carousel.defaultProps = defaultProps;

export default CarouselContainer(Carousel);
