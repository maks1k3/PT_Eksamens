import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import Dropdown from 'ui/controls/dropdown';
import Input from 'ui/inputs/input';
import Icon from 'ui/misc/icon';

import styles from './Select.module.less';
import {
	escapeRegExp,
	filter,
	find,
	findIndex,
	forEach,
	get,
	indexOf,
	isFunction,
	isNull,
	isUndefined,
	map,
	replace,
	toArray,
	toString,
	uniqWith,
} from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	value: PropTypes.any,
	valueId: PropTypes.any,

	InputProps: PropTypes.object,
	DropdownProps: PropTypes.object,

	loading: PropTypes.bool,
	opened: PropTypes.bool,

	options: PropTypes.array,
	valueKey: PropTypes.string,
	labelKey: PropTypes.string,

	//async
	async: PropTypes.bool,
	autoload: PropTypes.bool, //whether to auto-load the default async options set
	asyncMinInput: PropTypes.number, //minimum input length to start searching
	asyncTimeout: PropTypes.number, //searching timeout
	termKey: PropTypes.string, //search input value will be sent with this key

	//serverside options
	optionsUrl: PropTypes.string, //load options from url
	extraData: PropTypes.object, //extra data that will be sent to server
	parseOptions: PropTypes.func, //parse server response to extract options

	controlled: PropTypes.bool,
	multi: PropTypes.bool,
	searchable: PropTypes.bool,
	clearable: PropTypes.bool,
	disabled: PropTypes.bool,
	readonly: PropTypes.bool,

	closeOnOutsideClick: PropTypes.bool,
	closeOnSelect: PropTypes.bool,

	loadOptions: PropTypes.func,
	asyncSearch: PropTypes.func,

	//callbacks
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onValueClick: PropTypes.func, //on selected value click

	//texts
	placeholder: PropTypes.string,
	clearValueText: PropTypes.string,
	noResultsText: PropTypes.string,
	searchPromptText: PropTypes.string,
	loadingPlaceholder: PropTypes.string,

	icon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
	caretUpIcon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
	caretDownIcon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
	clearIcon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),

	//UI customization
	renderSelect: PropTypes.func,
	renderMenu: PropTypes.func,
	renderValue: PropTypes.func,
	renderMultiValue: PropTypes.func,
	renderPlaceholder: PropTypes.func,
	renderClear: PropTypes.func,
	renderCaret: PropTypes.func,
	renderOption: PropTypes.func,
	renderLoading: PropTypes.func,
	renderLeft: PropTypes.func,
	renderRight: PropTypes.func,

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

	//async
	async: false,
	autoload: false,
	asyncMinInput: 2,
	asyncTimeout: 400,
	termKey: 'term',

	//serverside options
	extraData: {},

	controlled: false,
	multi: false,

	searchable: false,
	clearable: false,
	disabled: false,
	readonly: false,

	closeOnOutsideClick: true,

	//text
	placeholder: 'Select',
	clearValueText: 'Clear value',
	noResultsText: 'No results found',
	searchPromptText: 'Type to search',
	loadingPlaceholder: 'Loading...',

	caretUpIcon: {
		provider: 'fa',
		name: 'caret-up',
	},
	caretDownIcon: {
		provider: 'fa',
		name: 'caret-down',
	},
	clearIcon: {
		provider: 'icomoon',
		name: 'cross3',
	},

	showValidationError: false,
};

