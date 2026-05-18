import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import refreshCollection from 'helpers/collections/refreshCollection';

import WithUi from 'hoc/store/ui';

import Loading from 'ui/misc/loading';

const propTypes = {
	name: PropTypes.string.isRequired,
	collectionId: PropTypes.number.isRequired,
	EditForm: PropTypes.any,
	extra: PropTypes.object,

	//from ui
	loading: PropTypes.bool,
	id: PropTypes.number,
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
				id: 'id',
			},
		},
	};
};

class AddCollectionItem extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.createNewItem();
		//</editor-fold>
	}

	/* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

	createNewItem = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const { name, collectionId } = this.props;

		remoteRequest({
			url: 'cms/administration/collection_item',
			data: {
				action: 'create',
				name: name,
				collection_id: collectionId,
			},
			onSuccess: response => {
				if (!uiStore.get('CMSPopup.mounted', false)) {
					return;
				}

				uiStore.update('CMSPopup', {
					loading: false,
					collection: response.collection,
					langs: response.langs,
				});

				this.refreshCollection();
			},
			onError: response => {
				showAlert({ content: response.msg });
			},
		});

		//</editor-fold>
	};

	refreshCollection = () => {
		//<editor-fold defaultstate="collapsed" desc="refreshCollection">
		const { name, collectionId } = this.props;
		refreshCollection(name, collectionId);
		//</editor-fold>
	};

	render() {
		const { loading, id, EditForm, extra } = this.props;

		if (loading) {
			return <Loading />;
		}

		return React.createElement(EditForm, { id, extra });
	}
}

AddCollectionItem.propTypes = propTypes;

AddCollectionItem.defaultProps = defaultProps;

AddCollectionItem = WithUi(uiProps)(AddCollectionItem);

export default AddCollectionItem;
