import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import WithFile from 'hoc/media/with_file';

import FileLink from 'ui/misc/file_link';

const propTypes = {
	id: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	classNames: PropTypes.object.isRequired,
	FilesCollection: PropTypes.object.isRequired,
	renderItem: PropTypes.func,

	//from ui
	files: PropTypes.array,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
				media: {
					files: 'files',
				},
			},
		},
	};
};

class Comp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { files } = this.props;

		return <CollectionItem {...this.props} fileId={_.head(files)} />;
	}
}

Comp.propTypes = propTypes;

Comp.defaultProps = defaultProps;

Comp = WithUi(uiProps)(Comp);

class CollectionItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			id,
			index,
			classNames,
			FilesCollection,
			renderItem,
			fileData,
			fileId,
		} = this.props;

		if (_.isFunction(renderItem)) {
			return renderItem({
				id,
				index,
				classNames,
				FilesCollection,
				fileData,
				fileId,
			});
		}

		const { display_name, extension, size } = fileData;

		const url = `/media/file/download/${fileId}`;
		return (
			<div className={classNames['item']}>
				<FileLink
					to={url}
					title={`${display_name}.${extension} ${
						!_g.isEmpty(size) ? `(${size})` : ''
					}`}
					extension={extension}
				/>
			</div>
		);
	}
}

CollectionItem = WithFile(CollectionItem);

CollectionItem.propTypes = {
	id: PropTypes.number,
	index: PropTypes.number,
	classNames: PropTypes.object,
	FilesCollection: PropTypes.any,
	renderItem: PropTypes.func,
	fileData: PropTypes.object,
	fileId: PropTypes.number,
};

export default Comp;
