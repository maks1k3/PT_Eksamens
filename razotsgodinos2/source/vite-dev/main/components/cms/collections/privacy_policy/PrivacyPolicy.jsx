import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditCollectionItem from 'cms/collection/edit';
import Delete from 'cms/collection/delete';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';
import { get } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	//from ui
	loading: PropTypes.bool,
	name: PropTypes.string,
	collectionId: PropTypes.number,
	langData: PropTypes.object,
	langs: PropTypes.array,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = (ownProps) => {
	return {
		CMSPopup: {
			loading: 'loading',
			langs: 'langs',
			collection: {
				name: 'name',
				collectionId: 'collectionId',
				langData: 'langData',
			},
		},
	};
};

class PrivacyPolicy extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { id } = this.props;
		uiStore.update('CMSPopup', {
			title: 'Edit Privacy policy' + id,
		});
		//</editor-fold>
	}

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading, langs } = this.props;

		if (loading) {
			return null;
		}

		return (
			<Fragment>
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = (lang) => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { langData } = this.props;
		const _langData = get(langData, lang, {});

		const title = get(_langData, 'title', '');
		const description = get(_langData, 'description', '');

		return (
			<Fragment>
				<Field
					label="Title"
					name={`${lang}_title`}
					component={Input}
					value={title}
				/>
				<Field
					label="Description"
					name={`${lang}_description`}
					component={CKEditor}
					value={description}
				/>
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
				<EditCollectionItem id={id}>{this.renderForm()}</EditCollectionItem>
				{this.renderDelete()}
			</Fragment>
		);
	}
}

PrivacyPolicy.propTypes = propTypes;

PrivacyPolicy.defaultProps = defaultProps;

PrivacyPolicy = WithUi(uiProps)(PrivacyPolicy);

export default PrivacyPolicy;
