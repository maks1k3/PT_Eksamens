import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import getCollectionName from 'helpers/collections/getCollectionName';

import WithUi from 'hoc/store/ui';

import CollectionItem from './CollectionItem';

import styles from './Files.module.less';

const propTypes = {
	classNames: PropTypes.object,

	collectionName: PropTypes.string.isRequired,
	collectionId: PropTypes.number.isRequired,

	renderItem: PropTypes.func,

	//from ui
	ids: PropTypes.array,
};

const defaultProps = {
	classNames: {},

	//from ui
	ids: [],
};

const uiProps = (ownProps) => {
	const name = getCollectionName(
		ownProps.collectionName,
		ownProps.collectionId,
	);
	return {
		collections: {
			[name]: {
				ids: 'ids',
			},
		},
	};
};

class FilesCollection extends Component {
	constructor(props) {
		super(props);
	}
	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderList = () => {
		//<editor-fold defaultstate="collapsed" desc="renderList">
		const { ids } = this.props;

		return _.map(ids, this.renderItem);
		//</editor-fold>
	};

	renderItem = (id, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const classNames = this.classNames;

		const { renderItem } = this.props;

		return (
			<CollectionItem
				key={id}
				id={id}
				index={index}
				classNames={classNames}
				FilesCollection={this}
				renderItem={renderItem}
			/>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const className = _g.classNames(classNames['wrapper']);
		return <div className={className}>{this.renderList()}</div>;
	}
}

FilesCollection.propTypes = propTypes;

FilesCollection.defaultProps = defaultProps;

FilesCollection = WithUi(uiProps)(FilesCollection);

export default FilesCollection;
