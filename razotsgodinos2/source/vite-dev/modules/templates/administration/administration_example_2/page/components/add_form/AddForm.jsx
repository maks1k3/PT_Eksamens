import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
};

const defaultProps = {};

class AddForm extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = () => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName } = this.props;

		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">

		return (
			<Fragment>
				<Field label="Name" name="name" component={Input} />
				<Field label="Surname" name="surname" component={Input} />
				<Field label="City" name="city" component={Input} />
				<Field
					label="Distance"
					name="distance"
					component={Input}
					componentProps={{
						number: {
							allowNegative: false,
							allowDecimal: false,
						},
					}}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		const { action } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'create',
				}}
				refresh={true}
				onSuccess={this.onSuccess}
				submit={{
					title: 'Add',
				}}>
				{this.renderFields()}
			</Form>
		);
	}
}

AddForm.propTypes = propTypes;

AddForm.defaultProps = defaultProps;

export default AddForm;
