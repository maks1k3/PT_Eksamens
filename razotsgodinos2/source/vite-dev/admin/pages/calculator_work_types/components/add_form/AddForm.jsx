import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';

import { upperCase } from 'lodash-es';

const uiProps = () => ({ langs: 'langs' });

class AddForm extends Component {
	onSuccess = () =>
		ee.trigger(events.datatable.refresh, { id: this.props.tableName });

	renderLangTab = (lang) => (
		<Fragment>
			<Field
				label={`${upperCase(lang)} title`}
				name={`${lang}_title`}
				component={Input}
				componentProps={{ clearable: true }}
			/>
		</Fragment>
	);

	render() {
		const { action, langs } = this.props;

		return (
			<Form
				action={action}
				extraData={{ action: 'create' }}
				refresh
				onSuccess={this.onSuccess}
				submit={{ title: 'Pievienot' }}>
				<Field
					label="Code"
					name="code"
					component={Input}
					componentProps={{ clearable: true }}
				/>
				{/* <Field
					label="Unit"
					name="unit"
					component={Input}
					componentProps={{ clearable: true }}
				/> */}
				{/* <Field
					label="Sort"
					name="sort"
					component={Input}
					componentProps={{ type: 'number', step: '1', min: '0' }}
				/> */}
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

AddForm.propTypes = {
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
	langs: PropTypes.array,
};

AddForm.defaultProps = { langs: [] };

export default WithUi(uiProps)(AddForm);
