import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import queryString from 'query-string';

import styles from './Link.module.less';
import {
	get,
	has,
	isFunction,
	isObject,
	isString,
	isUndefined,
} from 'lodash-es';

const propTypes = {
	theme: PropTypes.oneOf(['main', 'content']),
	classNames: PropTypes.object,
	mode: PropTypes.oneOf(['history', 'navigation', 'auto']),
	to: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			path: PropTypes.string,
			params: PropTypes.object,
			hash: PropTypes.string,
		}),
	]),
	replace: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object,
	target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
	disabled: PropTypes.bool,

	onClick: PropTypes.func, //onClick overrides
	onClickCallback: PropTypes.func, //onClick that doesn't override

	children: PropTypes.node,
	scrollTop: PropTypes.bool,
};

const defaultProps = {
	theme: 'main',
	classNames: {},
	disabled: false,
	replace: false,
	to: '#',
	scrollTop: true,
};

class Link extends Component {
	constructor(props) {
		super(props);
	}

	onClick = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { mode, onClick, onClickCallback, target, to, disabled, replace } =
			this.props;

		const configurationMode = !isUndefined(store)
			? get(store.getState(), 'configuration.navigationMode', 'auto')
			: 'auto';

		let _mode = !isUndefined(mode) ? mode : configurationMode;

		const method = replace ? 'replace' : 'push';

		if (disabled) {
			event.preventDefault();
			return;
		}

		if (isUndefined(to)) {
			event.preventDefault();
			return;
		}

		if (isFunction(onClick)) {
			event.preventDefault();
			onClick({ event, Link: this });
			return;
		}

		if (isFunction(onClickCallback)) {
			onClickCallback({ event, Link: this });
		}

		if (to === '#') {
			event.preventDefault();
			return;
		}

		if (
			!event.defaultPrevented && // onClick prevented default
			event.button === 0 && // ignore right clicks
			!target && // let browser handle "target=_blank" etc.
			!this.isModifiedEvent(event) // ignore clicks with modifier keys
		) {
			if (
				_mode === 'history' ||
				(_mode === 'auto' && browser_window.hasHistoryApi)
			) {
				event.preventDefault();

				let parts = {};

				if (isString(to)) {
					parts.path = to;
				} else if (isObject(to)) {
					if (has(to, 'path')) {
						parts.path = to.path;
					}

					if (has(to, 'params')) {
						parts.params = to.params;
					}

					if (has(to, 'hash')) {
						parts.hash = to.hash;
					}
				}

				const { scrollTop } = this.props;

				if (scrollTop) {
					window.scrollTo(0, 0);
				}

				navigation.redirect(parts, method);
				ee.trigger(events.navigation.link, parts);

				if (typeof ga !== 'undefined' && isFunction(ga)) {
					//google analytics
					ga('send', 'pageview', this.createHref());
				}
			}
		}
		//</editor-fold>
	};

	isModifiedEvent = (event) => {
		//<editor-fold defaultstate="collapsed" desc="isModifiedEvent">
		return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
		//</editor-fold>
	};

	createHref = () => {
		//<editor-fold defaultstate="collapsed" desc="createHref">
		const { to } = this.props;
		let href = '';

		if (isString(to)) {
			href = to;
		} else if (isObject(to)) {
			if (has(to, 'path')) {
				href = to.path;
			}

			if (has(to, 'params')) {
				href += '?' + queryString.stringify(to.params);
			}

			if (has(to, 'hash')) {
				href += '#' + to.hash;
			}
		}

		if (_g.isEmpty(href)) {
			href = '#';
		}

		return href;
		//</editor-fold>
	};

	render() {
		const {
			theme,
			classNames: _classNames,
			className: _className,
			mode,
			to,
			replace,
			style,
			target,
			disabled,
			onClick,
			onClickCallback,
			children,
			dispatch,
			scrollTop,
			...props
		} = this.props;

		let classNames = _g.getClassNames(styles, _classNames);

		let className = _g.classNames(
			classNames['wrapper'],
			classNames[`wrapper_${theme}`],
			{ [_className]: !isUndefined(_className) },
		);

		const extra = {};

		//https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
		if (!isUndefined(target)) {
			extra.rel = 'noopener noreferrer';
		}

		return (
			<a
				{...props}
				href={this.createHref()}
				className={className}
				style={style}
				target={target}
				onClick={this.onClick}
				{...extra}>
				{children}
			</a>
		);
	}
}

Link.propTypes = propTypes;

Link.defaultProps = defaultProps;

export default Link;
