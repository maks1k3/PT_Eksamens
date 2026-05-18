import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
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

class HeroSlide_3 extends Component {
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

		const text = get(_langData, 'text', '');
		const heading = get(_langData, 'heading', '');
		const text_bottom = get(_langData, 'text_bottom', '');

		return (
			<Fragment>
				<Field
					label="Apraksts"
					name={`${lang}_text`}
					component={Input}
					value={text}
				/>
				<Field
					label="Nosaukums"
					name={`${lang}_heading`}
					component={Input}
					value={heading}
				/>
				<Field
					label="Apraksts"
					name={`${lang}_text_bottom`}
					component={Input}
					value={text_bottom}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				{this.renderImageAdministration()}
				<EditContentForm name="hero_slide_3">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

HeroSlide_3.propTypes = propTypes;

HeroSlide_3.defaultProps = defaultProps;

HeroSlide_3 = WithUi(uiProps)(HeroSlide_3);

export default HeroSlide_3;
