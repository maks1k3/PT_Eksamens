import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import OnClickOutside from 'utils/on_click_outside';
import { createPortal } from 'react-dom';
import styles from './ContextMenu.module.less';
import { isFunction } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	opened: PropTypes.bool,

	//trigger
	renderTrigger: PropTypes.func,
	children: PropTypes.node,

	//content
	closeOnContentClick: PropTypes.bool,
	content: PropTypes.node.isRequired,

	//callbacks
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onClick: PropTypes.func, // override default onClick
};

const defaultProps = {
	classNames: {},

	opened: false,

	closeOnContentClick: true,
};

const axisPosition = (dDim, wDim, tPos, tDim) => {
	// if options are bigger than window dimension, then render at 0
	if (dDim > wDim) {
		return 0;
	}
	// render at trigger position if possible
	if (tPos + dDim <= wDim) {
		return tPos;
	}
	// aligned to the trigger from the bottom (right)
	if (tPos + tDim - dDim >= 0) {
		return tPos + tDim - dDim;
	}
	// compute center position
	let pos = Math.round(tPos + tDim / 2 - dDim / 2);
	// check top boundary
	if (pos < 0) {
		return 0;
	}
	// check bottom boundary
	if (pos + dDim > wDim) {
		return wDim - dDim;
	}
	// if everything ok, render in center position
	return pos;
};

const computePosition = ({ windowLayout, triggerLayout, contentLayout }) => {
	const { width: wWidth, height: wHeight } = windowLayout;
	const { x: tX, y: tY, height: tHeight, width: tWidth } = triggerLayout;
	const { height: cHeight, width: cWidth } = contentLayout;
	const y = axisPosition(cHeight, wHeight - 20, tY + tHeight, tHeight);
	const x = axisPosition(cWidth, wWidth - 20, tX, tWidth);

	return { x, y };
};

class ContextMenu extends Component {
	constructor(props) {
		super(props);

		this.trigger = React.createRef();
		this.content = React.createRef();

		this.triggerLayout = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};

