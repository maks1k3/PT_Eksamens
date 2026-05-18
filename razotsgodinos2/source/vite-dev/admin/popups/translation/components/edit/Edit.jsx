import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import { Base64 } from 'js-base64';

import Form from 'ui/form';
import Field from 'ui/form/field';
import TextArea from 'ui/inputs/textarea';
import { forEach, get, isNull, map, upperCase } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	translation: PropTypes.object,
	translations: PropTypes.object,
	langs: PropTypes.array,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		langs: 'langs',
		[ownProps.containerName]: {
			data: {
				translation: 'translation',
				translations: 'translations',
			},
		},
	};
};

class Edit extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = () => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	onBeforeSubmit = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="onBeforeSubmit">
		const { langs } = this.props;

		forEach(langs, (lang) => {
			data[lang] = Base64.encode(data[lang]);
		});
		//</editor-fold>
	};

	renderLangs = () => {
		//<editor-fold defaultstate="collapsed" desc="renderLangs">
		const { langs, translations } = this.props;

		return map(langs, (lang) => {
			let value = get(translations, `${lang}.content`, '');

			if (isNull(value)) {
				value = '';
			}
			return (
				<Field
					key={lang}
					label={upperCase(lang)}
					name={lang}
					component={TextArea}
					componentProps={{
						autoSize: true,
					}}
					value={value}
				/>
			);
		});
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
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				submit={{
					title: 'Save',
				}}>
				{this.renderLangs()}
			</Form>
		);
	}
}

Edit.propTypes = propTypes;

Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;
