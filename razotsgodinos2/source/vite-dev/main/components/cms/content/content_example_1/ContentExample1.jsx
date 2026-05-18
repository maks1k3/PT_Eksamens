import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditContentForm from 'cms/content';
import ImageAdministration from 'ui/media/administration/image/cms';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import { get, head } from 'lodash-es';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
	images: PropTypes.array,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = (ownProps) => {
	return {
		CMSPopup: {
			loading: 'loading',
			content: {
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

class ContentExample1 extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'Edit ContentExample1',
		});
		//</editor-fold>
	}

	renderImageAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderImageAdministration">
		const { loading, images } = this.props;

		if (loading) {
			return null;
		}

		return <ImageAdministration id={head(images)} />;
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { data } = this.props;
		const title = get(data, 'title', '');

		return (
			<Fragment>
				<Field label="Title" name="title" component={Input} value={title} />
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				{this.renderImageAdministration()}
				<EditContentForm name="content_example_1">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

ContentExample1.propTypes = propTypes;

ContentExample1.defaultProps = defaultProps;

export default WithUi(uiProps)(ContentExample1);
