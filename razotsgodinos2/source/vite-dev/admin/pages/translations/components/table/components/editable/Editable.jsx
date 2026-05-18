import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import { Base64 } from 'js-base64';
import Button from 'ui/controls/button';

import Form from 'ui/form';
import Field from 'ui/form/field';
import TextArea from 'ui/inputs/textarea';

import styles from './Editable.module.less';
import { get, truncate } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	lang: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,

	//state
	inEditMode: PropTypes.bool,
};

const defaultProps = {
	//state
	inEditMode: false,
};

class Editable extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onBeforeSubmit = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="onBeforeSubmit">
		const { lang } = this.props;
		data[lang] = Base64.encode(data[lang]);

		//</editor-fold>
	};

	onSuccess = ({ Form }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { id, lang } = this.props;
		const value = get(Form.fields, lang).getValue();

		uiStore.update(`dt_translations.rows.${id}`, {
			[lang]: value,
			[`inEditMode_${lang}`]: false,
		});
		//</editor-fold>
	};

	onEditClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onEditClick">
		const { id, lang } = this.props;

		uiStore.update(`dt_translations.rows.${id}`, {
			[`inEditMode_${lang}`]: true,
		});
		//</editor-fold>
	};

	onCancelClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onCancelClick">
		const { id, lang } = this.props;

		uiStore.update(`dt_translations.rows.${id}`, {
			[`inEditMode_${lang}`]: false,
		});
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { id, lang, value } = this.props;

		return (
			<Form
				action="administration/translations/actions"
				extraData={{
					action: 'update',
					id: id,
				}}
				submit={{
					theme: 'primary',
					title: 'Save',
				}}
				showResponse={false}
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				renderSubmit={this.renderSubmit}>
				<Field
					name={lang}
					component={TextArea}
					componentProps={{
						autoSize: true,
					}}
					value={value}
				/>
			</Form>
		);
		//</editor-fold>
	};

	renderSubmit = ({ submitButton }) => {
		//<editor-fold defaultstate="collapsed" desc="renderSubmit">
		return (
			<div className={styles['submit-wrapper']}>
				<div>
					<Button theme="danger" title="Cancel" onClick={this.onCancelClick} />
				</div>
				<div>{submitButton}</div>
			</div>
		);
		//</editor-fold>
	};

	renderCell = () => {
		//<editor-fold defaultstate="collapsed" desc="renderCell">
		const { value } = this.props;

		if (_g.isEmpty(value)) {
			return (
				<span className={styles['edit']} onClick={this.onEditClick}>
					Edit
				</span>
			);
		} else {
			const content = truncate(escape(value));
			return <span onDoubleClick={this.onEditClick}>{content}</span>;
		}

		//</editor-fold>
	};

	render() {
		const { inEditMode } = this.props;

		if (!inEditMode) {
			return this.renderCell();
		} else {
			return this.renderForm();
		}
	}
}

Editable.propTypes = propTypes;

Editable.defaultProps = defaultProps;

export default Editable;
