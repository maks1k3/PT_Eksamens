import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import MaxWidth from 'ui/layout/max_width';
import EditForm from 'ui/administration/edit_form';
import Field from 'ui/form/field';
import TextArea from 'ui/inputs/textarea';

import { Base64 } from 'js-base64';

const get = {
	action: 'administration/settings/actions',
	extraData: {
		action: 'get_footer_js',
	},
};

const update = {
	action: 'administration/settings/actions',
	extraData: {
		action: 'set_footer_js',
	},
	onBeforeSubmit: ({ data }) => {
		data.footer_js = Base64.encode(data.footer_js);
	},
};

const propTypes = {};

const defaultProps = {};

class DefaultLang extends Component {
	constructor(props) {
		super(props);
	}

	renderForm = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { footer_js } = data;

		return (
			<Fragment>
				<Field
					label="Footer js"
					name="footer_js"
					component={TextArea}
					value={footer_js}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<MaxWidth>
				<EditForm get={get} update={update} render={this.renderForm} />
			</MaxWidth>
		);
	}
}

DefaultLang.propTypes = propTypes;

DefaultLang.defaultProps = defaultProps;

export default DefaultLang;