class Select extends Component {
	constructor(props) {
		super(props);

		this.trigger = React.createRef();

		this.searchInput = React.createRef();

		const value = get(this.props, 'value', '');

		this.value = this.formatValue(value);

		this.searchValue = '';

		this.options = _g.cloneDeep(get(this.props, 'options', []));
		this.state = {
			focused: false,
			value: this.value,
			label: this.getLabel(this.value, this.options),
			focusedIndex: null,
			opened: this.props.opened,
			loading: this.props.loading,
			options: _g.cloneDeep(get(this.props, 'options', [])),
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;

		const { optionsUrl, async, autoload } = this.props;

		if (!isUndefined(optionsUrl) && !async) {
			this.setState({ loading: true });
			this.loadOptions();
		}

		if (async && autoload) {
			this.asyncSearch('', true);
		}

		ee.on(events.keydown.enter, this.onEnter);
		ee.on(events.keydown.space, this.onEnter);
		ee.on(events.keydown.tab, this.onTab);
		ee.on(events.keydown.esc, this.onEsc);
		ee.on(events.keydown.up, this.onArrowKeyUp);
		ee.on(events.keydown.down, this.onArrowKeyDown);

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
			updatedState.label = this.getLabel(this.value, this.options);
		}

		if (prevProps.value !== this.props.value) {
			if (this.value !== this.props.value) {
				this.value = this.formatValue(this.props.value);
				updatedState.value = this.value;
				updatedState.label = this.getLabel(this.value, this.options);
			}
		}

		if (prevProps.valueId !== this.props.valueId) {
			this.value = this.formatValue(this.props.value);
			updatedState.value = this.value;
			updatedState.label = this.getLabel(this.value, this.options);
		}

		if (!_g.isEmpty(updatedState)) {
			this.setState(updatedState);
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;

		ee.off(events.keydown.enter, this.onEnter);
		ee.off(events.keydown.space, this.onEnter);
		ee.off(events.keydown.tab, this.onTab);
		ee.off(events.keydown.esc, this.onEsc);
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
		this.setState({
			focused: true,
		});
		//</editor-fold>
	};

	setValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);
		this.value = value;

		const updatedState = {};

		updatedState.value = value;
		updatedState.label = this.getLabel(value, this.options);

