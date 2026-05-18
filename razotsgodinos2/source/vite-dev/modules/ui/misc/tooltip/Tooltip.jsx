import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

import styles from './Tooltip.less';

const propTypes = {
	classNames: PropTypes.object,
	children: PropTypes.element.isRequired,
	position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'mouse']),
	destroyTooltipOnHide: PropTypes.bool,
	renderContent: PropTypes.func,
	trigger: PropTypes.array,
	title: PropTypes.node,
	renderPortalElements: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onClick: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onMouseMove: PropTypes.func,
	onClickOutside: PropTypes.func,
	positionId: PropTypes.string,
};

const defaultProps = {
	classNames: {},
	position: 'top',
	destroyTooltipOnHide: true,
	trigger: ['hover'],
	title: '',
};

class Tooltip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			x: 0,
			y: 0,
			open: false,
		};
		this.childNode;
		this.portal = React.createRef();
		this.leftChild = false;
		this.mouseXPos = 0;
		this.wasOpened = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.childNode = ReactDOM.findDOMNode(this);
		this.addListeners();
		//</editor-fold>
	}

	componentDidUpdate(prevProps, prevState) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">

		if (
			(!prevState.open && this.state.open) ||
			prevProps.positionId != this.props.positionId
		) {
			let coord = this.childNode.getBoundingClientRect();
			coord.x += window.scrollX;
			coord.y += window.scrollY;
			const { x, y } = this.getPositions(coord);
			this.setState({ x: x, y: y });
		}
		if (prevState.open && !this.state.open) {
			this.setState({ x: 0, y: 0 });
		}

		if (prevProps.children !== this.props.children) {
			if (this.props.children !== false) {
				this.removeListeners();
				this.childNode = ReactDOM.findDOMNode(this);
				this.addListeners();
			}
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.removeListeners();
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Listeners
	 *
	 * ========================================================================*/

	addListeners = () => {
		//<editor-fold defaultstate="collapsed" desc="addListeners">
		const { trigger } = this.props;

		if (trigger.includes('click')) {
			this.childNode.addEventListener('click', this.onClick);
			document.addEventListener('click', this.onClickOutside);
		}
		this.childNode.addEventListener('mousemove', this.onMouseMove);
		if (trigger.includes('hover')) {
			this.childNode.addEventListener('mouseenter', this.onMouseEnter, true);
			this.childNode.addEventListener('mouseleave', this.onMouseLeave, true);
		}

		if (trigger.includes('focus')) {
			this.childNode.addEventListener('focus', this.onFocus);
			this.childNode.addEventListener('blur', this.onBlur);
		}

		// IE9+, Chrome, Safari, Opera
		window.addEventListener('mousewheel', this.onWheel, false);
		// Firefox
		window.addEventListener('DOMMouseScroll', this.onWheel, false);
		// Mobile
		window.addEventListener('touchmove', this.onWheel, false);
		//</editor-fold>
	};

	removeListeners = () => {
		//<editor-fold defaultstate="collapsed" desc="removeListeners">
		this.childNode.removeEventListener('click', this.onClick);
		document.removeEventListener('click', this.onClickOutside);

		this.childNode.removeEventListener('mouseenter', this.onMouseEnter);
		this.childNode.removeEventListener('mousemove', this.onMouseMove);
		this.childNode.removeEventListener('mouseleave', this.onMouseLeave);

		this.childNode.removeEventListener('focus', this.onFocus);
		this.childNode.removeEventListener('blur', this.onBlur);

		// IE9+, Chrome, Safari, Opera
		window.removeEventListener('mousewheel', this.onWheel, false);
		// Firefox
		window.removeEventListener('DOMMouseScroll', this.onWheel, false);
		//Mobile
		window.removeEventListener('touchmove', this.onWheel, false);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onWheel = () => {
		//<editor-fold defaultstate="collapsed" desc="onWheel">
		if (this.state.open) {
			this.setState({ open: false });
		}
		//</editor-fold>
	};

	onFocus = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		const { onFocus } = this.props;

		if (_.isFunction(onFocus)) {
			onFocus(e);
		}

		this.toggle(e, false, true);
		//</editor-fold>
	};

	onBlur = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onBlur">
		const { onBlur } = this.props;

		if (_.isFunction(onBlur)) {
			onBlur(e);
		}

		this.toggle(e, false, false);
		//</editor-fold>
	};

	onMouseEnter = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onMouseEnter">
		const { onMouseEnter } = this.props;

		if (_.isFunction(onMouseEnter)) {
			onMouseEnter(e);
		}
		this.mouseXPos = e.clientX;
		this.toggle(e, false, true);
		//</editor-fold>
	};

	onMouseMove = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onMouseEnter">
		const { onMouseMove } = this.props;

		if (_.isFunction(onMouseMove)) {
			onMouseMove(e);
		}
		this.mouseXPos = e.clientX;
		//</editor-fold>
	};

	onMouseLeave = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onMouseLeave">
		const { onMouseLeave } = this.props;

		if (_.isFunction(onMouseLeave)) {
			onMouseLeave(e);
		}
		this.mouseXPos = e.clientX;
		this.toggle(e, true, false);
		//</editor-fold>
	};

	onClick = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { onClick } = this.props;

		if (_.isFunction(onClick)) {
			onClick(e);
		}

		this.toggle(e);
		//</editor-fold>
	};

	onClickOutside = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onClickOutside">
		const { onClickOutside } = this.props;

		if (!this.state.open) {
			return;
		}

		if (
			!this.childNode.contains(e.target) &&
			this.state.open &&
			!this.portal.current.contains(e.target)
		) {
			if (_.isFunction(onClickOutside)) {
				onClickOutside({ event: e });
			}

			this.setState({ open: false });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	toggle = (e = false, mouseLeave = false, toggle = null) => {
		//<editor-fold defaultstate="collapsed" desc="toggle">
		if (mouseLeave && e !== false) {
			if (this.portal.current !== null) {
				if (this.portal.current.contains(e.toElement)) {
					this.leftChild = true;
					return;
				}
			}
		}

		this.setState((prevState) => {
			const open = toggle == null ? !prevState.open : !!_.toInteger(toggle);

			if (open && !this.wasOpened) {
				this.wasOpened = true;
			}

			return { open: open };
		});
		//</editor-fold>
	};

	getPositions = (coord) => {
		//<editor-fold defaultstate="collapsed" desc="getPositions">
		const { position } = this.props;
		let portalDimensions = this.portal.current.getBoundingClientRect();

		let x = 0;
		let y = 0;
		switch (position) {
			case 'left':
				x = coord.x - portalDimensions.width;
				y = coord.y + coord.height / 2 - portalDimensions.height / 2;
				break;
			case 'top':
				x = coord.x + coord.width / 2 - portalDimensions.width / 2;
				y = coord.y - portalDimensions.height;
				break;
			case 'right':
				x = coord.x + coord.width;
				y = coord.y + coord.height / 2 - portalDimensions.height / 2;
				break;
			case 'bottom':
				x = coord.x + coord.width / 2 - portalDimensions.width / 2;
				y = coord.y + coord.height;
				break;
			case 'mouse':
				x = this.mouseXPos - portalDimensions.left - portalDimensions.width / 2;
				y = coord.y - portalDimensions.height;
				break;
			default:
				x = coord.x - portalDimensions.width;
				y = coord.y + coord.height / 2;
		}

		return { x: x, y: y };
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderPortalElements = () => {
		//<editor-fold defaultstate="collapsed" desc="renderPortalElements">
		const { x, y, open } = this.state;
		const { renderContent, position, renderPortalElements } = this.props;
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const className = _g.classNames(classNames['wrapper'], {
			[classNames['wrapper_closed']]: !open,
		});

		const arrow = _g.classNames(
			classNames['arrow'],
			{ [classNames['arrow-right']]: position == 'left' },
			{ [classNames['arrow-left']]: position == 'right' },
			{ [classNames['arrow-top']]: position == 'bottom' },
			{
				[classNames['arrow-bottom']]: position == 'top' || position == 'mouse',
			},
		);

		let content = _.isFunction(renderContent)
			? renderContent()
			: this.props.title;

		if (_.isFunction(renderPortalElements)) {
			return renderPortalElements({
				top: y,
				left: x,
				mouseLeave: (e) => {
					if (this.leftChild) {
						this.toggle(e, true);
						this.leftChild = false;
					}
				},
				wrapper: className,
				ref: this.portal,
				classNames: classNames,
				content: content,
				arrowStyles: arrow,
			});
		}

		return (
			<div
				style={{
					position: 'absolute',
					top: y,
					left: x,
				}}
				onMouseLeave={(e) => {
					if (this.leftChild) {
						this.toggle(e, true);
						this.leftChild = false;
					}
				}}
				className={className}
				ref={this.portal}>
				<div className={classNames['container']}>
					<div className={arrow} />
					<div className={classNames['content']}>{content}</div>
				</div>
			</div>
		);
		//</editor-fold>
	};

	renderPortal = () => {
		//<editor-fold defaultstate="collapsed" desc="renderPortal">
		const { destroyTooltipOnHide } = this.props;

		const portal = ReactDOM.createPortal(
			this.renderPortalElements(),
			document.body,
		);

		if ((!this.state.open && destroyTooltipOnHide) || !this.wasOpened) {
			return null;
		}

		return portal;
		//</editor-fold>
	};

	render() {
		const { children } = this.props;

		return (
			<Fragment>
				{children}
				{this.renderPortal()}
			</Fragment>
		);
	}
}

Tooltip.propTypes = propTypes;

Tooltip.defaultProps = defaultProps;

export default Tooltip;
