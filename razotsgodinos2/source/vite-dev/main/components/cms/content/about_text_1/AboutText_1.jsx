import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';
import TextArea from 'ui/inputs/textarea';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
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
			content: {
				langData: 'langData',
			},
		},
	};
};

class AboutText_1 extends Component {
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

		const aboutText_1 = get(_langData, 'aboutText_1', '');

		return (
			<Fragment>
				<Field
					label="Apraksts"
					name={`${lang}_aboutText_1`}
					component={TextArea}
					value={aboutText_1}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				<EditContentForm name="about_text_1">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

AboutText_1.propTypes = propTypes;

AboutText_1.defaultProps = defaultProps;

AboutText_1 = WithUi(uiProps)(AboutText_1);

export default AboutText_1;
