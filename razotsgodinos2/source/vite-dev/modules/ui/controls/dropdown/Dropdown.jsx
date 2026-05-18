import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

import OnClickOutside from 'utils/on_click_outside';
import styles from './Dropdown.module.less';
import { isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	animate: PropTypes.bool,

	absolutelyPositioned: PropTypes.bool,
	adjustAbsolutePosition: PropTypes.func,
	getTriggerRef: PropTypes.func,

	trigger: PropTypes.node,
	renderTrigger: PropTypes.any,
	content: PropTypes.node.isRequired,

	lazyLoad: PropTypes.bool,

	align: PropTypes.oneOf([
		'bottom-left',
		'bottom-right',
		'top-left',
		'top-right',
		'auto',
	]),

	closeOnOutsideClick: PropTypes.bool,
	closeOnContentClick: PropTypes.bool,

	//callbacks
	onOpen: PropTypes.func,
	onClose: PropTypes.func,

	opened: PropTypes.bool,
};

const defaultProps = {
	classNames: {},
	animate: false,
	closeOnOutsideClick: true,
	closeOnContentClick: true,
	lazyLoad: false,
	align: 'bottom-right',
	opened: false,
	absolutelyPositioned: false,
};

class Dropdown extends Component {
	constructor(props) {
		super(props);

		this.trigger = React.createRef();
		this.contentNode = React.createRef();

		this.absolutePosition = {
			width: 0,
			left: 0,
			top: 0,
		};

		this.state = {
			opened: this.props.opened,
			hasBeenOpened: this.props.opened,
			autoAlign: 'bottom-right',
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { getTriggerRef } = this.props;

		if (isFunction(getTriggerRef)) {
			this.trigger = getTriggerRef();
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">

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

	getAbsolutePosition = () => {
		//<editor-fold defaultstate="collapsed" desc="getAbsolutePosition">
		const result = {
			width: 0,
			left: 0,
			top: 0,
		};

		const { adjustAbsolutePosition } = this.props;

		if (this.trigger.current) {
			const width = $(this.trigger.current).outerWidth();
			const height = $(this.trigger.current).outerHeight();
			const offset = $(this.trigger.current).offset();

			result.width = width;
			result.top = offset.top + height;
			result.left = offset.left;

			if (isFunction(adjustAbsolutePosition)) {
				adjustAbsolutePosition(result);
			}
		}

		return result;
		//</editor-fold>
	};

	toggle = () => {
		//<editor-fold defaultstate="collapsed" desc="toggle">
		const { opened } = this.state;
		if (opened) {
			this.close();
		} else {
			this.open();
		}
		//</editor-fold>
	};

	open = () => {
		//<editor-fold defaultstate="collapsed" desc="open">
		const { absolutelyPositioned, align } = this.props;
		const { opened } = this.state;
		if (opened) {
			return;
		}

		if (absolutelyPositioned) {
			this.absolutePosition = this.getAbsolutePosition();
		}

		let autoAlign = this.state.autoAlign;
		if (align === 'auto') {
			autoAlign = this.getAutoAlign();
		}

		this.setState(
			{
				opened: true,
				hasBeenOpened: true,
				autoAlign,
			},
			this.onOpen,
		);

		//</editor-fold>
	};

	onOpen = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		const { onOpen } = this.props;
		if (isFunction(onOpen)) {
			onOpen({ Dropdown: this });
		}
		//</editor-fold>
	};

	close = () => {
		//<editor-fold defaultstate="collapsed" desc="close">
		const { opened } = this.state;

		if (!opened) {
			return;
		}

		this.setState(
			{
				opened: false,
			},
			this.onClose,
		);
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { onClose } = this.props;

		if (isFunction(onClose)) {
			onClose({ Dropdown: this });
		}
		//</editor-fold>
	};

	handleClickOutside = () => {
		//<editor-fold defaultstate="collapsed" desc="handleClickOutside">
		const { closeOnOutsideClick } = this.props;

		if (!closeOnOutsideClick) {
			return;
		}

		this.close();
		//</editor-fold>
	};

	getAutoAlign = () => {
		//<editor-fold defaultstate="collapsed" desc="getAutoAlign">
		let result = 'bottom-right';

		if (this.contentNode.current && this.trigger.current) {
			const triggerOffset = $(this.trigger.current).offset();
			const triggerHeight = $(this.trigger.current).outerHeight();
			const contentHeight = $(this.contentNode.current).outerHeight();
			const viewport = browser_window.getDimensions().viewport;
			const windowScrollTop = $(window).scrollTop();

			const spaceDown =
				windowScrollTop +
				viewport.height -
				(triggerOffset.top + triggerHeight + contentHeight);

			if (spaceDown < 0) {
				result = 'top-right';
			}
		}

		return result;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderTrigger = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderTrigger">
		const { trigger, renderTrigger } = this.props;

		if (isFunction(renderTrigger)) {
			return renderTrigger({
				classNames,
				onClick: this.toggle,
				Dropdown: this,
			});
		} else if (!isUndefined(renderTrigger)) {
			return renderTrigger;
		}

		return (
			<div
				ref={this.trigger}
				className={classNames['trigger']}
				onClick={this.toggle}>
				{trigger}
			</div>
		);
		//</editor-fold>
	};

	renderContent = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		let { content } = this.props;

		const {
			lazyLoad,
			align,
			closeOnContentClick,
			animate,
			absolutelyPositioned,
		} = this.props;
		const { opened, hasBeenOpened } = this.state;

		if (lazyLoad) {
			if (!opened && !hasBeenOpened) {
				content = null;
			}
		}

		let extra = {};
		if (closeOnContentClick) {
			extra.onClick = this.close;
		}

		const _align = align === 'auto' ? this.state.autoAlign : align;

		const className = _g.classNames(
			classNames['content'],
			classNames['content_' + _align],
			{ [classNames['content_animate']]: animate },
			{ [classNames['content_opened']]: opened },
			{ [classNames['content_closed']]: !opened },
			classNames['content_style'],
		);

		if (absolutelyPositioned && opened) {
			const { width, top, left } = this.absolutePosition;
			extra.style = {
				width: width,
				top: top,
				left: left,
			};
		}

		content = (
			<div ref={this.contentNode} className={className} {...extra}>
				{content}
			</div>
		);

		if (absolutelyPositioned && opened) {
			return createPortal(content, $('#__context_menu_placeholder')[0]);
		}

		return content;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const { opened } = this.state;
		const trigger = this.renderTrigger(classNames);
		const content = this.renderContent(classNames);

		const className = _g.classNames(
			classNames['wrapper'],
			{ [classNames['wrapper_opened']]: opened },
			{ [classNames['wrapper_closed']]: !opened },
		);

		return (
			<div className={className}>
				{trigger}
				{content}
			</div>
		);
	}
}

Dropdown.propTypes = propTypes;

Dropdown.defaultProps = defaultProps;

Dropdown = OnClickOutside(Dropdown, {
	outsideClickIgnoreClass: '__context_menu_placeholder',
});

export default Dropdown;
