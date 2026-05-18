import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Input from 'ui/inputs/input';
import Dropdown from 'ui/controls/dropdown';

import styles from './AutoComplete.module.less';
import {
	debounce,
	escapeRegExp,
	filter,
	forEach,
	get,
	isFunction,
	isNull,
	isUndefined,
	map,
	toString,
	trim,
	trimStart,
} from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	value: PropTypes.any,
	valueId: PropTypes.any,

	loading: PropTypes.bool,
	opened: PropTypes.bool,

	options: PropTypes.array,
	valueKey: PropTypes.string,
	labelKey: PropTypes.string,

	//async
	optionsUrl: PropTypes.string, //load options from url
	extraData: PropTypes.object, //extra data that will be sent to server
	parseOptions: PropTypes.func, //parse server response to extract options
	searchMinInput: PropTypes.number, //minimum input length to start searching
	searchTimeout: PropTypes.number, //searching timeout
	termKey: PropTypes.string, //search input value will be sent with this key
	autoload: PropTypes.bool,
	onRemoteSearch: PropTypes.func, // custom remote search

	onSearch: PropTypes.func, // custom search

	controlled: PropTypes.bool,

	disabled: PropTypes.bool,
	readonly: PropTypes.bool,

	closeOnOutsideClick: PropTypes.bool,

	//callbacks
	onChange: PropTypes.func, //on input change.
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onSelect: PropTypes.func, //selected value from options
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onInputKeyDown: PropTypes.func,
	onInputSubmit: PropTypes.func,
	onSubmit: PropTypes.func,

	onArrowKeyUp: PropTypes.func, //override onArrowKeyUp,
	onArrowKeyDown: PropTypes.func, //override onArrowKeyDown

	//UI customization
	renderOptions: PropTypes.func,
	renderOption: PropTypes.func,

	InputProps: PropTypes.object,
	DropdownProps: PropTypes.object,
	showValidationError: PropTypes.bool,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	classNames: {},

	loading: false,
	opened: false,

	options: [],
	valueKey: 'value',
	labelKey: 'label',

	//search
	extraData: {},
	searchMinInput: 2,
	searchTimeout: 400,
	termKey: 'term',
	autoload: false,

	controlled: false,

	disabled: false,
	readonly: false,

	closeOnOutsideClick: true,

	showValidationError: false,
};

