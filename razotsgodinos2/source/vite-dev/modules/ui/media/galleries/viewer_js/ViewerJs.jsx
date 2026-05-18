import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import 'vendor/galleries/viewer_js/viewer.less';
import Viewer from 'vendor/galleries/viewer_js/viewer';

const propTypes = {
	index: PropTypes.number.isRequired,
	items: PropTypes.array.isRequired,
	options: PropTypes.object,
	onClose: PropTypes.func.isRequired,
	onCloseStart: PropTypes.func.isRequired,
};

const defaultProps = {
	options: {},
};

class ViewerJs extends Component {
	constructor(props) {
		super(props);

		this.images = React.createRef();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { index, options, onClose, onCloseStart } = this.props;

		const _options = _g.cloneDeep(options);

		_options.hidden = () => {
			onClose();
		};

		_options.hide = () => {
			onCloseStart();
		};

		_options.shown = () => {
			this.viewer.view(index);
		};

		_options.url = 'data-original';

		this.viewer = new Viewer(this.images.current, _options);
		this.viewer.show();

		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		if (!_.isUndefined(this.viewer)) {
			this.viewer.destroy();
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderImages = () => {
		//<editor-fold defaultstate="collapsed" desc="renderImages">
		const { items } = this.props;

		return _.map(items, (item, index) => {
			const { image, thumbnail, title } = item;

			const props = {};

			if (_.isUndefined(thumbnail)) {
				props.src = image;
			} else {
				props.src = thumbnail;
				props['data-original'] = image;
			}

			if (!_.isUndefined(title)) {
				props.alt = title;
			}

			return (
				<li key={index}>
					<img {...props} />
				</li>
			);
		});
		//</editor-fold>
	};

	render() {
		return (
			<div className="display-none">
				<ul ref={this.images}>{this.renderImages()}</ul>
			</div>
		);
	}
}

ViewerJs.propTypes = propTypes;

ViewerJs.defaultProps = defaultProps;

export default ViewerJs;
