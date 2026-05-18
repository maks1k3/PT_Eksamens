import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AceEditorUi from 'react-ace';

import 'brace/theme/monokai';

import 'brace/mode/jsx';
import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/less';
import 'brace/mode/json';
//import 'brace/mode/php'; //not working

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

const propTypes = {
	value: PropTypes.any,
	valueId: PropTypes.any,
	disabled: PropTypes.bool,
	readonly: PropTypes.bool,

	theme: PropTypes.string,
	mode: PropTypes.oneOf(['jsx', 'javascript', 'html', 'css', 'less', 'json']),

	width: PropTypes.string,
	height: PropTypes.string,

	onChange: PropTypes.func,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	disabled: false,
	readonly: false,

	theme: 'monokai',
	mode: 'jsx',

	width: '100%',
	height: '500px',
};

const options = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: false,
	showLineNumbers: true,
	tabSize: 2,
};

class AceEditor extends Component {
	constructor(props) {
		super(props);

		const value = _.get(this.props, 'value', '');

		this.value = this.formatValue(value);
		this.state = {
			value: this.formatValue(value),
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { FieldInstance } = this.props;

		if (!_.isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this });
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
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

	/* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

	setValue = value => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;

		this.setState({
			value: value,
		});
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return this.value;
		//</editor-fold>
	};

	formatValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatValue">
		value = _.toString(value);

		return value;
		//</editor-fold>
	};

	onChange = value => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, disabled, readonly } = this.props;

		if (disabled || readonly) {
			return;
		}

		this.value = value;
		this.setState({
			value: value,
		});

		if (_.isFunction(onChange)) {
			onChange({ value: value, AceEditor: this, debounce: true });
		}
		//</editor-fold>
	};

	render() {
		const { width, height, mode, disabled, readonly, theme } = this.props;
		const { value } = this.state;

		const _readonly = disabled ? true : readonly;

		return (
			<AceEditorUi
				width={width}
				height={height}
				mode={mode}
				theme={theme}
				fontSize={16}
				showPrintMargin={true}
				showGutter={true}
				highlightActiveLine={true}
				readOnly={_readonly}
				value={value}
				onChange={this.onChange}
				setOptions={options}
				editorProps={{
					$blockScrolling: Infinity,
				}}
			/>
		);
	}
}

AceEditor.propTypes = propTypes;

AceEditor.defaultProps = defaultProps;

export default AceEditor;
