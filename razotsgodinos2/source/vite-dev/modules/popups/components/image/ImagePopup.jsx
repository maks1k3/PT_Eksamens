import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Popup from 'popups/components/ui/popup';
import PopupLoader from 'popups/components/ui/popup_loader';
import Arrow from 'popups/components/ui/arrow';

import styles from './ImagePopup.module.less';
import { get, has, isFunction, isUndefined } from 'lodash-es';

export const settings = {
	name: 'image',
	inUrl: false,
	level: 14,
	extraUrlKeys: [],
	verticalAlign: 'middle',
	hideOnOverlayClick: true,
	contentWrapStyle: {
		maxWidth: '100%',
	},
	showCloseControl: true,
	closeOnEsc: true,
};

const propTypes = {
	data: PropTypes.object,
};

const defaultProps = {};

class ImagePopup extends Component {
	constructor(props) {
		super(props);

		const current = get(this.props.data, 'current', 0);

		this.state = {
			current: current,
			loaded: {},
			maxHeight: browser_window.getDimensions().viewport.height + 'px',
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;

		const { current } = this.state;

		this.preload(current);
		this.preload(0); //always preload first image
		this.preloadNearByImages(current);

		ee.on(events.browserWindow.resize, this.onResize);
		ee.on(events.keydown.left, this.previous);
		ee.on(events.keydown.right, this.next);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;

		ee.off(events.browserWindow.resize, this.onResize);
		ee.off(events.keydown.left, this.previous);
		ee.off(events.keydown.right, this.next);
		//</editor-fold>
	}

	onResize = () => {
		//<editor-fold defaultstate="collapsed" desc="onResize">
		const maxHeight = browser_window.getDimensions().viewport.height + 'px';

		if (maxHeight !== this.state.maxHeight) {
			this.setState({
				maxHeight: maxHeight,
			});
		}
		//</editor-fold>
	};

	previous = () => {
		//<editor-fold defaultstate="collapsed" desc="previous">
		const items = this.getItems();
		const { current } = this.state;

		let _current = current;
		_current--;

		if (_current < 0) {
			_current = items.length - 1;
		}

		this.setImage(_current);
		//</editor-fold>
	};

	next = () => {
		//<editor-fold defaultstate="collapsed" desc="next">
		const { data } = this.props;
		const items = this.getItems();
		const onGalleryFinish = get(data, 'onGalleryFinish', 'loop');
		const { current } = this.state;

		let _current = current;

		_current++;
		if (_current >= items.length) {
			if (onGalleryFinish === 'loop') {
				_current = 0;
			} else if (onGalleryFinish === 'close') {
				this.close();
				return;
			} else if (isFunction(onGalleryFinish)) {
				onGalleryFinish({ ImagePopup: this });
				return;
			}
		}

		this.setImage(_current);
		//</editor-fold>
	};

	onImageClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onImageClick">
		const items = this.getItems();

		if (items.length > 0) {
			this.next();
		}
		//</editor-fold>
	};

	setImage = (index) => {
		//<editor-fold defaultstate="collapsed" desc="setImage">
		this.setState({ current: index });
		this.preloadNearByImages(index);
		//</editor-fold>
	};

	getItems = () => {
		//<editor-fold defaultstate="collapsed" desc="getItemById">
		const { data } = this.props;

		return get(data, 'items', []);
		//</editor-fold>
	};

	getItemById = (index) => {
		//<editor-fold defaultstate="collapsed" desc="getItemById">
		const items = this.getItems();

		return get(items, index);
		//</editor-fold>
	};

	isLoading = () => {
		//<editor-fold defaultstate="collapsed" desc="isLoading">
		const { current, loaded } = this.state;
		const item = this.getItemById(current);

		return !has(loaded, item.src);
		//</editor-fold>
	};

	close = () => {
		//<editor-fold defaultstate="collapsed" desc="close">
		closePopup({ name: settings.name });
		//</editor-fold>
	};