		this.contentLayout = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};

		this.state = {
			opened: false,
			measureContent: false,
			animateOpen: false,
			animateClose: false,
			hidden: false,
			x: 0,
			y: 0,
		};

		this.subscribedToWheelEvent = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		ee.on(events.contextMenu.close, this.close);
		ee.on(events.browserWindow.widthChange, this.onBrowserWindowResize);
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (this.state.measureContent) {
			this.measureContent();
		}

		if (prevProps.opened !== this.props.opened) {
			if (this.state.opened !== this.props.opened) {
				if (this.props.opened) {
					this.open();
				} else {
					this.close();
				}
			}
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		ee.off(events.contextMenu.close, this.close);
		ee.off(events.browserWindow.widthChange, this.onBrowserWindowResize);

		this.unSubscribeToWheelEvent();
		//</editor-fold>
	}

	onBrowserWindowResize = () => {
		//<editor-fold defaultstate="collapsed" desc="onBrowserWindowResize">
		if (this.state.opened) {
			this.close();
		}
		//</editor-fold>
	};

	onWheel = () => {
		//<editor-fold defaultstate="collapsed" desc="onWheel">
		if (this.state.opened) {
			this.close();
		}
		//</editor-fold>
	};

	subscribeToWheelEvent = () => {
		//<editor-fold defaultstate="collapsed" desc="subscribeToWheelEvent">
		if (!this.subscribedToWheelEvent) {
			this.subscribedToWheelEvent = true;
			// IE9+, Chrome, Safari, Opera
			window.addEventListener('mousewheel', this.onWheel, false);
			// Firefox
			window.addEventListener('DOMMouseScroll', this.onWheel, false);
		}

		//</editor-fold>
	};

	unSubscribeToWheelEvent = () => {
		//<editor-fold defaultstate="collapsed" desc="unSubscribeToWheelEvent">
		if (this.subscribedToWheelEvent) {
			this.subscribedToWheelEvent = false;
			// IE9+, Chrome, Safari, Opera
			window.removeEventListener('mousewheel', this.onWheel, false);
			// Firefox
			window.removeEventListener('DOMMouseScroll', this.onWheel, false);
		}
		//</editor-fold>
	};

	measureTrigger = () => {
		//<editor-fold defaultstate="collapsed" desc="measureTrigger">
		const dimensions = this.trigger.current.getBoundingClientRect();

		this.triggerLayout = {
			x: dimensions.left,
			y: dimensions.top,
			width: dimensions.right - dimensions.left,
			height: dimensions.bottom - dimensions.top,
		};

		this.setState(
			{
				opened: true,
				measureContent: true,
				hidden: true,
				x: 0,
				y: 0,
				animateOpen: false,
				animateClose: false,
			},
			() => {
				this.onOpen();
			},
		);

		//</editor-fold>
	};

	measureContent = () => {
		//<editor-fold defaultstate="collapsed" desc="measureContent">
		const dimensions = this.content.current.getBoundingClientRect();

		this.contentLayout = {
			x: dimensions.left,
			y: dimensions.top,
			width: dimensions.right - dimensions.left,
			height: dimensions.bottom - dimensions.top,
		};

		this.showContent();

		//</editor-fold>
	};

	onClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { onClick } = this.props;
		if (isFunction(onClick)) {
			onClick({ ContextMenu: this });
			return;
		}

		if (this.state.opened) {
			this.close();
		} else {
			this.open();
		}

		//</editor-fold>
	};

	open = () => {
		//<editor-fold defaultstate="collapsed" desc="open">
		this.measureTrigger();
		this.subscribeToWheelEvent();
		//</editor-fold>
	};

	onOpen = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		const { onOpen } = this.props;
		if (isFunction(onOpen)) {
			onOpen({ ContextMenu: this });
		}
		//</editor-fold>
	};

	close = () => {
		//<editor-fold defaultstate="collapsed" desc="close">
		this.unSubscribeToWheelEvent();
		this.setState({
			animateClose: true,
		});
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { onClose } = this.props;

		if (isFunction(onClose)) {
			onClose({ ContextMenu: this });
		}
		//</editor-fold>
	};

	showContent = () => {
		//<editor-fold defaultstate="collapsed" desc="showContent">
		const dimensions = browser_window.getDimensions().viewport;

		const { x, y } = computePosition({
			windowLayout: dimensions,
			triggerLayout: this.triggerLayout,
			contentLayout: this.contentLayout,
		});

		this.setState({
			measureContent: false,
			x: x,
			y: y,
			hidden: false,
			animateOpen: true,
			animateClose: false,
		});

		//</editor-fold>
	};

	onAnimationEnd = () => {
		//<editor-fold defaultstate="collapsed" desc="onAnimationEnd">

		const { animateClose } = this.state;

		if (animateClose) {
			this.setState(
				{
					opened: false,
					measureContent: false,
					animateOpen: false,
					animateClose: false,
					hidden: true,
					x: 0,
					y: 0,
				},
				this.onClose,
			);
		}

		//</editor-fold>
	};

	handleClickOutside = () => {
		//<editor-fold defaultstate="collapsed" desc="handleClickOutside">
		if (!this.state.opened) {
			return;
		}

		this.close();
		//</editor-fold>
	};

	getPositionStyles = () => {
		//<editor-fold defaultstate="collapsed" desc="getPositionStyles">
		const { x, y } = this.state;

		return { top: y, left: x };
		//</editor-fold>
	};

	renderTrigger = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderTrigger">
		const { children, renderTrigger } = this.props;

		if (isFunction(renderTrigger)) {
			return renderTrigger({
				ref: this.trigger,
				children,
				classNames,
				onClick: this.onClick,
				ContextMenu: this,
			});
		}

		return (
			<div
				ref={this.trigger}
				className={classNames['trigger']}
				onClick={this.onClick}>
				{children}
			</div>
		);
		//</editor-fold>
	};

	renderContent = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { opened, animateOpen, animateClose, hidden } = this.state;
		const { content, closeOnContentClick } = this.props;

		if (!opened) {
			return null;
		}

		let extra = {};
		if (closeOnContentClick) {
			extra.onClick = this.close;
		}

		const className = _g.classNames(
			classNames['content'],
			classNames['content_style'],
			{ [classNames['content_open-animation']]: animateOpen },
			{ [classNames['content_close-animation']]: animateClose },
			{ [classNames['content_hidden']]: hidden },
		);

		const _content = (
			<Content handleClickOutside={this.handleClickOutside}>
				<div
					ref={this.content}
					className={className}
					style={this.getPositionStyles()}
					onAnimationEnd={this.onAnimationEnd}
					{...extra}>
					{content}
				</div>
			</Content>
		);

		return createPortal(_content, $('#__context_menu_placeholder')[0]);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		return (
			<Fragment>
				{this.renderTrigger(classNames)}
				{this.renderContent(classNames)}
			</Fragment>
		);
	}
}

ContextMenu.propTypes = propTypes;

ContextMenu.defaultProps = defaultProps;

// ContextMenu = OnClickOutside(ContextMenu, {
// 	outsideClickIgnoreClass: '__context_menu_placeholder',
// });

class Content extends Component {
	constructor(props) {
		super(props);
	}

	handleClickOutside = () => {
		//<editor-fold defaultstate="collapsed" desc="handleClickOutside">
		const { handleClickOutside } = this.props;
		handleClickOutside();
		//</editor-fold>
	};

	render() {
		const { children } = this.props;
		return children;
	}
}

Content.propTypes = {
	handleClickOutside: PropTypes.func.isRequired,
	children: PropTypes.node,
};

Content = OnClickOutside(Content, {
	outsideClickIgnoreClass: '__context_menu_placeholder',
});

export default ContextMenu;
