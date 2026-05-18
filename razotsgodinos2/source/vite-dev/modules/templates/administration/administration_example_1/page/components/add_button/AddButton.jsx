import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'ui/form';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

const defaultProps = {};

class AddButton extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { popupName, tableName } = this.props;

		openPopup({
			name: popupName,
			data: {
				id: response.item.id,
				tab: 'edit',
			},
		});

		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	render() {
		const { action, title } = this.props;
		return (
			<Form
				action={action}
				extraData={{
					action: 'create',
				}}
				submit={{
					title: title,
					icon: {
						provider: 'icomoon',
						name: 'plus3',
					},
				}}
				submitPosition="left"
				showResponse={false}
				onSuccess={this.onSuccess}
			/>
		);
	}
}

AddButton.propTypes = propTypes;

AddButton.defaultProps = defaultProps;

export default AddButton;
