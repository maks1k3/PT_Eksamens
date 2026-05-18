import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import ImageAdministration from 'ui/media/administration/image/cms';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
	images: PropTypes.array,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = ownProps => {
	return {
		CMSPopup: {
			loading: 'loading',
			content: {
				media: {
					images: 'images',
				},
			},
		},
	};
};

class CalculatorImage_3 extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'Rediģēt',
		});
		//</editor-fold>
	}

	renderImageAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderImageAdministration">
		const { images, loading } = this.props;

		if (loading) {
			return null;
		}

		return <ImageAdministration id={head(images)} />;
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading  } = this.props;

		if (loading) {
			return null;
		}

		
		return (
			<Fragment>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				{this.renderImageAdministration()}
				<EditContentForm name="calculator_image_3">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

CalculatorImage_3.propTypes = propTypes;

CalculatorImage_3.defaultProps = defaultProps;

CalculatorImage_3 = WithUi(uiProps)(CalculatorImage_3);

export default CalculatorImage_3;
