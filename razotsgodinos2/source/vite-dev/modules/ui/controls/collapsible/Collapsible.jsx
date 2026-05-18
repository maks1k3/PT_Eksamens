import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithAccordion from './WithAccordion';

import Icon from 'ui/misc/icon';

import styles from './Collapsible.module.less';
import { isFunction, isNull } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	opened: PropTypes.bool,
	lazyLoad: PropTypes.bool,

	title: PropTypes.node,

	//ui customization
	renderHeader: PropTypes.func,

	children: PropTypes.node,

	//callbacks
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onClick: PropTypes.func, // override default onClick

	//from WithAccordion
	accordionContext: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	lazyLoad: false,
	opened: false,
};

class Collapsible extends Component {
	constructor(props) {
		super(props);
		this.name = _g.generateShortId();

		this.mounted = false;

		this.state = {
			inTransition: false,
			shouldOpenOnNextCycle: false,
			shouldCloseOnNextCycle: false,
			height: 0,
			shouldOpen: false,
			isOpened: this.props.opened,
			opened: this.props.opened,
			hasBeenOpened: this.props.opened,
		};

		this.content = React.createRef();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		const { accordionContext } = this.props;

		if (!isNull(accordionContext)) {
			const { Accordion } = accordionContext;
			Accordion.register({ name: this.name, Collapsible: this });
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (this.state.shouldOpenOnNextCycle) {
			this.continueOpen();
		}

		if (this.state.shouldCloseOnNextCycle) {
			this.continueClose();
		}

		if (prevProps.opened !== this.props.opened) {
			if (this.state.isOpened !== this.props.opened) {
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
		this.mounted = false;
		const { accordionContext } = this.props;

		if (!isNull(accordionContext)) {
			const { Accordion } = accordionContext;
			Accordion.unregister({ name: this.name });
		}
		//</editor-fold>
	}

	onTransitionEnd = () => {
		//<editor-fold defaultstate="collapsed" desc="onTransitionEnd">
		const { shouldOpen, inTransition } = this.state;

		if (!inTransition) {
			return;
		}

		if (shouldOpen) {
			if (this.mounted) {
				this.setState(
					{
						inTransition: false,
						opened: true,
						hasBeenOpened: true,
					},
					this.onOpen,
				);
			}
		} else {
			if (this.mounted) {
				this.setState(
					{
						inTransition: false,
						opened: false,
					},
					this.onClose,
				);
			}
		}

		//</editor-fold>
	};

	onClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onClick">

		const { onClick } = this.props;
		if (isFunction(onClick)) {
			onClick({ Collapsible: this });
			return;
		}

		if (this.state.isOpened) {
			this.close();
		} else {
			this.open();
		}
		//</editor-fold>
	};

	open = () => {
		//<editor-fold defaultstate="collapsed" desc="open">
		const { accordionContext } = this.props;

		if (!isNull(accordionContext)) {
			const { Accordion } = accordionContext;
			Accordion.setCurrent({ name: this.name });
		}
		if (this.mounted) {
			this.setState({
				inTransition: true,
				shouldOpenOnNextCycle: true,
				shouldOpen: true,
				isOpened: true,
			});
		}
		//</editor-fold>
	};

	continueOpen = () => {
		//<editor-fold defaultstate="collapsed" desc="continueOpen">
		if (this.mounted) {
			this.setState({
				shouldOpenOnNextCycle: false,
				height: this.content.current.scrollHeight,
			});
		}
		//</editor-fold>
	};

	onOpen = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		const { onOpen } = this.props;
		if (isFunction(onOpen)) {
			onOpen({ Collapsible: this });
		}
		//</editor-fold>
	};

	close = () => {
		//<editor-fold defaultstate="collapsed" desc="close">
		if (this.mounted) {
			this.setState({
				inTransition: true,
				height: this.content.current.scrollHeight,
				shouldCloseOnNextCycle: true,
				shouldOpen: false,
				isOpened: false,
			});
		}
		//</editor-fold>
	};

	continueClose = () => {
		//<editor-fold defaultstate="collapsed" desc="continueClose">
		setTimeout(() => {
			if (this.mounted) {
				this.setState({
					shouldCloseOnNextCycle: false,
					height: 0,
				});
			}
		}, 50);
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { onClose } = this.props;

		if (isFunction(onClose)) {
			onClose({ Collapsible: this });
		}
		//</editor-fold>
	};

	renderHeader = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderHeader">
		const { title, renderHeader } = this.props;
		const { opened: _opened, inTransition, shouldOpen } = this.state;

		const opened = inTransition ? shouldOpen : _opened;

		if (isFunction(renderHeader)) {
			return renderHeader({
				opened,
				title,
				classNames,
				onClick: this.onClick,
				Collapsible: this,
			});
		}

		if (_g.isEmpty(title)) {
			return null;
		}

		return (
			<div className={classNames['header']} onClick={this.onClick}>
				<span className={classNames['title']}>{title}</span>
				<Icon
					className={classNames['caret']}
					provider="fa"
					name={opened ? 'caret-up' : 'caret-down'}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderContent = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { lazyLoad, children } = this.props;
		const { inTransition, height, opened, hasBeenOpened, shouldOpen } =
			this.state;

		let content = children;

		if (lazyLoad) {
			if (!shouldOpen) {
				if (!opened && !hasBeenOpened) {
					content = null;
				}
			}
		}

		const style = {};

		const className = _g.classNames(
			classNames['content'],
			{ [classNames['content_transition']]: inTransition },
			{ [classNames['content_hidden']]: !opened && !inTransition },
		);

		if (inTransition) {
			style.maxHeight = height + 'px';
		}

		return (
			<div
				ref={this.content}
				className={className}
				style={style}
				onTransitionEnd={this.onTransitionEnd}>
				{content}
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		return (
			<Fragment>
				{this.renderHeader(classNames)}
				{this.renderContent(classNames)}
			</Fragment>
		);
	}
}

Collapsible.propTypes = propTypes;

Collapsible.defaultProps = defaultProps;

Collapsible = WithAccordion(Collapsible);

export default Collapsible;
