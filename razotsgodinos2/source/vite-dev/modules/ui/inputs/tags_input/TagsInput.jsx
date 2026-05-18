import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'ui/inputs/autocomplete';

import inputStyles from './Input.module.less';
import styles from './TagsInput.module.less';
import {
	find,
	get,
	isFunction,
	isNull,
	isUndefined,
	last,
	map,
	replace,
	toLower,
	toString,
	trim,
	trimStart,
} from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	value: PropTypes.any,
	valueId: PropTypes.any,

	controlled: PropTypes.bool,

	disabled: PropTypes.bool,
	readonly: PropTypes.bool,

	caseSensitive: PropTypes.bool, //If true do not allow to add "tag" and "Tag"
	removeWithBackspace: PropTypes.bool,
	onlyFromAutoComplete: PropTypes.bool,
	minChars: PropTypes.number, //minimum tag length

	//text
	defaultText: PropTypes.string,

	//callbacks
	onChange: PropTypes.func, //on add or remove tag
	onAddTag: PropTypes.func,
	onRemoveTag: PropTypes.func,

	//UI customization
	renderTags: PropTypes.func,
	renderTag: PropTypes.func,

	AutoCompleteProps: PropTypes.object,
	showValidationError: PropTypes.bool,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	classNames: {},

	loading: false,
	opened: false,

	controlled: false,

	disabled: false,
	readonly: false,

	caseSensitive: false,
	removeWithBackspace: false,
	onlyFromAutoComplete: false,
	minChars: 2,

	defaultText: 'Add a tag',

	showValidationError: false,
};

class TagsInput extends Component {
	constructor(props) {
		super(props);

		this.autoCompleteInput = React.createRef();
		this.container = React.createRef();

		const value = get(this.props, 'value', '');
		this.value = this.formatValue(value);
		this.tags = _g.isEmpty(this.value) ? [] : this.value.split(',');

		this.state = {
			value: this.value,
			tags: _g.isEmpty(this.value) ? [] : this.value.split(','),
			showError: false,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { FieldInstance } = this.props;

		if (!isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this, isInput: true });
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

	focus = () => {
		//<editor-fold defaultstate="collapsed" desc="focus">
		if (this.autoCompleteInput.current) {
			this.autoCompleteInput.current.focus();
		}
		//</editor-fold>
	};

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;
		this.tags = _g.isEmpty(this.value) ? [] : this.value.split(',');

		this.setState({
			value: value,
			tags: _g.isEmpty(this.value) ? [] : this.value.split(','),
		});
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		return this.value;
		//</editor-fold>
	};

	formatValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="formatNumber">
		value = toString(value);
		value = trimStart(value);
		return value;
		//</editor-fold>
	};

	resetAutoComplete = () => {
		//<editor-fold defaultstate="collapsed" desc="resetAutoComplete">
		this.autoCompleteInput.current.reset();
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onAddTag = (tag) => {
		//<editor-fold defaultstate="collapsed" desc="onAddTag">
		const { disabled, readonly } = this.props;

		if (readonly || disabled) {
			return;
		}

		const { tags } = this.state;
		const { onAddTag, onChange, caseSensitive, minChars } = this.props;
		tag = trim(tag);
		tag = replace(tag, /,/g, '');

		if (tag.length < minChars) {
			return;
		}

		let passed = true;

		if (caseSensitive) {
			const found = find(tags, function (t) {
				return toLower(t) === toLower(tag);
			});

			if (!isUndefined(found)) {
				passed = false;
			}
		} else {
			if (_g.inArray(tag, tags)) {
				passed = false;
			}
		}

		if (!passed) {
			this.setState({
				showError: true,
			});
			return;
		}

		this.resetAutoComplete();

		this.tags.push(tag);
		this.value = this.tags.join(',');

		this.setState(
			{
				value: this.value,
				tags: _g.isEmpty(this.value) ? [] : this.value.split(','),
				showError: false,
			},
			() => {
				if (isFunction(onAddTag)) {
					onAddTag({ tag, TagsInput: this });
				}

				if (isFunction(onChange)) {
					onChange({ tags: this.tags, value: this.value, TagsInput: this });
				}
			},
		);
		//</editor-fold>
	};

	onRemoveTag = (tag) => {
		//<editor-fold defaultstate="collapsed" desc="onRemoveTag">
		const { disabled, readonly } = this.props;

		if (readonly || disabled) {
			return;
		}

		const { onRemoveTag, onChange } = this.props;

		if (_g.inArray(tag, this.tags)) {
			const index = this.tags.indexOf(tag);

			this.tags.splice(index, 1);
			this.value = this.tags.join(',');

			this.setState(
				{
					value: this.value,
					tags: _g.isEmpty(this.value) ? [] : this.value.split(','),
					showError: false,
				},
				() => {
					if (isFunction(onRemoveTag)) {
						onRemoveTag({ tag, TagsInput: this });
					}

					if (isFunction(onChange)) {
						onChange({ tags: this.tags, value: this.value, TagsInput: this });
					}
				},
			);
		}
		//</editor-fold>
	};

	onSelectFromAutoComplete = ({ label }) => {
		//<editor-fold defaultstate="collapsed" desc="onSelectFromAutoComplete">
		this.onAddTag(label);
		//</editor-fold>
	};

	onInputKeyUp = ({ key, value }) => {
		//<editor-fold defaultstate="collapsed" desc="onInputKeyUp">
		const { removeWithBackspace } = this.props;

		if (key === 'Backspace' && removeWithBackspace && value.length === 0) {
			const lastTag = last(this.tags);

			if (!isUndefined(lastTag)) {
				this.onRemoveTag(lastTag);
			}
		}
		//</editor-fold>
	};

	onInputKeyDown = ({ key, value, event }) => {
		//<editor-fold defaultstate="collapsed" desc="onInputKeyDown">
		if (_g.inArray(key, ['ArrowDown', 'ArrowUp', 'Enter'])) {
			event.preventDefault();
		}

		this.autoCompleteInput.current.stopped = false;
		if (key === 'Enter') {
			const { onlyFromAutoComplete } = this.props;

			this.autoCompleteInput.current.stopped = true;

			if (!isNull(this.autoCompleteInput.current.state.focusedIndex)) {
				return;
			}

			if (!onlyFromAutoComplete) {
				this.onAddTag(value);
			}
		}
		//</editor-fold>
	};

	onContainerClick = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onContainerClick">
		if (event.target === this.container.current) {
			this.focus();
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderTags = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderTags">
		const { renderTags } = this.props;
		const { tags } = this.state;

		if (isFunction(renderTags)) {
			return renderTags({
				classNames,
				tags,
				TagsInput: this,
			});
		}

		return map(tags, this.renderTag);
		//</editor-fold>
	};

	renderTag = (tag, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderTag">
		const { renderTag } = this.props;
		const classNames = this.classNames;

		if (isFunction(renderTag)) {
			return renderTag({
				classNames,
				tag,
				index,
				TagsInput: this,
				onRemoveTag: this.onRemoveTag,
			});
		}

		return (
			<span key={index} className={classNames['tag']}>
				<span className={classNames['tag-title']}>{tag}</span>
				<span
					className={classNames['tag-remove']}
					onClick={() => {
						this.onRemoveTag(tag);
					}}>
					×
				</span>
			</span>
		);
		//</editor-fold>
	};

	renderAutoComplete = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderAutoComplete">
		const { AutoCompleteProps, disabled, defaultText } = this.props;

		const { showError } = this.state;

		const className = _g.classNames(classNames['autocomplete-wrapper'], {
			[classNames['autocomplete-wrapper_error']]: showError,
		});

		return (
			<div className={className}>
				<AutoComplete
					ref={this.autoCompleteInput}
					InputProps={{
						classNames: inputStyles,
						onKeyDown: this.onInputKeyDown,
						onKeyUp: this.onInputKeyUp,
						placeholder: defaultText,
						invisible: true,
						loading: false,
					}}
					disabled={disabled}
					onSelect={this.onSelectFromAutoComplete}
					{...AutoCompleteProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { showValidationError, disabled } = this.props;

		const className = _g.classNames(classNames['wrapper'], {
			[classNames['wrapper_error']]: showValidationError,
			[classNames['wrapper_disabled']]: disabled,
		});

		return (
			<div
				ref={this.container}
				onClick={this.onContainerClick}
				className={className}>
				{this.renderTags(classNames)}
				{this.renderAutoComplete(classNames)}
			</div>
		);
	}
}

TagsInput.propTypes = propTypes;

TagsInput.defaultProps = defaultProps;

export default TagsInput;
