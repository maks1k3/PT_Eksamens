import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import './FroalaEditorBundle';

const propTypes = {
	value: PropTypes.string,
	valueId: PropTypes.string,
	onChange: PropTypes.func, //onChange
	disabled: PropTypes.bool,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	disabled: false,
};

class FroalaEditor extends Component {
	constructor(props) {
		super(props);
		this.textarea = React.createRef();

		const value = _.get(this.props, 'value', '');

		this.value = this.formatValue(value);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.initEditor();

		const { FieldInstance } = this.props;

		if (!_.isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this });
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.disabled !== this.props.disabled) {
			this.setDisabled(this.props.disabled);
		}

		if (prevProps.value !== this.props.value) {
			if (this.value !== this.props.value) {
				this.setValue(this.props.value);
			}
		}

		if (prevProps.valueId !== this.props.valueId) {
			this.setValue(this.props.value);
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		$(this.textarea.current).froalaEditor('destroy');
		//</editor-fold>
	}

	/* ========================================================================*
  *
  *                     Methods
  *
  * ========================================================================*/

	setValue = value => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;

		this.setEditorData(value);
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return this.value;
		//</editor-fold>
	};

	formatValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatNumber">
		value = _.toString(value);

		return value;
		//</editor-fold>
	};

	initEditor = () => {
		//<editor-fold defaultstate="collapsed" desc="initEditor">
		$(this.textarea.current)
			.froalaEditor(this.getOptions())
			.on('froalaEditor.contentChanged', (e, editor) => {
				this.onChange(editor.html.get());
			});
		$('.fr-wrapper')
			.next()
			.remove(); //remove the Froala copyright notice

		this.setEditorData(this.value);

		const { disabled } = this.props;

		if (disabled) {
			this.setDisabled(true);
		}
		//</editor-fold>
	};

	getOptions = () => {
		//<editor-fold defaultstate="collapsed" desc="getOptions">
		const options = {};

		//all ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'];
		const buttons = [
			'fullscreen',
			'bold',
			'italic',
			'underline',
			'strikeThrough',
			'insertCode',
			'color',
			'|',
			'paragraphFormat',
			'align',
			'formatOL',
			'formatUL',
			'outdent',
			'indent',
			'quote',
			'insertHR',
			'|',
			'insertTable',
			'undo',
			'redo',
			'clearFormatting',
			'html',
			'help',
		];

		options.toolbarButtons = buttons;
		options.toolbarButtonsMD = buttons;
		options.toolbarButtonsSM = buttons;
		options.toolbarButtonsXS = buttons;
		options.toolbarSticky = false;
		options.enter = $.FroalaEditor.ENTER_DIV;
		options.tabSpaces = 4;
		options.pastePlain = false;
		options.spellcheck = true;
		options.htmlRemoveTags = ['script', 'style', 'base'];
		options.imageUploadURL = '/api/example_api/save_editor_image';
		options.imageUploadParams = {
			_token: $('meta[name="csrf-token"]').attr('content'),
		};

		return options;
		//</editor-fold>
	};

	getEditorData = () => {
		//<editor-fold defaultstate="collapsed" desc="getEditorData">
		return $(this.textarea.current).froalaEditor('html.get');
		//</editor-fold>
	};

	setEditorData = data => {
		//<editor-fold defaultstate="collapsed" desc="setEditorData">
		$(this.textarea.current).froalaEditor('html.set', data);
		//</editor-fold>
	};

	onChange = new_value => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		if (new_value === this.value) {
			return;
		}
		const { onChange } = this.props;
		this.value = new_value;

		if (_.isFunction(onChange)) {
			onChange({ value: this.value, FroalaEditor: this });
		}
		//</editor-fold>
	};

	setDisabled = disabled => {
		//<editor-fold defaultstate="collapsed" desc="setDisabled">
		if (disabled) {
			$(this.textarea.current).froalaEditor('edit.off');
			$(this.textarea.current).froalaEditor('toolbar.disable');
		} else {
			$(this.textarea.current).froalaEditor('edit.on');
			$(this.textarea.current).froalaEditor('toolbar.enable');
		}
		//</editor-fold>
	};

	render() {
		return <textarea ref={this.textarea} />;
	}
}

FroalaEditor.propTypes = propTypes;

FroalaEditor.defaultProps = defaultProps;

export default FroalaEditor;