class AutoComplete extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();
		this.focused = false;
		this.stopped = false;

		const value = get(this.props, 'value', '');

		this.options = _g.cloneDeep(get(this.props, 'options', []));

		this.value = this.formatValue(value);
		this.state = {
			value: this.formatValue(value),
			valueId: null,
			focusedIndex: null,
			opened: this.props.opened,
			loading: this.props.loading,
			options: _g.cloneDeep(get(this.props, 'options', [])),
		};

		const { searchTimeout } = this.props;
		this._search = debounce(this.search, searchTimeout);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;

		ee.on(events.keydown.up, this.onArrowKeyUp);
		ee.on(events.keydown.down, this.onArrowKeyDown);

		const { optionsUrl, autoload } = this.props;

		if (!isUndefined(optionsUrl) && autoload) {
			this.search(this.value, true);
		}

		const { FieldInstance } = this.props;

		if (!isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this, isInput: true });
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		const updatedState = {};

		forEach(['opened', 'loading'], (key) => {
			if (!isUndefined(prevProps[key]) && prevProps[key] !== this.props[key]) {
				if (this.state[key] !== this.props[key]) {
					updatedState[key] = this.props[key];
				}
			}
		});

		if (
			!isUndefined(prevProps.options) &&
			!_g.areEqualObjects(prevProps.options, this.props.options)
		) {
			updatedState.options = _g.cloneDeep(this.props.options);
			this.options = _g.cloneDeep(this.props.options);
		}

		if (prevProps.value !== this.props.value) {
			if (this.value !== this.props.value) {
				this.value = this.formatValue(this.props.value);
				updatedState.value = this.value;
				updatedState.valueId = _g.generateShortId();
			}
		}

		if (prevProps.valueId !== this.props.valueId) {
			this.value = this.formatValue(this.props.value);
			updatedState.value = this.value;
		}

		if (!_g.isEmpty(updatedState)) {
			this.setState(updatedState);
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;

		ee.off(events.keydown.up, this.onArrowKeyUp);
		ee.off(events.keydown.down, this.onArrowKeyDown);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	focus = () => {
		//<editor-fold defaultstate="collapsed" desc="focus">
		if (this.input.current) {
			this.input.current.focus();
		}
		//</editor-fold>
	};

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;

		this.setState({
			value: value,
			valueId: _g.generateShortId(),
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

	search = (term, force = false) => {
		//<editor-fold defaultstate="collapsed" desc="search">
		const {
			optionsUrl,
			extraData,
			searchMinInput,
			termKey,
			onSearch,
			labelKey,
			parseOptions,
			onRemoteSearch,
		} = this.props;

		if (this.stopped) {
			return;
		}

		if (isUndefined(optionsUrl)) {
			if (isFunction(onSearch)) {
				onSearch({
					term,
					force,
					options: this.options,
					AutoComplete: this,
				});
				return;
			}

			let _options = _g.cloneDeep(this.options);

			if (!_g.isEmpty(term)) {
				_options = filter(_options, (o) => {
					const label = toString(get(o, labelKey));

					if (_g.isEmpty(label)) {
						return false;
					}

					return label.search(new RegExp(escapeRegExp(term), 'i')) >= 0;
				});
			}

			let opened = _options.length > 0;

			this.setState((prevState) => {
				if (prevState.opened === false && opened) {
					this.onOpen();
				} else if (prevState.opened === true && !opened) {
					this.onClose();
				}

				return {
					options: _options,
					opened: opened,
				};
			});
		} else {
			if (isFunction(onRemoteSearch)) {
				onRemoteSearch({
					term,
					force,
					optionsUrl,
					searchMinInput,
					extraData,
					termKey,
					parseOptions,
					mounted: this.mounted,
					AutoComplete: this,
				});
				return;
			}

			let data = _g.cloneDeep(extraData);

			term = trim(term);

			if (!force && term.length < searchMinInput) {
				return;
			}

			data[termKey] = term;

			this.setState({
				loading: true,
			});

			remoteRequest({
				url: optionsUrl,
				data: data,
				onSuccess: (response) => {
					if (!this.mounted) {
						return;
					}
					if (this.stopped) {
						this.setState({
							loading: false,
						});
						return;
					}

					let options = [];
					if (isFunction(parseOptions)) {
						options = parseOptions(response);
					} else {
						options = response.options;
					}

					this.options = _g.cloneDeep(options);

					let opened = options.length > 0 && !force;

					this.setState((prevState) => {
						if (prevState.opened === false && opened) {
							this.onOpen();
						} else if (prevState.opened === true && !opened) {
							this.onClose();
						}

						return {
							options: options,
							loading: false,
							opened: opened,
						};
					});
				},
				onError: (response) => {
					if (!this.mounted) {
						return;
					}
					this.setState({
						loading: false,
					});
					showAlert({ content: response.msg });
				},
			});
		}
		//</editor-fold>
	};

	reset = () => {
		//<editor-fold defaultstate="collapsed" desc="reset">
		const { optionsUrl } = this.props;

		this.stopped = false;
		this.value = '';

		const extra = {};

		if (!isUndefined(optionsUrl)) {
			extra.options = [];
			this.options = [];
		}

		this.setState((prevState) => {
			if (prevState.opened === true) {
				this.onClose();
			}

			return {
				value: '',
				valueId: _g.generateShortId(),
				focusedIndex: null,
				opened: false,
				loading: false,
				...extra,
			};
		});

		//</editor-fold>
	};

	open = () => {
		//<editor-fold defaultstate="collapsed" desc="open">
		const { disabled } = this.props;

		const { opened } = this.state;

		if (disabled) {
			return;
		}

		if (opened) {
			return;
		}

		this.setState(
			{
				opened: true,
			},
			this.onOpen,
		);
		//</editor-fold>
	};

	close = () => {
		//<editor-fold defaultstate="collapsed" desc="close">
		const { opened } = this.state;

		if (!opened) {
			return;
		}

		this.setState(
			{
				opened: false,
			},
			this.onClose,
		);
		//</editor-fold>
	};

	getTriggerRef = () => {
		//<editor-fold defaultstate="collapsed" desc="getTriggerRef">
		return this.input.current.getDOMNodeRef();
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onChange = ({ value }) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onChange, controlled, disabled, readonly } = this.props;

		if (readonly || disabled) {
			return;
		}

		if (!controlled) {
			value = this.formatValue(value);
			this.value = value;

			this.setState({
				value: value,
			});
		}

		if (controlled) {
			value = this.formatValue(value);
		} else {
			value = this.getValue();
		}

		if (isFunction(onChange)) {
			onChange({ value: value, AutoComplete: this, debounce: true });
		}

		this._search(value);
		//</editor-fold>
	};

	onSelect = ({ value, label, index, option }) => {
		//<editor-fold defaultstate="collapsed" desc="onSelect">

		const { onSelect, readonly, disabled } = this.props;

		if (readonly || disabled) {
			return;
		}

		if (isFunction(onSelect)) {
			onSelect({
				value,
				label,
				index,
				option,
				AutoComplete: this,
			});
			return;
		}

		this.onSelected(label);
		//</editor-fold>
	};

	onSelected = (value) => {
		//<editor-fold defaultstate="collapsed" desc="onSelected">
		value = this.formatValue(value);
		this.value = value;

		const { onChange } = this.props;

		if (isFunction(onChange)) {
			onChange({ value: value, AutoComplete: this, debounce: false });
		}

		this.setState(
			{
				value: value,
				valueId: _g.generateShortId(),
				opened: false,
				focusedIndex: null,
			},
			this.onClose,
		);
		//</editor-fold>
	};

	onSubmit = () => {
		//<editor-fold defaultstate="collapsed" desc="onSubmit">
		const { valueKey, labelKey, onInputSubmit, onSubmit } = this.props;

		const { opened, focusedIndex, options } = this.state;

		if (!opened || isNull(focusedIndex) || options.length === 0) {
			if (isFunction(onInputSubmit)) {
				onInputSubmit({ AutoComplete: this });
			}

			if (isFunction(onSubmit)) {
				onSubmit({ Input: this });
			}

			return;
		}

		if (!isUndefined(options[focusedIndex])) {
			const { [valueKey]: value, [labelKey]: label } = options[focusedIndex];
			this.onSelect({
				value,
				label,
				index: focusedIndex,
				option: options[focusedIndex],
			});
		}
		//</editor-fold>
	};

	onInputKeyDown = ({ value, targetValue, key, event, Input }) => {
		//<editor-fold defaultstate="collapsed" desc="onInputKeyDown">
		if (_g.inArray(key, ['ArrowDown', 'ArrowUp', 'Enter'])) {
			event.preventDefault();
		}

		const { onInputKeyDown } = this.props;

		if (isFunction(onInputKeyDown)) {
			onInputKeyDown({
				value,
				targetValue,
				key,
				event,
				Input,
				AutoComplete: this,
			});
		}
		//</editor-fold>
	};

	onArrowKeyUp = () => {
		//<editor-fold defaultstate="collapsed" desc="onArrowKeyUp">
		const { onArrowKeyUp } = this.props;

		const focused = this.focused;

		if (!focused) {
			return;
		}

		if (isFunction(onArrowKeyUp)) {
			onArrowKeyUp({ AutoComplete: this });
			return;
		}

		const { opened, focusedIndex, options } = this.state;

		if (!opened || options.length === 0) {
			return;
		}

		const newIndex = isNull(focusedIndex)
			? options.length - 1
			: focusedIndex - 1;

		if (!isUndefined(options[newIndex])) {
			this.setState({
				focusedIndex: newIndex,
			});
		} else {
			this.setState({
				focusedIndex: null,
			});
		}
		//</editor-fold>
	};

	onArrowKeyDown = () => {
		//<editor-fold defaultstate="collapsed" desc="onArrowKeyDown">
		const { onArrowKeyDown } = this.props;

		const focused = this.focused;

		if (!focused) {
			return;
		}

		if (isFunction(onArrowKeyDown)) {
			onArrowKeyDown({ AutoComplete: this });
			return;
		}

		const { opened, focusedIndex, options } = this.state;

		if (!opened && options.length > 0) {
			this.open();
		}

		if (!opened || options.length === 0) {
			return;
		}

		const newIndex = isNull(focusedIndex) ? 0 : focusedIndex + 1;

		if (!isUndefined(options[newIndex])) {
			this.setState({
				focusedIndex: newIndex,
			});
		} else {
			this.setState({
				focusedIndex: null,
			});
		}
		//</editor-fold>
	};

	onFocus = () => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		this.focused = true;

		const { onFocus } = this.props;

		if (isFunction(onFocus)) {
			onFocus({ AutoComplete: this });
		}
		//</editor-fold>
	};

	onBlur = () => {
		//<editor-fold defaultstate="collapsed" desc="onBlur">
		this.focused = false;

		const { onBlur } = this.props;

		if (isFunction(onBlur)) {
			onBlur({ AutoComplete: this, value: this.value });
		}
		//</editor-fold>
	};

	onOpen = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		const { onOpen } = this.props;

		if (isFunction(onOpen)) {
			onOpen({ AutoComplete: this });
		}
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		const { onClose } = this.props;
		if (isFunction(onClose)) {
			onClose({ AutoComplete: this });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderInput = () => {
		//<editor-fold defaultstate="collapsed" desc="renderInput">
		const { InputProps, disabled, showValidationError, readonly } = this.props;

		const { value, valueId, loading } = this.state;

		return (
			<Input
				ref={this.input}
				value={value}
				valueId={valueId}
				onChange={this.onChange}
				onSubmit={this.onSubmit}
				onKeyDown={this.onInputKeyDown}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				autoComplete="off"
				loading={loading}
				disabled={disabled}
				readonly={readonly}
				showValidationError={showValidationError}
				{...InputProps}
			/>
		);
		//</editor-fold>
	};

	renderOptions = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderOptions">
		const { renderOptions } = this.props;
		const { options } = this.state;

		if (isFunction(renderOptions)) {
			return renderOptions({
				classNames,
				options,
				AutoComplete: this,
			});
		}

		const items = map(options, this.renderOption);

		return <div className={classNames['options']}>{items}</div>;
		//</editor-fold>
	};

	renderOption = (option, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderOption">
		const { renderOption, valueKey, labelKey } = this.props;
		const classNames = this.classNames;
		const { focusedIndex } = this.state;

		if (isFunction(renderOption)) {
			return renderOption({
				classNames,
				option,
				index,
				valueKey,
				labelKey,
				focusedIndex,
				onClick: () => {
					this.onSelect({ value, label, index, option });
				},
				AutoComplete: this,
			});
		}

		const { [valueKey]: value, [labelKey]: label } = option;

		const className = _g.classNames(classNames['option'], {
			[classNames['option_active']]: index === focusedIndex,
		});

		return (
			<div
				key={index}
				className={className}
				onClick={() => {
					this.onSelect({ value, label, index, option });
				}}>
				{label}
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { disabled, closeOnOutsideClick, DropdownProps } = this.props;

		const { opened } = this.state;

		return (
			<Dropdown
				{...DropdownProps}
				align="auto"
				getTriggerRef={this.getTriggerRef}
				renderTrigger={this.renderInput}
				content={this.renderOptions(classNames)}
				opened={disabled ? false : opened}
				onClose={this.close}
				closeOnContentClick={false}
				closeOnOutsideClick={closeOnOutsideClick}
				classNames={{
					wrapper: classNames['dropdown-wrapper'],
					content_style: classNames['dropdown-content'],
				}}
			/>
		);
	}
}

AutoComplete.propTypes = propTypes;

AutoComplete.defaultProps = defaultProps;

export default AutoComplete;
