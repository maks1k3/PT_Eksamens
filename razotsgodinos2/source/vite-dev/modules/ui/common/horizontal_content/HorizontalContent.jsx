import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Responsive from 'hoc/responsive';

import Icon from 'ui/misc/icon';

import styles from './HorizontalContent.module.less';

const propTypes = {
	classNames: PropTypes.object,
	height: PropTypes.string,
	scrollOnMouseWheel: PropTypes.bool,
	mouseWheelScrollDistance: PropTypes.number,

	items: PropTypes.array,
	renderItem: PropTypes.func.isRequired,
	showArrows: PropTypes.bool,
	renderArrow: PropTypes.func,
	arrowClickScrollDistance: PropTypes.number,
	arrowClickScrollDuration: PropTypes.number,
	render: PropTypes.func,

	onOffsetChange: PropTypes.func,
	initialOffset: PropTypes.number,

	draggable: PropTypes.bool, //drag with mouse
	swipeable: PropTypes.bool, //swipe with fingers

	//custom ref
	getRef: PropTypes.func,

	//from hoc
	containerWidth: PropTypes.number,
};

const defaultProps = {
	classNames: {},
	scrollOnMouseWheel: false,
	mouseWheelScrollDistance: 50,
	items: [],
	showArrows: true,
	arrowClickScrollDistance: 200,
	arrowClickScrollDuration: 500,
	initialOffset: 0,

	draggable: false,
	swipeable: true,
};

class HorizontalContent extends Component {
	constructor(props) {
		super(props);

		this.container = React.createRef();
		this.mouseDown = false;
		this.start = { x: 0, y: 0 };
		this.offset = this.props.initialOffset;
		this.currentOffsetMovement = 0;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { draggable, swipeable, getRef } = this.props;

		if (_.isFunction(getRef)) {
			getRef(this);
		}

		this.setOffset(this.offset);

		if (draggable || swipeable) {
			let events = `${draggable ? 'mousedown' : ''} ${
				swipeable ? 'touchstart' : ''
			}`;
			$(this.container.current).on(events, this.onMouseDown);

			events = `${draggable ? 'mouseup mouseleave' : ''} ${
				swipeable ? 'touchend' : ''
			}`;
			$(this.container.current).on(events, this.onMouseUp);

			events = `${draggable ? 'mousemove' : ''} ${
				swipeable ? 'touchmove' : ''
			}`;
			$(this.container.current).on(events, this.onMouseMove);
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.containerWidth !== this.props.containerWidth) {
			this.reset();
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { draggable, swipeable } = this.props;

		if (draggable || swipeable) {
			let events = `${draggable ? 'mousedown' : ''} ${
				swipeable ? 'touchstart' : ''
			}`;
			$(this.container.current).off(events, this.onMouseDown);

			events = `${draggable ? 'mouseup mouseleave' : ''} ${
				swipeable ? 'touchend' : ''
			}`;
			$(this.container.current).off(events, this.onMouseUp);

			events = `${draggable ? 'mousemove' : ''} ${
				swipeable ? 'touchmove' : ''
			}`;
			$(this.container.current).off(events, this.onMouseMove);
		}
		//</editor-fold>
	}

	/* ========================================================================*
 *
 *                     Methods
 *
 * ========================================================================*/

	clampOffest = offset => {
		//<editor-fold defaultstate="collapsed" desc="clampOffest">
		if (offset < 0) {
			offset = 0;
		}

		const container = this.container.current;
		const maxOffset = container.scrollWidth - container.clientWidth;

		if (offset >= maxOffset) {
			offset = maxOffset;
		}

		return offset;
		//</editor-fold>
	};

	reset = () => {
		//<editor-fold defaultstate="collapsed" desc="reset">
		this.mouseDown = false;
		this.start = { x: 0, y: 0 };
		this.offset = this.props.initialOffset;
		this.currentOffsetMovement = 0;
		this.setOffset(this.offset);
		//</editor-fold>
	};

	setOffset = (offset, animate = false) => {
		//<editor-fold defaultstate="collapsed" desc="setOffset">
		if (animate) {
			const { arrowClickScrollDuration } = this.props;
			$(this.container.current).animate(
				{ scrollLeft: offset },
				arrowClickScrollDuration,
			);
		} else {
			this.container.current.scrollLeft = offset;
		}

		this.onOffsetChange(this.offset);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	onMouseDown = event => {
		//<editor-fold defaultstate="collapsed" desc="onMouseDown">
		this.mouseDown = true;
		const point = _g.pointerEventToXY(event);

		this.start = point;
		//</editor-fold>
	};

	onMouseUp = () => {
		//<editor-fold defaultstate="collapsed" desc="onMouseUp">
		const mouseWasUp = this.mouseDown;
		this.mouseDown = false;

		if (mouseWasUp) {
			this.offset = this.clampOffest(this.offset + this.currentOffsetMovement);
			this.onOffsetChange(this.offset);
		}

		this.currentOffsetMovement = 0;
		//</editor-fold>
	};

	onMouseMove = event => {
		//<editor-fold defaultstate="collapsed" desc="onMouseMove">
		if (!this.mouseDown) {
			return;
		}

		const point = _g.pointerEventToXY(event);

		this.currentOffsetMovement = this.start.x - point.x;

		this.container.current.scrollLeft = this.clampOffest(
			this.offset + this.currentOffsetMovement,
		);

		//</editor-fold>
	};

	onWheel = event => {
		//<editor-fold defaultstate="collapsed" desc="onWheel">
		event.preventDefault();

		const { mouseWheelScrollDistance } = this.props;

		const { deltaY } = event;

		if (deltaY < 0) {
			this.offset = this.clampOffest(this.offset - mouseWheelScrollDistance);
			this.setOffset(this.offset);
		} else {
			this.offset = this.clampOffest(this.offset + mouseWheelScrollDistance);
			this.setOffset(this.offset);
		}
		//</editor-fold>
	};

	/* ========================================================================*
 	 *
 	 *                     Callbacks
 	 *
 	 * ========================================================================*/

	onOffsetChange = offset => {
		//<editor-fold defaultstate="collapsed" desc="onOffsetChange">
		const { onOffsetChange } = this.props;

		if (_.isFunction(onOffsetChange)) {
			onOffsetChange({ offset, HorizontalContent: this });
		}
		//</editor-fold>
	};

	onLeftArrowClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onLeftArrowClick">
		const { arrowClickScrollDistance } = this.props;
		this.offset = this.clampOffest(this.offset - arrowClickScrollDistance);
		this.setOffset(this.offset, true);
		//</editor-fold>
	};

	onRightArrowClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onRightArrowClick">
		const { arrowClickScrollDistance } = this.props;
		this.offset = this.clampOffest(this.offset + arrowClickScrollDistance);
		this.setOffset(this.offset, true);
		//</editor-fold>
	};

