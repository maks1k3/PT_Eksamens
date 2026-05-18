import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Thumbnail.module.less';
import { isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	src: PropTypes.string.isRequired,
	width: PropTypes.string,
	height: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	onClick: PropTypes.func,
	showPlayIcon: PropTypes.bool,
	title: PropTypes.string,
	lazyLoad: PropTypes.bool,
	lazyLoadOptions: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	showPlayIcon: false,
	lazyLoad: false,
	lazyLoadOptions: {
		root: null, //ViewPort
		rootMargin: '0px',
		threshold: 0.3,
	},
};

class Thumbnail extends Component {
	constructor(props) {
		super(props);

		this.node = React.createRef();

		this.mounted = false;

		this.state = {
			lazyLoaded: false,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;

		const { lazyLoad, lazyLoadOptions } = this.props;

		if (lazyLoad) {
			const io = new IntersectionObserver(
				this.onIntersectionObserve,
				lazyLoadOptions,
			);

			io.observe(this.node.current);
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		//</editor-fold>
	}

	onIntersectionObserve = (entries, observer) => {
		//<editor-fold defaultstate="collapsed" desc="onIntersectionObserve">
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (this.mounted) {
					this.setState({ lazyLoaded: true });
				}
				observer.disconnect();
			}
		});
		//</editor-fold>
	};

	onClick = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { onClick } = this.props;

		if (isFunction(onClick)) {
			onClick({ event, Thumbnail: this });
		}
		//</editor-fold>
	};

	renderPlayIcon = () => {
		//<editor-fold defaultstate="collapsed" desc="renderPlayIcon">
		const { showPlayIcon } = this.props;

		if (!showPlayIcon) {
			return null;
		}

		return <div className={this.classNames['play']} />;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		let { className, style, lazyLoad } = this.props;
		const { lazyLoaded } = this.state;
		const { src, width, height, onClick, title } = this.props;

		const _style = { ...style };

		if (!lazyLoad) {
			_style.backgroundImage = `url(${src})`;
		} else {
			if (lazyLoaded) {
				_style.backgroundImage = `url(${src})`;
			}
		}

		_style.width = width;
		_style.height = height;

		let extra = {};

		if (isFunction(onClick)) {
			extra.onClick = this.onClick;
		}

		if (!isUndefined(title) && title.length > 0) {
			extra.title = title;
		}

		className = _g.classNames(this.classNames['wrapper'], className, {
			[this.classNames['wrapper_clickable']]: isFunction(onClick),
			[this.classNames['wrapper_lazyload']]: lazyLoad,
			[this.classNames['wrapper_lazyload_loaded']]: lazyLoad && lazyLoaded,
		});

		return (
			<div ref={this.node} className={className} style={_style} {...extra}>
				{this.renderPlayIcon()}
			</div>
		);
	}
}

Thumbnail.propTypes = propTypes;

Thumbnail.defaultProps = defaultProps;

export default Thumbnail;
