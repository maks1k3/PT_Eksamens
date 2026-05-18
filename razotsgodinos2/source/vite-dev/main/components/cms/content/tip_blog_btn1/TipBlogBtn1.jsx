import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';

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

const uiProps = ownProps => {
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

class TipBlogBtn1 extends Component {
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
		const { loading, langs  } = this.props;

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

	renderLangTab = lang => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { langData } = this.props;
		const _langData = get(langData, lang, {});

		const tip_blog_Btn1 = get(_langData, 'tip_blog_Btn1', '');

		return (
			<Fragment>
				<Field
					label="Pogas nosaukums"
					name={`${lang}_tip_blog_Btn1`}
					component={Input}
					value={tip_blog_Btn1}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				<EditContentForm name="tip_blog_btn1">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

TipBlogBtn1.propTypes = propTypes;

TipBlogBtn1.defaultProps = defaultProps;

TipBlogBtn1 = WithUi(uiProps)(TipBlogBtn1);

export default TipBlogBtn1;
