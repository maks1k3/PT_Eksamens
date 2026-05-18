import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Title from 'ui/common/title';

import ImageAdministration from 'ui/media/administration/image/main';
import ImagesAdministration from 'ui/media/administration/images/main';
// import VideoAdministration from 'ui/media/administration/video/main';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	// from ui
	item: PropTypes.object,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		[ownProps.containerName]: {
			data: {
				item: 'item',
			},
		},
	};
};

class Media extends Component {
	constructor(props) {
		super(props);
	}

	onUpdate = ({ image }) => {
		const { tableName, containerName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.set(`${containerName}.data.image`, image);
		}
	};

	render() {
		const { item } = this.props;

		return (
			<Fragment>
				<Title>Attēls</Title>
				<ImageAdministration
					id={item.image_id}
					onUpdate={this.onUpdate}
					showDelete={false}
				/>

				<Title>Galerija</Title>
				<ImagesAdministration
					containerName="event_gallery"
					containerId={item.id}
				/>

				<Title>Video</Title>
				{/* <VideoAdministration id={item.video_id} /> */}
			</Fragment>
		);
	}
}

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

Media = WithUi(uiProps)(Media);

export default Media;
