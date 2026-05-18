import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Select from 'ui/inputs/select';

class AddForm extends Component {
	onSuccess = () => {
		ee.trigger(events.datatable.refresh, { id: this.props.tableName });
	};

	render() {
		const { action } = this.props;

		return (
			<Form
				action={action}
				extraData={{ action: 'create' }}
				refresh
				onSuccess={this.onSuccess}
				submit={{ title: 'Pievienot' }}>
				<Field
					label="Kategorija"
					name="category_id"
					component={Select}
					componentProps={{
						optionsUrl: action,
						extraData: { action: 'get_categories' },
						optionsPath: 'options',
						valueKey: 'value',
						labelKey: 'label',
						searchable: true,
						clearable: false,
					}}
				/>

				<Field
					label="Pakalpojums"
					name="work_type_id"
					component={Select}
					componentProps={{
						optionsUrl: action,
						extraData: { action: 'get_work_types' },
						optionsPath: 'options',
						valueKey: 'value',
						labelKey: 'label',
						searchable: true,
						clearable: false,
					}}
				/>

				<Field
					label="Izvēle"
					name="option_id"
					component={Select}
					componentProps={{
						optionsUrl: action,
						extraData: { action: 'get_options' },
						optionsPath: 'options',
						valueKey: 'value',
						labelKey: 'label',
						searchable: true,
						clearable: false,
					}}
				/>

				<Field
					label="Cena"
					name="price"
					component={Input}
					componentProps={{
						type: 'number',
						step: '0.01',
						min: '0',
					}}
				/>
			</Form>
		);
	}
}

AddForm.propTypes = {
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
};

export default AddForm;
