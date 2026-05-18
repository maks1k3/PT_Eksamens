import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'helpers/getDisplayName';

import WithUi from 'hoc/store/ui';

const uiProps = ownProps => {
	return {
		images: {
			[ownProps.imageId]: 'imageData',
		},
	};
};

const propTypes = {
	imageId: PropTypes.number.isRequired,
};

const defaultProps = {
	//from ui
	imageData: {
		image: _g.getMainUrl() + 'img/placeholder/no_image.jpg',
		thumbnail: _g.getMainUrl() + 'img/placeholder/no_image_thumbnail.jpg',
	},
};

const hoc = WrappedComponent => {
	class WithImage extends Component {
		static displayName = `WithImage(${getDisplayName(WrappedComponent)})`;

		constructor(props, context) {
			super(props, context);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	WithImage.propTypes = propTypes;
	WithImage.defaultProps = defaultProps;
	WithImage = WithUi(uiProps)(WithImage);

	return WithImage;
};

export default hoc;
