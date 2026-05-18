import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'helpers/getDisplayName';

import WithUi from 'hoc/store/ui';

const uiProps = ownProps => {
	return {
		videos: {
			[ownProps.videoId]: 'videoData',
		},
	};
};

const propTypes = {
	videoId: PropTypes.number.isRequired,
};

const hoc = WrappedComponent => {
	class WithVideo extends Component {
		static displayName = `WithVideo(${getDisplayName(WrappedComponent)})`;

		constructor(props, context) {
			super(props, context);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	WithVideo.propTypes = propTypes;
	WithVideo = WithUi(uiProps)(WithVideo);

	return WithVideo;
};

export default hoc;
