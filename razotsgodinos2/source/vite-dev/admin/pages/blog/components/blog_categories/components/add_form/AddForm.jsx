import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';

import { upperCase } from 'lodash-es';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,

	//from ui
	langs: PropTypes.array,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		langs: 'langs',
	};
};

class AddForm extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName } = this.props;

		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	renderLangTab = (lang) => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		return (
			<Fragment>
				<Field
					label={`${upperCase(lang)} nosaukums`}
					name={`${lang}_title`}
					component={Input}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		const { action, langs } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'create',
				}}
				refresh={true}
				onSuccess={this.onSuccess}
				submit={{
					title: 'Pievienot',
				}}>
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

AddForm.propTypes = propTypes;

AddForm.defaultProps = defaultProps;

AddForm = WithUi(uiProps)(AddForm);

export default AddForm;
