import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'ui/controls/button';
import AddForm from '../add_form/AddForm';

const propTypes = {
	title: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
};

class AddButton extends Component {
	onClick = () => {
		const { popupName, tableName, action, title } = this.props;

		openPopup({
			name: popupName,
			data: {
				tableName,
				action,
				title,
			},
			component: AddForm,
			settings: {
				maxWidth: '600px',
				title,
			},
		});
	};

	render() {
		return (
			<Button
				title={this.props.title}
				icon={{ provider: 'icomoon', name: 'plus' }}
				onClick={this.onClick}
			/>
		);
	}
}

AddButton.propTypes = propTypes;

export default AddButton;