		this.setState(updatedState);
		//</editor-fold>
	};

	setValueAndOptions = (value, options) => {
		//<editor-fold defaultstate="collapsed" desc="setValueAndOptions">
		value = this.formatValue(value);
		this.value = value;
		this.options = _g.cloneDeep(options);

		const updatedState = {};

		updatedState.value = value;
		updatedState.options = _g.cloneDeep(options);
		updatedState.label = this.getLabel(this.value, this.options);

		this.setState(updatedState);
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

		return value;
		//</editor-fold>
	};

	getLabel = (value, options) => {
		//<editor-fold defaultstate="collapsed" desc="getLabel">
		const { valueKey, labelKey, multi } = this.props;

		if (multi) {
			const values = value.split(',');

			if (_g.isEmpty(values)) {
				return '';
			}

			const labels = [];

			forEach(values, (v) => {
				let label = get(
					find(options, (o) => toString(o[valueKey]) == v),
					labelKey,
					'',
				);

				if (!_g.isEmpty(label)) {
					label = replace(label, /,/g, '');
					labels.push(label);
				}
			});

			return labels.join(',');
		} else {
			let label = get(
				find(options, (o) => toString(o[valueKey]) == value),
				labelKey,
				'',
			);

			return toString(label);
		}
		//</editor-fold>
	};

	getSelectedOptions = () => {
		//<editor-fold defaultstate="collapsed" desc="getSelectedOptions">
		const { multi, valueKey } = this.props;

		const allOptions = this.options;

		const options = [];

		const value = this.value;

		if (_g.isEmpty(value)) {
			return [];
		}

		if (multi) {
			const values = value.split(',');

			forEach(values, (v) => {
				const option = find(allOptions, (o) => o[valueKey] == v);

				if (!_g.isEmpty(option)) {
					options.push(option);
				}
			});
		} else {
			const option = find(allOptions, (o) => o[valueKey] == value);

			if (!_g.isEmpty(option)) {
				options.push(option);
			}
		}

		return options;
		//</editor-fold>
	};

	filterOptions = (value, options) => {
		//<editor-fold defaultstate="collapsed" desc="filterOptions">
		const { valueKey } = this.props;

		const values = value.split(',');

		return filter(options, (o) => {
			const _value = toString(get(o, valueKey, ''));

			if (_g.isEmpty(_value)) {
				return false;
			}

			const index = indexOf(values, _value);

			return !(index >= 0);
		});

		//</editor-fold>
	};

	loadOptions = () => {
		//<editor-fold defaultstate="collapsed" desc="loadOptions">
		const { optionsUrl, extraData, loadOptions } = this.props;

		if (isFunction(loadOptions)) {
			loadOptions({
				optionsUrl,
				extraData,
				mounted: this.mounted,
				Select: this,
			});
			return;
		}

		this.setState({
			loading: true,
		});

		remoteRequest({
			url: optionsUrl,
			data: extraData,
			onSuccess: (response) => {
				if (!this.mounted) {
					return;
				}
				this.setState({
					options: this.parseOptions(response),
					label: this.getLabel(this.value, this.options),
					loading: false,
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
		//</editor-fold>
	};

	parseOptions = (response) => {
		//<editor-fold defaultstate="collapsed" desc="parseOptions">
		const { parseOptions, multi, valueKey } = this.props;
		const value = this.value;

		let options = [];
		const originalOptions = this.options;

		if (isFunction(parseOptions)) {
			options = parseOptions(response);
		} else {
			options = response.options;
		}

		options = toArray(options);

		//save options for selected values
		if (multi) {
			const values = value.split(',');

			if (!_g.isEmpty(values)) {
				forEach(values, (v) => {
					const index = findIndex(
						originalOptions,
						(o) => toString(o[valueKey]) === v,
					);

					if (index >= 0) {
						options.push(originalOptions[index]);
					}
				});
			}
		} else {
			if (!_g.isEmpty(value)) {
				const index = findIndex(
					originalOptions,
					(o) => toString(o[valueKey]) === value,
				);

				if (index >= 0) {
					options.push(originalOptions[index]);
				}
			}
		}

		options = uniqWith(options, (o1, o2) => {
			return toString(o1[valueKey]) === toString(o2[valueKey]);
		});

		this.options = _g.cloneDeep(options);

		return options;
		//</editor-fold>
	};

	asyncSearch = (term, force = false) => {
		//<editor-fold defaultstate="collapsed" desc="asyncSearch">
		const { optionsUrl, asyncMinInput, extraData, termKey, asyncSearch } =
			this.props;

		if (isUndefined(optionsUrl)) {
			return;
		}

		if (isFunction(asyncSearch)) {
			asyncSearch({
				term,
				optionsUrl,
				asyncMinInput,
				extraData,
				termKey,
				mounted: this.mounted,
				Select: this,
			});
			return;
		}

		let data = _g.cloneDeep(extraData);

		term = trim(term);

		if (!force && term.length < asyncMinInput) {
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
				this.setState({
					options: this.parseOptions(response),
					loading: false,
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
		//</editor-fold>
	};

	getTriggerRef = () => {
		//<editor-fold defaultstate="collapsed" desc="getTriggerRef">
		return this.trigger;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Callbacks
	 *
	 * ========================================================================*/

	onArrowKeyUp = ({ event }) => {
		//<editor-fold defaultstate="collapsed" desc="onArrowKeyUp">
		const { multi } = this.props;

		const { opened, focusedIndex, value, options } = this.state;

		if (opened) {
			event.preventDefault();
		}

		let _options = options;

		if (multi) {
			_options = this.filterOptions(value, options);
		}

		if (!opened || _options.length === 0) {
			return;
		}

		const newIndex = isNull(focusedIndex)
			? _options.length - 1
			: focusedIndex - 1;

		if (!isUndefined(_options[newIndex])) {
			this.onChangeSelectIndex(newIndex);
		} else {
			this.onChangeSelectIndex(null);
		}
		//</editor-fold>
	};

	onArrowKeyDown = ({ event }) => {
		//<editor-fold defaultstate="collapsed" desc="onArrowKeyDown">
		const { multi } = this.props;

		const { opened, focusedIndex, value, focused, options } = this.state;

		if (opened) {
			event.preventDefault();
		}

		if (!opened && focused) {
			event.preventDefault();
			this.onOpen();
		}

		let _options = options;

		if (multi) {
			_options = this.filterOptions(value, options);
		}

		if (!opened || _options.length === 0) {
			return;
		}
		const newIndex = isNull(focusedIndex) ? 0 : focusedIndex + 1;

		if (!isUndefined(_options[newIndex])) {
			this.onChangeSelectIndex(newIndex);
		} else {
			this.onChangeSelectIndex(null);
		}
		//</editor-fold>
	};

	onEnter = () => {
		//<editor-fold defaultstate="collapsed" desc="onEnter">
		const { multi, valueKey } = this.props;

		const { value, opened, focusedIndex, options } = this.state;

		let _options = options;

		if (multi) {
			_options = this.filterOptions(value, options);
		}

		if (!opened || isNull(focusedIndex)) {
			return;
		}

		const selected = get(_options[focusedIndex], valueKey, '');

		this.onChange(selected);
		//</editor-fold>
	};

	onTab = () => {
		//<editor-fold defaultstate="collapsed" desc="onTab">
		const { opened } = this.state;

		if (opened) {
			this.onClose();
		}
		//</editor-fold>
	};

	onEsc = () => {
		//<editor-fold defaultstate="collapsed" desc="onEsc">
		const { opened } = this.state;

		if (opened) {
			this.onClose();
		}
		//</editor-fold>
	};

	onChangeSelectIndex = (focusedIndex) => {
		//<editor-fold defaultstate="collapsed" desc="onChangeSelectIndex">
		this.setState({
			focusedIndex,
		});
		//</editor-fold>
	};

	onFocus = () => {
		//<editor-fold defaultstate="collapsed" desc="onFocus">
		if (!browser_window.tabIsPressed) {
			//focus only on tab
			return;
		}
		const { onFocus, disabled } = this.props;

		const { opened } = this.state;

		if (disabled) {
			return;
		}

		if (opened) {
			return;
		}

		this.setState(
			{
				focused: true,
			},
			() => {
				if (isFunction(onFocus)) {
					onFocus({ Select: this });
				}
			},
		);
		//</editor-fold>
	};

	onBlur = () => {
		//<editor-fold defaultstate="collapsed" desc="onBlur">
		const { onBlur, disabled } = this.props;

		if (disabled) {
			return;
		}

		this.setState(
			{
				focused: false,
			},
			() => {
				if (isFunction(onBlur)) {
					onBlur({ Select: this });
				}
			},
		);
		//</editor-fold>
	};

	onValueClick = ({ value, event }) => {
		//<editor-fold defaultstate="collapsed" desc="onValueClick">
		const { onValueClick } = this.props;

		if (isFunction(onValueClick)) {
			event.stopPropagation();
			onValueClick({ value, event, Select: this });
		}
		//</editor-fold>
	};

	onOpen = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		const { onOpen, disabled, async, searchable } = this.props;

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
				focused: false,
			},
			() => {
				if (async || searchable) {
					setTimeout(() => {
						this.searchInput.current.focus();
					}, 1);
				}

				if (isFunction(onOpen)) {
					onOpen({ Select: this });
				}
			},
		);
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		const { onClose } = this.props;

		const { opened } = this.state;

		if (!opened) {
			return;
		}

		this.setState(
			{
				opened: false,
			},
			() => {
				if (isFunction(onClose)) {
					onClose({ Select: this });
				}
			},
		);
		//</editor-fold>
	};

	onSelectClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onSelectClick">
		const { opened } = this.state;

		if (!opened) {
			this.onOpen();
		} else {
			this.onClose();
		}
		//</editor-fold>
	};

	onChange = (selected) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const {
			multi,
			searchable,
			async,
			disabled,
			readonly,
			onChange,
			closeOnSelect,
			controlled,
		} = this.props;

		selected = toString(selected);

		const { value } = this.state;

		if (disabled || readonly) {
			return;
		}

		let _value = toString(selected);

		if (multi) {
			_value = value.split(',');
			_value = filter(_value, (i) => !_g.isEmpty(i));

			const index = indexOf(_value, selected);

			if (index < 0) {
				_value.push(selected);
			} else {
				_value.splice(index, 1);
			}

			_value = _value.join(',');
		}

		if (controlled) {
			if (isFunction(onChange)) {
				this.setState({
					focusedIndex: null,
				});

				if (searchable || async) {
					this.searchInput.current.setValue('');

					this.onSearch('');
				}

				onChange({ value: _value, Select: this });

				if (!_g.isEmpty(_value)) {
					if (!isUndefined(closeOnSelect) && closeOnSelect) {
						this.onClose();
					} else if (!multi) {
						this.onClose();
					}
				}
			}
			return;
		}

		this.value = _value;

		const updatedState = {};

		updatedState.value = _value;
		updatedState.focusedIndex = null;
		updatedState.label = this.getLabel(_value, this.options);

		this.setState(updatedState, () => {
			if (isFunction(onChange)) {
				onChange({ value: _value, Select: this });
			}

			if (!_g.isEmpty(_value)) {
				if (!isUndefined(closeOnSelect) && closeOnSelect) {
					this.onClose();
				} else if (!multi) {
					this.onClose();
				}
			}
		});

		if (searchable || async) {
			this.searchInput.current.setValue('');

			this.onSearch('');
		}

		//</editor-fold>
	};

	onSearch = ({ value }) => {
		//<editor-fold defaultstate="collapsed" desc="onSearch">
		const { async, labelKey } = this.props;

		this.searchValue = value;

		if (!async) {
			let _options = _g.cloneDeep(this.options);

			if (!_g.isEmpty(value)) {
				const term = new RegExp(escapeRegExp(value), 'i');

				_options = filter(_options, (o) => {
					const label = toString(get(o, labelKey));

					if (_g.isEmpty(label)) {
						return false;
					}

					return label.search(term) >= 0;
				});
			}

			this.setState({
				options: _options,
			});
		} else {
			this.asyncSearch(value);
		}
		//</editor-fold>
	};

	onClearClick = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onClearClick">
		e.stopPropagation();
		this.onChange('');
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderSelect = () => {
		//<editor-fold defaultstate="collapsed" desc="renderSelect">
		const classNames = this.classNames;
		const { focused, opened } = this.state;
		const { showValidationError, disabled, renderSelect } = this.props;

		if (isFunction(renderSelect)) {
			return renderSelect({
				classNames,
				focused,
				showValidationError,
				disabled,
				Select: this,
			});
		}

		const className = _g.classNames(
			classNames['wrapper'],
			{ [classNames['wrapper_opened']]: opened },
			{ [classNames['wrapper_focused']]: focused },
			{ [classNames['wrapper_disabled']]: disabled },
			{ [classNames['wrapper_error']]: showValidationError },
		);

		return (
			<div
				ref={this.trigger}
				tabIndex={0}
				className={className}
				onClick={this.onSelectClick}
				onFocus={this.onFocus}
				onBlur={this.onBlur}>
				{this.renderLeft(classNames)}
				{this.renderCenter(classNames)}
				{this.renderRight(classNames)}
				{this.renderDisabled(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderLeft = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLeft">
		const { renderLeft, icon } = this.props;

		if (isFunction(renderLeft)) {
			return renderLeft({
				classNames,
				icon,
				Select: this,
			});
		}
		if (!isUndefined(icon)) {
			return (
				<div className={classNames['left']}>
					<Icon
						className={classNames['icon']}
						provider={icon.provider}
						name={icon.name}
					/>
				</div>
			);
		} else {
			const className = _g.classNames(
				classNames['left'],
				classNames['left_empty'],
			);
			return <div className={className} />;
		}
		//</editor-fold>
	};

	renderCenter = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderCenter">
		return (
			<div className={classNames['center']}>
				{this.renderValue(classNames)}
				{this.renderPlaceholder(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderDisabled = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderDisabled">
		const { disabled } = this.props;

		if (!disabled) {
			return null;
		}

		return <div className={classNames['disabled']} />;
		//</editor-fold>
	};

	renderValue = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderValue">
		const { multi, renderValue, renderMultiValue, onValueClick } = this.props;

		const { value, label, loading } = this.state;

		if (loading && !multi) {
			return null;
		}

		if (_g.isEmpty(value)) {
			return null;
		}

		if (multi) {
			const values = value.split(',');
			const labels = label.split(',');

			if (isFunction(renderMultiValue)) {
				return renderMultiValue({
					classNames,
					values,
					labels,
					onValueClickProp: onValueClick,
					onValueClick: this.onValueClick,
					onChange: this.onChange,
					Select: this,
				});
			}

			const className = _g.classNames(classNames['tag-title'], {
				[classNames['tag-title_clickable']]: isFunction(onValueClick),
			});

			const tags = map(labels, (label, index) => {
				return (
					<span key={index} className={classNames['tag']}>
						<span
							className={className}
							onClick={(event) => {
								this.onValueClick({ value: values[index], event });
							}}>
							{label}
						</span>
						<span
							className={classNames['tag-remove']}
							onClick={(event) => {
								event.stopPropagation();
								this.onChange(values[index]);
							}}>
							×
						</span>
					</span>
				);
			});

			return (
				<div className={classNames['multi-value-wrapper']}>
					<div className={classNames['tags-wrapper']}>{tags}</div>
				</div>
			);
		} else {
			if (isFunction(renderValue)) {
				return renderValue({
					classNames,
					value,
					label,
					onValueClickProp: onValueClick,
					onValueClick: this.onValueClick,
					Select: this,
				});
			}

			const className = _g.classNames(classNames['value'], {
				[classNames['value_clickable']]: isFunction(onValueClick),
			});

			return (
				<div className={classNames['value-wrapper']}>
					<span
						className={className}
						onClick={(event) => {
							this.onValueClick({ value, event });
						}}>
						{label}
					</span>
				</div>
			);
		}

		//</editor-fold>
	};

	renderPlaceholder = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderPlaceholder">
		const { placeholder, loadingPlaceholder, renderPlaceholder, multi } =
			this.props;
		const { loading, label } = this.state;

		if (!_g.isEmpty(label) && !loading) {
			return null;
		}

		if (!_g.isEmpty(label) && loading && multi) {
			return null;
		}

		let _placeholder = !loading ? placeholder : loadingPlaceholder;

		if (isFunction(renderPlaceholder)) {
			return renderPlaceholder({
				classNames,
				placeholder: _placeholder,
				Select: this,
			});
		}

		return (
			<div className={classNames['placeholder-wrapper']}>
				<span className={classNames['placeholder']}>{_placeholder}</span>
			</div>
		);
		//</editor-fold>
	};

	renderRight = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderRight">
		const { renderRight } = this.props;

		if (isFunction(renderRight)) {
			return renderRight({
				classNames,
				clear: this.renderClear(classNames),
				loading: this.renderLoading(classNames),
				caret: this.renderCaret(classNames),
				Select: this,
			});
		}

		return (
			<div className={classNames['right']}>
				{this.renderClear(classNames)}
				{this.renderLoading(classNames)}
				{this.renderCaret(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderClear = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderClear">
		const {
			clearable,
			clearValueText,
			clearIcon,
			searchable,
			multi,
			renderClear,
		} = this.props;

		const { opened, loading, value, label } = this.state;

		if (multi) {
			return null;
		}

		if (loading && !(opened && searchable)) {
			return null;
		}

		if (_g.isEmpty(value) || !clearable || _g.isEmpty(label)) {
			return null;
		}

		if (isFunction(renderClear)) {
			return renderClear({
				classNames,
				clearIcon,
				onClearClick: this.onClearClick,
				clearValueText,
				Select: this,
			});
		}

		return (
			<div
				className={classNames['clearable-wrapper']}
				onClick={this.onClearClick}
				title={clearValueText}>
				<Icon
					className={classNames['clearable']}
					provider={clearIcon.provider}
					name={clearIcon.name}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderLoading = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLoading">
		const { searchable, async, renderLoading } = this.props;
		const { loading, opened } = this.state;

		if (!loading) {
			return null;
		}

		if (opened && (searchable || async)) {
			return null;
		}

		if (isFunction(renderLoading)) {
			return renderLoading({
				classNames,
				Select: this,
			});
		}

		return (
			<div className={classNames['loading-wrapper']}>
				<div className={classNames['loading']} />
			</div>
		);
		//</editor-fold>
	};

	renderCaret = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderCaret">
		const { caretUpIcon, caretDownIcon, renderCaret } = this.props;

		const { opened } = this.state;

		if (isFunction(renderCaret)) {
			return renderCaret({
				classNames,
				opened,
				caretUpIcon,
				caretDownIcon,
				Select: this,
			});
		}

		return (
			<div className={classNames['caret-wrapper']}>
				{opened ? (
					<svg
						style={{ transform: 'rotate(180deg)' }}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M16.293 8.05029L12 12.3433L7.70697 8.05029L6.29297 9.46429L12 15.1713L17.707 9.46429L16.293 8.05029Z"
							fill="#182223"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M16.293 8.05029L12 12.3433L7.70697 8.05029L6.29297 9.46429L12 15.1713L17.707 9.46429L16.293 8.05029Z"
							fill="#182223"
						/>
					</svg>
				)}
			</div>
		);
		//</editor-fold>
	};

	renderMenu = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderMenu">
		const { renderMenu } = this.props;

		if (isFunction(renderMenu)) {
			return renderMenu({
				classNames,
				searchInput: this.renderSearchInput(classNames),
				options: this.renderOptions(classNames),
				Select: this,
			});
		}

		return (
			<div>
				{this.renderSearchInput(classNames)}
				{this.renderOptions(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderSearchInput = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderSearchInput">
		const { searchable, InputProps, searchPromptText, async, asyncTimeout } =
			this.props;

		const { loading } = this.state;

		if (searchable || async) {
			return (
				<div className={classNames['search-input-wrapper']}>
					<Input
						{...InputProps}
						ref={this.searchInput}
						placeholder={searchPromptText}
						icon={{
							provider: 'fa',
							name: 'search',
						}}
						loading={loading}
						clearable={true}
						autoComplete="off"
						onSearch={this.onSearch}
						searchTimeout={asyncTimeout}
						value={this.searchValue}
					/>
				</div>
			);
		}
		//</editor-fold>
	};

	renderOptions = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderOptions">
		const { noResultsText, multi } = this.props;

		const { options, value } = this.state;

		let _options = options;

		if (multi) {
			_options = this.filterOptions(value, options);
		}

		if (_g.isEmpty(_options)) {
			return <div className={classNames['no-results']}>{noResultsText}</div>;
		}

		const renderedOptions = map(_options, (option, index) => {
			return this.renderOption({ classNames, option, index });
		});

		return (
			<div className={classNames['options-wrapper']}>{renderedOptions}</div>
		);
		//</editor-fold>
	};

	renderOption = ({ classNames, option, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderOption">
		const { valueKey, labelKey, renderOption } = this.props;

		const { value, focusedIndex } = this.state;

		const label = get(option, labelKey, '');
		const _value = toString(get(option, valueKey, ''));

		const className = _g.classNames(classNames['option'], {
			[classNames['option_current']]:
				(!_g.isEmpty(value) && _value === value) || focusedIndex === index,
		});

		if (isFunction(renderOption)) {
			return renderOption({
				index,
				className,
				onClick: () => {
					this.onChange(_value);
				},
				value: _value,
				label,
				option,
				Select: this,
			});
		}

		return (
			<div
				key={index}
				className={className}
				onClick={() => {
					this.onChange(_value);
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
				renderTrigger={this.renderSelect}
				content={this.renderMenu(classNames)}
				opened={disabled ? false : opened}
				onClose={this.onClose}
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

Select.propTypes = propTypes;

Select.defaultProps = defaultProps;

Select = WithLocale(Select);

export default Select;
