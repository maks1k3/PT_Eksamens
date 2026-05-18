import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import ScriptsLoader from 'utils/ScriptsLoader';
import {
	forEach,
	get,
	isFunction,
	isNull,
	isUndefined,
	toString,
} from 'lodash-es';

const propTypes = {
	value: PropTypes.string,
	valueId: PropTypes.string,
	toolbar: PropTypes.oneOf([
		'tiny',
		'small',
		'default',
		'pro',
		'custom',
		'full',
	]),
	customToolbar: PropTypes.array,
	lang: PropTypes.string,
	onChange: PropTypes.func, //onChange
	disabled: PropTypes.bool,

	//styling
	uiColor: PropTypes.string,
	//skin: PropTypes.oneOf(['moono', 'kama', 'moono-lisa']),
	width: PropTypes.string,
	height: PropTypes.string,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	lang: 'en',
	uiColor: '#f8f8f8',
	toolbar: 'default',

	//skin: 'moono-lisa',
	disabled: false,
};

class CKEditor extends Component {
	constructor(props) {
		super(props);
		this.textarea = React.createRef();

		const value = get(this.props, 'value', '');
		this.value = this.formatValue(value);

		this.editor = null;
		this.options = {};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		ScriptsLoader.load({
			js: {
				CKEditor:
					_g.getMainUrl() + 'assets/js/libs/editors/ckeditor/ckeditor.js',
			},
			onLoad: this.onScriptsLoaded,
		});

		const { FieldInstance } = this.props;

		if (!isUndefined(FieldInstance)) {
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

		const updatedOptions = {};

		forEach(
			['toolbar', 'customToolbar', 'lang', 'uiColor', 'width', 'height'],
			(key) => {
				if (
					!isUndefined(prevProps[key]) &&
					prevProps[key] !== this.props[key]
				) {
					updatedOptions[key] = this.props[key];
				}
			},
		);

		if (!_g.isEmpty(updatedOptions)) {
			this.initEditor();
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		if (!isNull(this.editor)) {
			this.editor.destroy();
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;

		if (!isNull(this.editor)) {
			this.setEditorData(value);
		}
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return this.value;
		//</editor-fold>
	};

	formatValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="formatValue">
		value = toString(value);

		return value;
		//</editor-fold>
	};

	getEditorData = () => {
		//<editor-fold defaultstate="collapsed" desc="getEditorData">
		return this.editor.getData();
		//</editor-fold>
	};

	setEditorData = (data) => {
		//<editor-fold defaultstate="collapsed" desc="setEditorData">
		this.editor.setData(data);
		//</editor-fold>
	};

	setDisabled = (disabled) => {
		//<editor-fold defaultstate="collapsed" desc="setDisabled">
		if (!isNull(this.editor)) {
			this.editor.setReadOnly(disabled);
		}
		//</editor-fold>
	};

	onScriptsLoaded = () => {
		//<editor-fold defaultstate="collapsed" desc="onScriptsLoaded">
		window.CKEDITOR.disableAutoInline = true;
		this.initEditor();
		//</editor-fold>
	};

	initEditor = () => {
		//<editor-fold defaultstate="collapsed" desc="initEditor">
		if (isUndefined(window.CKEDITOR)) {
			return;
		}

		const { disabled } = this.props;

		if (!isNull(this.editor)) {
			this.editor.destroy();
		}

		this.editor = window.CKEDITOR.replace(
			this.textarea.current,
			this.getOptions(),
		);

		this.editor.on('instanceReady', (e) => {
			e.editor.on('change', () => {
				this.onChange(e.editor.getData());
			});

			if (disabled) {
				e.editor.setReadOnly(true);
			}

			e.editor.setData(this.value);
		});
		//</editor-fold>
	};

	onChange = (value) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		if (value === this.value) {
			return;
		}
		const { onChange } = this.props;
		this.value = value;

		if (isFunction(onChange)) {
			onChange({ value: this.value, CKEditor: this, debounce: true });
		}
		//</editor-fold>
	};

	getOptions = () => {
		//<editor-fold defaultstate="collapsed" desc="getOptions">
		const { lang, height, width, uiColor } = this.props;

		let options = {};

		options.language = lang;
		options.uiColor = uiColor;
		options.skin = 'moono-lisa';
		options.disableNativeSpellChecker = false;
		options.entities = false; //fix to &Scaron;š problem
		options.extraPlugins = 'font,justify';
		//options.filebrowserBrowseUrl = "/assets/js/frameworks/kcfinder/browse.php?type=files&lang=<?=$_COOKIE['lang']?>",;
		//options.removePlugins = 'contextmenu';

		if (!isUndefined(height)) {
			options.height = height;
		}

		if (!isUndefined(width)) {
			options.width = width;
		}

		options = this.getToolbarOptions(options);

		return options;
		//</editor-fold>
	};

	getToolbarOptions = (options) => {
		//<editor-fold defaultstate="collapsed" desc="getToolbarOptions">
		const { toolbar, customToolbar } = this.props;
		switch (toolbar) {
			case 'custom':
				options.removePlugins = 'elementspath';
				options.toolbar = customToolbar;
				break;
			case 'tiny':
				options.removePlugins = 'elementspath';
				options.toolbar = [
					{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] },
				];
				break;
			case 'small':
				options.removePlugins = 'elementspath';
				options.toolbar = [
					{ name: 'clipboard', items: ['Undo', 'Redo'] },
					{
						name: 'formationg',
						items: [
							'JustifyLeft',
							'JustifyCenter',
							'JustifyRight',
							'JustifyBlock',
						],
					},
					{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] },
					{ name: 'colors', items: ['TextColor', 'BGColor'] },
				];
				break;
			case 'pro':
				options.toolbar = [
					{
						name: 'clipboard',
						items: [
							'Source',
							'-',
							'Cut',
							'Copy',
							'Paste',
							'PasteText',
							'PasteFromWord',
							'-',
							'Undo',
							'Redo',
						],
					},
					{
						name: 'formationg',
						items: [
							'NumberedList',
							'BulletedList',
							'-',
							'Outdent',
							'Indent',
							'Blockquote',
							'-',
							'JustifyLeft',
							'JustifyCenter',
							'JustifyRight',
							'JustifyBlock',
						],
					},
					{ name: 'link', items: ['Link', 'Unlink', 'Anchor'] },
					{
						name: 'special',
						items: [
							'Image',
							'SpecialChar',
							'Table',
							'HorizontalRule',
							'Smiley',
						],
					},
					'/',
					{
						name: 'basicstyles',
						items: [
							'Bold',
							'Italic',
							'Underline',
							'Strike',
							'Subscript',
							'Superscript',
							'-',
							'RemoveFormat',
						],
					},
					{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
					{ name: 'colors', items: ['TextColor', 'BGColor'] },
					{ name: 'tools', items: ['Maximize', '-', 'About'] },
				];
				break;
			case 'default':
				options.removePlugins = 'elementspath';
				options.toolbar = [
					{
						name: 'clipboard',
						items: [
							// 'Source',
							'Cut',
							'Copy',
							'Paste',
							'PasteText',
							'PasteFromWord',
							'-',
							'Undo',
							'Redo',
						],
					},
					{
						name: 'formationg',
						items: [
							'NumberedList',
							'BulletedList',
							'-',
							'Outdent',
							'Indent',
							'Blockquote',
							'-',
							'JustifyLeft',
							'JustifyCenter',
							'JustifyRight',
							'JustifyBlock',
						],
					},
					{ name: 'link', items: ['Link', 'Unlink', 'Anchor'] },
					{ name: 'special', items: ['SpecialChar'] },
					'/',
					{
						name: 'basicstyles',
						items: [
							'Bold',
							'Italic',
							'Underline',
							'Strike',
							'Subscript',
							'Superscript',
							'-',
							'RemoveFormat',
						],
					},
					{ name: 'styles', items: ['Format', 'FontSize'] },
					{ name: 'colors', items: ['TextColor', 'BGColor'] },
					{ name: 'tools', items: ['Maximize', '-', 'About'] },
				];
				break;
			case 'full':
				break;
			default:
		}

		return options;
		//</editor-fold>
	};

	render() {
		return <textarea ref={this.textarea} />;
	}
}

CKEditor.propTypes = propTypes;

CKEditor.defaultProps = defaultProps;

CKEditor = WithLocale(CKEditor);

export default CKEditor;
