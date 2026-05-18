import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import ImageAdministration from 'ui/media/administration/image/cms';
import LangsTab from 'ui/common/langs_tab';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
	langData: PropTypes.object,
	langs: PropTypes.array,
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
			langs: 'langs',
			content: {
				langData: 'langData',
				media: {
					images: 'images',
				},
			},
		},
	};
};

class Review_1 extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'Rediģēt',
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
		const text = get(_langData, 'text', '');
		const date = get(_langData, 'date', '');

		return (
			<Fragment>
				<Field
					label="Nosaukums"
					name={`${lang}_title`}
					component={Input}
					value={title}
				/>
				<Field
					label="Apraksts"
					name={`${lang}_text`}
					component={TextArea}
					value={text}
				/>
				<Field
					label="Datums"
					name={`${lang}_date`}
					component={Input}
					value={date}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				{this.renderImageAdministration()}
				<EditContentForm name="review_3">{this.renderForm()}</EditContentForm>
			</Fragment>
		);
	}
}

Review_1.propTypes = propTypes;

Review_1.defaultProps = defaultProps;

Review_1 = WithUi(uiProps)(Review_1);

export default Review_1;
