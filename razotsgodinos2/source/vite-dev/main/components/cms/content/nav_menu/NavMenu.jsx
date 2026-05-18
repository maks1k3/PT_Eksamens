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

class NavMenu extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'Navigācija',
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

		const about = get(_langData, 'about', '');
		const projects = get(_langData, 'projects', '');
		const standard = get(_langData, 'standard', '');
		const contacts = get(_langData, 'contacts', '');
		const calculator = get(_langData, 'calculator', '');

		return (
			<Fragment>
				<Field
					label="Par mums"
					name={`${lang}_about`}
					component={Input}
					value={about}
				/>
				<Field
					label="Projekti"
					name={`${lang}_projects`}
					component={Input}
					value={projects}
				/>
				<Field
					label="Tipveida projekti"
					name={`${lang}_standard`}
					component={Input}
					value={standard}
				/>
				<Field
					label="Kontakti"
					name={`${lang}_contacts`}
					component={Input}
					value={contacts}
				/>
				<Field
					label="Cenu kalkulators"
					name={`${lang}_calculator`}
					component={Input}
					value={calculator}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				<EditContentForm name="nav_menu">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

NavMenu.propTypes = propTypes;

NavMenu.defaultProps = defaultProps;

NavMenu = WithUi(uiProps)(NavMenu);

export default NavMenu;
