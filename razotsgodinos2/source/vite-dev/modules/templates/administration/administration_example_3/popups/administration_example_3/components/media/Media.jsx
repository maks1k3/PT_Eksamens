import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Title from 'ui/common/title';

import ImageAdministration from 'ui/media/administration/image/main';
import ImagesAdministration from 'ui/media/administration/images/main';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	item: PropTypes.object,
};

const defaultProps = {};

const uiProps = ownProps => {
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
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName, containerName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.set(`${containerName}.data.image`, image);
		}
		//</editor-fold>
	};

	render() {
		const { item } = this.props;

		return (
			<Fragment>
				<Title>Image</Title>
				<ImageAdministration id={item.image_id} onUpdate={this.onUpdate} />
				<Title>Images</Title>
				<ImagesAdministration
					containerName="administration_example3_images"
					containerId={item.id}
				/>
			</Fragment>
		);
	}
}

Media.propTypes = propTypes;

Media.defaultProps = defaultProps;

Media = WithUi(uiProps)(Media);

export default Media;
