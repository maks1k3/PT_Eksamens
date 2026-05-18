import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import LangsTab from 'ui/common/langs_tab';
import { get } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	langs: PropTypes.array,
	meta_data: PropTypes.object,
	translations: PropTypes.object,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		langs: 'langs',
		[ownProps.containerName]: {
			data: {
				meta_data: 'meta_data',
				translations: 'translations',
			},
		},
	};
};

class Edit extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = () => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	renderLangTab = (lang) => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { translations } = this.props;

		const title = get(translations, `${lang}.title`, '');
		const description = get(translations, `${lang}.content`, '');

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
					component={TextArea}
					value={description}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		const { action, id, langs } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'update',
					id: id,
				}}
				onSuccess={this.onSuccess}
				submit={{
					title: 'Save',
				}}>
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

Edit.propTypes = propTypes;

Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;
