import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Image.module.less';
import { isFunction, isNumber, isString, isUndefined } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	sizes: PropTypes.array,
	sizesOrientation: PropTypes.oneOf(['w', 'h']),
	title: PropTypes.string,
	alt: PropTypes.string,
	style: PropTypes.object,

	center: PropTypes.bool,
	//adds responsive className
	responsive: PropTypes.bool,

	//if provided new image width and height will be calculated maintaining aspect ration
	containerWidth: PropTypes.number,
	//image's full width and height
	originalWidth: PropTypes.number,
	originalHeight: PropTypes.number,

	//callbacks
	onClick: PropTypes.func,
	onLoad: PropTypes.func,
	onError: PropTypes.func,

	//callback which will return width and height if this image
	//ignored if custom onLoad callback is provided
	//ignored if originalWidth and originalHeight are provided
	getDimensions: PropTypes.func,

	//image that will be shown if image loading is failed
	//ignored if custom onError callback is provided
	noImagePlaceholder: PropTypes.string,
	lazyLoad: PropTypes.bool,
	lazyLoadOptions: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	alt: '',
	sizesOrientation: 'w',
	sizes: [],
	center: false,
	responsive: false,
	showPlayIcon: false,
	lazyLoad: false,
	lazyLoadOptions: {
		root: null, //ViewPort
		rootMargin: '0px',
		threshold: 0.3,
	},
};

class Image extends Component {
	constructor(props) {
		super(props);

		this.mounted = false;

		this.image = React.createRef();

		this.state = {
			showPlaceholder: false,
			lazyLoaded: false,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		const { noImagePlaceholder } = this.props;

		if (isString(noImagePlaceholder)) {
			$(this.image.current).on('error', function () {
				$(this).unbind('error').attr('src', noImagePlaceholder);
			});
		}

		const { lazyLoad, lazyLoadOptions } = this.props;

		if (lazyLoad) {
			const io = new IntersectionObserver(
				this.onIntersectionObserve,
				lazyLoadOptions,
			);

			io.observe(this.image.current);
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

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

	responsive = () => {
		//<editor-fold defaultstate="collapsed" desc="responsive">
		const { containerWidth, originalWidth, originalHeight } = this.props;
		const aspectRatio = originalWidth / originalHeight;

		if (originalWidth < containerWidth) {
			return {
				width: originalWidth,
				height: originalHeight,
			};
		} else {
			return {
				width: containerWidth,
				height: containerWidth / aspectRatio,
			};
		}

		//</editor-fold>
	};

	onClick = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { onClick } = this.props;

		if (isFunction(onClick)) {
			onClick({ event, Image: this });
		}
		//</editor-fold>
	};

	onLoad = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onLoad">
		const { onLoad, getDimensions } = this.props;

		if (isFunction(getDimensions)) {
			getDimensions({
				width: event.target.naturalWidth,
				height: event.target.naturalHeight,
				Image: this,
			});
		}

		if (isFunction(onLoad)) {
			onLoad({ event, Image: this });
		}
		//</editor-fold>
	};

	onError = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onError">
		const { noImagePlaceholder, onError } = this.props;

		if (!isUndefined(noImagePlaceholder) && !this.state.showPlaceholder) {
			this.setState({
				showPlaceholder: true,
			});
		}

		if (isFunction(onError)) {
			onError({ event, Image: this });
		}
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const {
			src,
			title,
			alt,
			style,
			center,
			responsive,
			className,
			containerWidth,
			originalWidth,
			originalHeight,
			getDimensions,
			noImagePlaceholder,
			lazyLoad,
			sizesOrientation,
		} = this.props;

		const { showPlaceholder, lazyLoaded } = this.state;

		const { onLoad, onError, onClick, sizes } = this.props;
		let extra = {};

		//events
		if (
			isFunction(getDimensions) &&
			isUndefined(originalWidth) &&
			isUndefined(originalHeight)
		) {
			extra.onLoad = this.onLoad;
		}

		if (isFunction(onLoad)) {
			extra.onLoad = this.onLoad;
		}

		if (isFunction(onError)) {
			extra.onError = this.onError;
		}

		if (isFunction(onClick)) {
			extra.onClick = this.onClick;
		}

		if (
			isNumber(containerWidth) &&
			isNumber(originalWidth) &&
			isNumber(originalHeight)
		) {
			const { width, height } = this.responsive();
			extra.width = width + 'px';
			extra.height = height + 'px';
		}

		const _className = _g.classNames(this.classNames['wrapper'], className, {
			[this.classNames['wrapper_responsive']]: responsive,
			[this.classNames['wrapper_center']]: center,
			[this.classNames['wrapper_clickable']]: isFunction(onClick),
			[this.classNames['wrapper_lazyload']]: lazyLoad,
			[this.classNames['wrapper_lazyload_loaded']]: lazyLoad && lazyLoaded,
		});

		const _src = !showPlaceholder ? src : noImagePlaceholder;

		if (!lazyLoad) {
			extra.src = _src;
		} else {
			if (lazyLoaded) {
				extra.src = _src;
			}
		}
		const noParamSrc = src.split('?')[0];
		const srcSet = sizes
			.map((size, key) => {
				const coma = key !== sizes.length - 1 ? ',' : '';

				return `${noParamSrc}?${sizesOrientation}=${size} ${size}${sizesOrientation}${coma}`;
			})
			.join(' ');
		// extra.srcSet = srcSet;
		return (
			<img
				srcSet={srcSet}
				ref={this.image}
				className={_className}
				title={title}
				alt={alt}
				style={style}
				{...extra}
			/>
		);
	}
}

Image.propTypes = propTypes;

Image.defaultProps = defaultProps;

export default Image;