	preload = (index) => {
		//<editor-fold defaultstate="collapsed" desc="preload">
		const image = this.getItemById(index);
		const { src } = image;

		this.loadImage(src).then(() => {
			if (this.mounted) {
				const loaded = get(this.state.loaded, src, false);

				if (!loaded) {
					this.setState((prevState) => {
						const loaded = _g.cloneDeep(prevState.loaded);
						loaded[src] = true;
						return {
							loaded: loaded,
						};
					});
				}
			}
		});
		//</editor-fold>
	};

	preloadNearByImages = (index) => {
		//<editor-fold defaultstate="collapsed" desc="preloadNearByImages">
		const items = this.getItems();

		if (!isUndefined(items[index + 1])) {
			this.preload(index + 1);
		}
		if (!isUndefined(items[index - 1])) {
			this.preload(index - 1);
		}

		if (!isUndefined(items[index + 2])) {
			this.preload(index + 2);
		}

		if (!isUndefined(items[index - 2])) {
			this.preload(index - 2);
		}
		//</editor-fold>
	};

	loadImage = (src) => {
		//<editor-fold defaultstate="collapsed" desc="loadImage">
		const image = new Image();
		image.src = src;
		const promise = new Promise((resolve, reject) => {
			if (image.naturalWidth) {
				// If the browser can determine the naturalWidth the
				// image is already loaded successfully
				resolve(image);
			} else if (image.complete) {
				// If the image is complete but the naturalWidth is 0px
				// it is probably broken
				reject(image);
			} else {
				image.addEventListener('load', fullfill);
				image.addEventListener('error', fullfill);
			}
			function fullfill() {
				if (image.naturalWidth) {
					resolve(image);
				} else {
					reject(image);
				}
				image.removeEventListener('load', fullfill);
				image.removeEventListener('error', fullfill);
			}
		});
		promise.image = image;
		return promise;
		//</editor-fold>
	};

	renderContent = ({ classNames, isLoading }) => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { data } = this.props;
		const { current, maxHeight } = this.state;

		const items = this.getItems();

		const showTitle = get(data, 'showTitle', true);
		const showNumbers = get(data, 'showNumbers', true);

		const { src, title } = get(items, current);

		if (isLoading) {
			return <PopupLoader />;
		} else {
			return (
				<Fragment>
					<img
						key={src}
						className={classNames['image']}
						src={src}
						onClick={this.onImageClick}
						style={{ maxHeight }}
					/>
					<div className={classNames['title-holder']}>
						<div className={classNames['bottom-bar']}>
							<div className={classNames['title']}>{showTitle && title}</div>
							<div className={classNames['counter']}>
								{items.length > 0 &&
									showNumbers &&
									`${current + 1} of ${items.length}`}
							</div>
						</div>
					</div>
				</Fragment>
			);
		}

		//</editor-fold>
	};

	renderArrows = () => {
		//<editor-fold defaultstate="collapsed" desc="renderArrows">
		const items = this.getItems();

		let arrowLeft = null;
		let arrowRight = null;

		if (items.length > 1) {
			arrowLeft = <Arrow type="left" onClick={this.previous} />;
			arrowRight = <Arrow type="right" onClick={this.next} />;
		}

		return (
			<Fragment>
				{arrowLeft}
				{arrowRight}
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		const { data } = this.props;
		console.log(styles);
		const classNames = _g.getClassNames(styles, get(data, 'classNames', {}));
		const PopupProps = get(data, 'PopupProps', {});

		const isLoading = this.isLoading();

		return (
			<Popup
				name={settings.name}
				level={settings.level}
				verticalAlign={settings.verticalAlign}
				hideOnOverlayClick={settings.hideOnOverlayClick}
				showCloseControl={isLoading ? false : settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}
				inner={this.renderArrows()}
				classNames={{
					['content-holder']: classNames['content-holder'],
					['content-wrap']: classNames['content-wrap'],
					['close']: classNames['close'],
				}}
				{...PopupProps}>
				{this.renderContent({ classNames, isLoading })}
			</Popup>
		);
	}
}

ImagePopup.propTypes = propTypes;

ImagePopup.defaultProps = defaultProps;

export default ImagePopup;
