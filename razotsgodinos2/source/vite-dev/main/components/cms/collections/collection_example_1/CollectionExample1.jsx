import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditCollectionItem from 'cms/collection/edit';
import Delete from 'cms/collection/delete';
import ImageAdministration from 'ui/media/administration/image/cms';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const propTypes = {
	id: PropTypes.number.isRequired,

	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
	images: PropTypes.array,
	name: PropTypes.string,
	collectionId: PropTypes.number,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = ownProps => {
	return {
		CMSPopup: {
			loading: 'loading',
			collection: {
				name: 'name',
				collectionId: 'collectionId',
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

class CollectionExample1 extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { id } = this.props;
		uiStore.update('CMSPopup', {
			title: 'Edit item #' + id,
		});
		//</editor-fold>
	}

	renderImageAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderImageAdministration">
		const { loading, images } = this.props;

		if (loading) {
			return null;
		}

		return <ImageAdministration id={_.head(images)} />;
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { data } = this.props;
		const title = _.get(data, 'title', '');

		return (
			<Fragment>
				<Field label="Title" name="title" component={Input} value={title} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDelete">
		const { loading, id, name, collectionId } = this.props;

		if (loading) {
			return null;
		}

		return <Delete id={id} name={name} collectionId={collectionId} />;
		//</editor-fold>
	};

	render() {
		const { id } = this.props;
		return (
			<Fragment>
				{this.renderImageAdministration()}
				<EditCollectionItem id={id}>{this.renderForm()}</EditCollectionItem>
				{this.renderDelete()}
			</Fragment>
		);
	}
}

CollectionExample1.propTypes = propTypes;

CollectionExample1.defaultProps = defaultProps;

CollectionExample1 = WithUi(uiProps)(CollectionExample1);

export default CollectionExample1;