	/* ========================================================================*
 *
 *                     Renderers
 *
 * ========================================================================*/

	renderLeftArrow = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderLeftArrow">
		const { showArrows, renderArrow } = this.props;

		if (!showArrows) {
			return null;
		}

		if (_.isFunction(renderArrow)) {
			return renderArrow({
				classNames,
				direction: 'left',
				onClick: this.onLeftArrowClick,
				HorizontalContent: this,
			});
		}

		const className = _g.classNames(
			classNames['arrow'],
			classNames['arrow-left'],
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

	renderRightArrow = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderRightArrow">
		const { showArrows, renderArrow } = this.props;

		if (!showArrows) {
			return null;
		}

		if (_.isFunction(renderArrow)) {
			return renderArrow({
				classNames,
				direction: 'right',
				onClick: this.onRightArrowClick,
				HorizontalContent: this,
			});
		}

		const className = _g.classNames(
			classNames['arrow'],
			classNames['arrow-right'],
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

	renderArrows = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderArrows">
		return (
			<Fragment>
				{this.renderLeftArrow(classNames)} {this.renderRightArrow(classNames)}
			</Fragment>
		);
		//</editor-fold>
	};

	renderItems = () => {
		//<editor-fold defaultstate="collapsed" desc="renderItems">
		const { items } = this.props;

		return _.map(items, this.renderItem);
		//</editor-fold>
	};

	renderItem = (item, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">

		const classNames = this.classNames;
		const { renderItem } = this.props;

		const content = renderItem({
			item,
			index,
			classNames,
			HorizontalContent: this,
		});

		return (
			<div key={index} className={classNames['item']}>
				{content}
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;
		const { height, containerWidth, scrollOnMouseWheel, render } = this.props;

		const style = {};

		style.width = containerWidth;
		style.height = height;

		const extra = {};

		if (scrollOnMouseWheel) {
			extra.onWheel = this.onWheel;
		}

		const arrows = this.renderArrows(classNames);
		const items = this.renderItems(classNames);

		if (_.isFunction(render)) {
			return render({
				classNames,
				arrows,
				style,
				items,
				extra,
				containerRef: this.container,
				HorizontalContent: this,
			});
		}

		return (
			<div className={classNames['outer-wrapper']}>
				{arrows}
				<div
					ref={this.container}
					className={classNames['wrapper']}
					style={style}
					{...extra}>
					{items}
				</div>
			</div>
		);
	}
}

HorizontalContent.propTypes = propTypes;

HorizontalContent.defaultProps = defaultProps;

HorizontalContent = Responsive()(HorizontalContent);

export default HorizontalContent;
