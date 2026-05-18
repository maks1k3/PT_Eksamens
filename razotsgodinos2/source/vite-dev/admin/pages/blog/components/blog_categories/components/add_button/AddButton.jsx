import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'ui/controls/button';
import AddForm from '../add_form';

const propTypes = {
	title: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
};

const defaultProps = {};

class AddButton extends Component {
	constructor(props) {
		super(props);
	}

	onClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { popupName, tableName, action, title } = this.props;

		openPopup({
			name: 'universal',
			data: {
				popupName: popupName,
				tableName: tableName,
				action: action,
			},
			component: AddForm,
			settings: {
				maxWidth: '800px',
				title: title,
				hideOnOverlayClick: false,
			},
		});
		//</editor-fold>
	};

	render() {
		const { title } = this.props;
		return (
			<Button
				title={title}
				icon={{
					provider: 'icomoon',
					name: 'plus3',
				}}
				onClick={this.onClick}
			/>
		);
	}
}

AddButton.propTypes = propTypes;

AddButton.defaultProps = defaultProps;

export default AddButton;
