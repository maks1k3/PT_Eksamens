import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	item: PropTypes.object,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		[ownProps.containerName]: {
			data: {
				item: 'item',
			},
		},
	};
};

class Edit extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName, containerName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.set(`${containerName}.data.item`, response.item);
		}
		//</editor-fold>
	};

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">
		const { item } = this.props;
		const { name, surname, city, distance } = item;

		return (
			<Fragment>
				<Field label="Name" name="name" component={Input} value={name} />
				<Field
					label="Surname"
					name="surname"
					component={Input}
					value={surname}
				/>
				<Field label="City" name="city" component={Input} value={city} />
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
					value={distance}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		const { action, id } = this.props;

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
				{this.renderFields()}
			</Form>
		);
	}
}

Edit.propTypes = propTypes;

Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;
