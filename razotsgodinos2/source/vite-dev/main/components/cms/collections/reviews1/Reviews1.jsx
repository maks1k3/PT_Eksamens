import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditCollectionItem from 'cms/collection/edit';
import Delete from 'cms/collection/delete';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import ImageAdministration from 'ui/media/administration/image/cms';
import { get, head } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	//from ui
	loading: PropTypes.bool,
	name: PropTypes.string,
	collectionId: PropTypes.number,
	data: PropTypes.object,
	images: PropTypes.array,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = (ownProps) => {
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

class Reviews1 extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { id } = this.props;
		uiStore.update('CMSPopup', {
			title: 'Atsauksmes' + id,
		});
		//</editor-fold>
	}

	renderImageAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderImageAdministration">
		const { images, loading } = this.props;

		if (loading) {
			return null;
		}

		return <ImageAdministration id={head(images)} />;
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading, data } = this.props;

		if (loading) {
			return null;
		}

		const title = get(data, 'title', '');
		const text = get(data, 'text', '');
		const date = get(data, 'date', '');

		return (
			<Fragment>
				<Field
					label="Virsraksts"
					name="title"
					component={Input}
					value={title}
				/>
				<Field label="Apraksts" name="text" component={TextArea} value={text} />
				<Field label="Datums" name="date" component={Input} value={date} />
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

Reviews1.propTypes = propTypes;

Reviews1.defaultProps = defaultProps;

Reviews1 = WithUi(uiProps)(Reviews1);

export default Reviews1;
