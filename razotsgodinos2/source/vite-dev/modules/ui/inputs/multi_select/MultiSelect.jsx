import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'ui/misc/icon';
import Input from 'ui/inputs/input';

import styles from './MultiSelect.module.less';

const propTypes = {
	options: PropTypes.array,
	classNames: PropTypes.object,
	searchable: PropTypes.bool,
	debounce: PropTypes.number,
	renderOption: PropTypes.func,
	render: PropTypes.func,
	renderSearchInput: PropTypes.func,
	renderArrows: PropTypes.func,
	renderList: PropTypes.func,

	onChange: PropTypes.func,
	onSelect: PropTypes.func,
	onUnselect: PropTypes.func,

	//from Field
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	options: [],
	searchable: false,
	debounce: 100,
	value: '',
};

class MultiSelect extends Component {
	constructor(props) {
		super(props);
		const value = _.get(this.props, 'value', '');

		this.values = this.formatValue(value);
		this.state = {
			selectedOptions: this.getSelectedOptions(),
			mouseOverElement: '',
			unselectedSearchValue: '',
			selectedSearchValue: '',
		};
		this.unselected = React.createRef();
		this.selected = React.createRef();
	}
	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">

		const { FieldInstance } = this.props;

		if (!_.isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this });
		}

		//</editor-fold>
	}
	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	selectAll = () => {
		//<editor-fold defaultstate="collapsed" desc="selectAll">
		const { options } = this.props;

		const { unselectedSearchValue, selectedOptions } = this.state;

		const term = !_g.isEmpty(unselectedSearchValue)
			? new RegExp(_.escapeRegExp(unselectedSearchValue), 'i')
			: null;

		let currentlyUnSelectedOptions = _.filter(options, o => {
			if (_g.inArray(o.value, selectedOptions)) {
				return false;
			}

			if (o.disabled) {
				return false;
			}

			if (!_g.isEmpty(unselectedSearchValue) && o.label.search(term) < 0) {
				return false;
			}

			return true;
		});

		currentlyUnSelectedOptions = _.map(
			currentlyUnSelectedOptions,
			o => o.value,
		);

		const newSelectedOptions = _.union(
			currentlyUnSelectedOptions,
			selectedOptions,
		);

		this.setState({ selectedOptions: newSelectedOptions });
		this.values = newSelectedOptions.join(',');
		if (_.isFunction(this.props.onSelect)) {
			this.props.onSelect({ value: currentlyUnSelectedOptions.join(',') });
		}
		this.onChange(this.values);
		this.selected.current.focus();
		//</editor-fold>
	};

	selectItem = option => {
		//<editor-fold defaultstate="collapsed" desc="selectItem">
		return () => {
			this.addValue(option.value);
			if (_.isFunction(this.props.onSelect)) {
				this.props.onSelect({ value: option.value });
			}
			this.onChange(this.state.selectedOptions.join(','));
		};
		//</editor-fold>
	};

	unselectAll = () => {
		//<editor-fold defaultstate="collapsed" desc="unselectAll">
		const { options } = this.props;

		const { selectedSearchValue, selectedOptions } = this.state;

		const term = !_g.isEmpty(selectedSearchValue)
			? new RegExp(_.escapeRegExp(selectedSearchValue), 'i')
			: null;

		let currentlySelectedOptions = _.filter(options, o => {
			if (!_g.inArray(o.value, selectedOptions)) {
				return false;
			}

			if (o.disabled) {
				return false;
			}

			if (!_g.isEmpty(selectedSearchValue) && o.label.search(term) < 0) {
				return false;
			}

			return true;
		});

		currentlySelectedOptions = _.map(currentlySelectedOptions, o => o.value);
		const newSelectedOptions = _.filter(
			selectedOptions,
			o => !_g.inArray(o, currentlySelectedOptions),
		);

		this.setState({ selectedOptions: newSelectedOptions });
		this.values = newSelectedOptions.join(',');
		if (_.isFunction(this.props.onUnselect)) {
			this.props.onUnselect({
				value: currentlySelectedOptions.join(','),
			});
		}
		this.onChange(this.values);
		this.unselected.current.focus();
		//</editor-fold>
	};

	unselectItem = option => {
		//<editor-fold defaultstate="collapsed" desc="unselectItem">
		return () => {
			this.removeValue(option.value);
			if (_.isFunction(this.props.onUnselect)) {
				this.props.onUnselect({
					value: option.value,
				});
			}
			this.onChange(this.state.selectedOptions.join(','));
		};
		//</editor-fold>
	};

	onChange = value => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		if (_.isFunction(this.props.onChange)) {
			this.props.onChange({ value: value });
		}
		//</editor-fold>
	};

	removeValue = (value = '') => {
		//<editor-fold defaultstate="collapsed" desc="removeValue">
		let newValues = this.state.selectedOptions;
		_.map(value.split(','), value => {
			var index = newValues.findIndex(element => {
				return element == value;
			});

			if (index !== -1) {
				newValues.splice(index, 1);
			}
		});
		this.values = newValues.join(',');
		this.setState({ selectedOptions: newValues });
		//</editor-fold>
	};

	addValue = (value = '') => {
		//<editor-fold defaultstate="collapsed" desc="addValue">
		let newValues = this.state.selectedOptions;
		_.map(value.split(','), value => {
			var index = this.props.options.findIndex(element => {
				return element.value == value;
			});

			if (index !== -1 && !newValues.includes(value)) {
				newValues.push(this.props.options[index].value);
			}
		});
		this.values = newValues.join(',');
		this.setState({ selectedOptions: newValues });
		//</editor-fold>
	};

	getSelectedOptions = () => {
		//<editor-fold defaultstate="collapsed" desc="getSelectedOptions">
		const { options } = this.props;

		let selectedOptions = [];

		_.map(this.values.split(','), value => {
			const index = _.findIndex(options, o => o.value == value);
			if (index !== -1) {
				selectedOptions.push(options[index].value);
			}
		});

		return selectedOptions;
		//</editor-fold>
	};

	setValue = (value = '') => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		value = this.formatValue(value);

		this.values = value;
		let selectedOptions = [];
		_.map(value.split(','), value => {
			var index = this.props.options.findIndex(element => {
				return element.value == value;
			});
			if (index !== -1) {
				selectedOptions.push(this.props.options[index].value);
			}
		});
		this.setState({ selectedOptions: selectedOptions });
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">

		return this.values;
		//</editor-fold>
	};

	formatValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatValue">

		return _.toString(value);
		//</editor-fold>
	};

	/* ========================================================================*
 *
 *                     Events
 *
 * ========================================================================*/

	onSearchUnselected = ({ value }) => {
		//<editor-fold defaultstate="collapsed" desc="onSearchUnselected">
		this.setState({
			unselectedSearchValue: value,
			mouseOverElement: '',
		});

		//</editor-fold>
	};

	onSearchSelected = ({ value }) => {
		//<editor-fold defaultstate="collapsed" desc="onSearchSelected">
		this.setState({
			selectedSearchValue: value,
			mouseOverElement: '',
		});
		//</editor-fold>
	};

	onMouseEnter = element => {
		//<editor-fold defaultstate="collapsed" desc="onMouseEnter">
		return () => {
			this.setState({ mouseOverElement: _g.cloneDeep(element) });
		};
		//</editor-fold>
	};

	onMouseLeave = () => {
		//<editor-fold defaultstate="collapsed" desc="onMouseLeave">
		return () => {
			this.setState({ mouseOverElement: '' });
		};
		//</editor-fold>
	};

	onFocusUnselected = e => {
		//<editor-fold defaultstate="collapsed" desc="onFocusUnselected">
		e.preventDefault();

		let options = this.props.options;

		if (!_.isEmpty(this.state.mouseOverElement)) {
			var optionIndex = options.findIndex(element => {
				return element.value == this.state.mouseOverElement.value;
			});
			let propsOption = options[optionIndex];
			var selectedIndex = this.state.selectedOptions.findIndex(element => {
				return element == propsOption.value;
			});
			const term = new RegExp(
				_.escapeRegExp(this.state.unselectedSearchValue),
				'i',
			);
			if (optionIndex !== -1) {
				if (selectedIndex == -1) {
					let newValues = this.state.selectedOptions;
					newValues.push(options[optionIndex].value);
					this.setState({
						selectedOptions: newValues,
					});
					this.values = newValues.join(',');
					if (_.isFunction(this.props.onSelect)) {
						this.props.onSelect({ value: options[optionIndex].value });
					}
					this.onChange(this.values);
				} else {
					if (!_.isEmpty(this.state.unselectedSearchValue)) {
						let shouldLoop = true;

						while (shouldLoop) {
							optionIndex = optionIndex + 1;
							if (_.isEmpty(options[optionIndex])) {
								shouldLoop = false;
							} else {
								let selectedIndex = this.state.selectedOptions.findIndex(
									element => {
										return element == options[optionIndex].value;
									},
								);
								if (
									selectedIndex == -1 &&
									options[optionIndex].label.search(term) >= 0
								) {
									shouldLoop = false;
								}
							}
						}
					} else {
						let selectedIndex = this.state.selectedOptions.findIndex(
							element => {
								return element == options[optionIndex].value;
							},
						);

						while (selectedIndex !== -1) {
							optionIndex = optionIndex + 1;
							if (_.isEmpty(options[optionIndex])) {
								break;
							}
							selectedIndex = this.state.selectedOptions.findIndex(element => {
								return element == options[optionIndex].value;
							});
						}
					}

					setTimeout(() => {
						if (
							!_.isEmpty(options[optionIndex]) &&
							!options[optionIndex].disabled
						) {
							let selectedIndex = this.state.selectedOptions.findIndex(
								element => {
									return element == options[optionIndex].value;
								},
							);

							if (selectedIndex == -1) {
								let newValues = this.state.selectedOptions;
								newValues.push(options[optionIndex].value);

								this.setState({ selectedOptions: newValues });
								this.values = newValues.join(',');
								if (_.isFunction(this.props.onSelect)) {
									this.props.onSelect({ value: options[optionIndex].value });
								}
								this.onChange(this.values);
							}
						}
					}, this.props.debounce);
				}
			}
		}

		//</editor-fold>
	};

	onFocusSelected = e => {
		//<editor-fold defaultstate="collapsed" desc="onFocusSelected">
		e.preventDefault();

		let options = this.props.options;

		if (!_.isEmpty(this.state.mouseOverElement)) {
			var optionIndex = options.findIndex(element => {
				return element.value == this.state.mouseOverElement.value;
			});
			let propsOption = options[optionIndex];
			var selectedIndex = this.state.selectedOptions.findIndex(element => {
				return element == propsOption.value;
			});
			const term = new RegExp(
				_.escapeRegExp(this.state.selectedSearchValue),
				'i',
			);

			if (optionIndex !== -1) {
				if (selectedIndex !== -1) {
					let newValues = _.clone(this.state.selectedOptions);
					if (_.isFunction(this.props.onUnselect)) {
						this.props.onUnselect({
							value: newValues[selectedIndex],
						});
					}
					newValues.splice(selectedIndex, 1);
					this.setState({
						selectedOptions: newValues,
					});
					this.values = newValues.join(',');

					this.onChange(this.values);
				} else {
					if (!_.isEmpty(this.state.selectedSearchValue)) {
						let shouldLoop = true;
						while (shouldLoop) {
							optionIndex = optionIndex + 1;
							if (_.isEmpty(options[optionIndex])) {
								shouldLoop = false;
							} else {
								let selectedIndex = this.state.selectedOptions.findIndex(
									element => {
										return element == options[optionIndex].value;
									},
								);

								if (
									selectedIndex !== -1 &&
									options[optionIndex].label.search(term) >= 0
								) {
									shouldLoop = false;
								}
							}
						}
					} else {
						let selectedIndex = this.state.selectedOptions.findIndex(
							element => {
								return element == options[optionIndex].value;
							},
						);
						while (selectedIndex == -1) {
							optionIndex = optionIndex + 1;
							if (_.isEmpty(options[optionIndex])) {
								break;
							}
							selectedIndex = this.state.selectedOptions.findIndex(element => {
								return element == options[optionIndex].value;
							});
						}
					}

					setTimeout(() => {
						if (
							!_.isEmpty(options[optionIndex]) &&
							!options[optionIndex].disabled
						) {
							let selectedIndex = this.state.selectedOptions.findIndex(
								element => {
									return element == options[optionIndex].value;
								},
							);

							if (selectedIndex !== -1) {
								let newValues = this.state.selectedOptions;
								if (_.isFunction(this.props.onUnselect)) {
									this.props.onUnselect({
										value: newValues[selectedIndex],
									});
								}
								newValues.splice(selectedIndex, 1);
								this.values = newValues.join(',');
								this.setState({ selectedOptions: newValues });

								this.onChange(this.values);
							}
						}
					}, this.props.debounce);
				}
			}
		}

		//</editor-fold>
	};

	/* ========================================================================*
 *
 *                     Renderers
 *
 * ========================================================================*/

	renderOptions = (type, classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderOptions">
		const { options } = this.props;
		const { selectedOptions } = this.state;

		const searchValue =
			type === 'unselected'
				? this.state.unselectedSearchValue
				: this.state.selectedSearchValue;

		let itemsToRender = _g.cloneDeep(options);

		if (!_g.isEmpty(searchValue)) {
			let term = new RegExp(_.escapeRegExp(searchValue), 'i');

			itemsToRender = _.filter(itemsToRender, o => {
				return o.label.search(term) >= 0;
			});
		}

		if (type === 'unselected') {
			itemsToRender = _.filter(itemsToRender, o => {
				return !selectedOptions.includes(o.value);
			});
		} else if (type === 'selected') {
			itemsToRender = _.filter(itemsToRender, o => {
				return selectedOptions.includes(o.value);
			});
		}

		return _.map(itemsToRender, (option, key) => {
			return this.renderOption({ option, key, type, classNames });
		});
		//</editor-fold>
	};

	renderOption = ({ option, key, type, classNames }) => {
		//<editor-fold defaultstate="collapsed" desc="renderOption">
		const className = _g.classNames(classNames[`${type}_item`], {
			[classNames['disabled']]: option.disabled,
		});

		const { label, disabled } = option;

		const extra = {};

		if (!disabled) {
			extra.onMouseEnter = this.onMouseEnter(option);
			extra.onMouseLeave = this.onMouseLeave(option);

			if (type === 'unselected') {
				extra.onClick = this.selectItem(option);
			} else {
				extra.onClick = this.unselectItem(option);
			}
		}

		const { renderOption } = this.props;

		if (_.isFunction(renderOption)) {
			return renderOption({
				option,
				className,
				key,
				extra,
				MultiSelect: this,
			});
		}
		return (
			<li key={key} className={className} {...extra}>
				{label}
			</li>
		);
		//</editor-fold>
	};

	renderSearchInput = (type, classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderSearchInput">
		const { searchable, renderSearchInput } = this.props;

		if (!searchable) {
			return null;
		}

		const onChange =
			type === 'unselected' ? this.onSearchUnselected : this.onSearchSelected;

		if (_.isFunction(renderSearchInput)) {
			return renderSearchInput({
				type,
				classNames,
				onChange: onChange,
				MultiSelect: this,
			});
		}

		return (
			<div className={classNames['search_bar']}>
				<Input
					icon={{
						provider: 'fa',
						name: 'search',
					}}
					clearable={true}
					autoComplete="off"
					onChange={onChange}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderArrows = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderArrows">
		const { renderArrows } = this.props;

		if (_.isFunction(renderArrows)) {
			return renderArrows({
				selectAll: this.selectAll,
				unselectAll: this.unselectAll,
				classNames: classNames,
				MultiSelect: this,
			});
		}

		return (
			<div className={classNames['icon_wrapper']}>
				<Icon
					onClick={this.selectAll}
					className={classNames['arrow_left']}
					provider="icomoon"
					name="arrow-small-right"
				/>
				<Icon
					onClick={this.unselectAll}
					className={classNames['arrow_right']}
					provider="icomoon"
					name="arrow-small-left"
				/>
			</div>
		);
		//</editor-fold>
	};

	renderList = (type, classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderList">
		const ref = type === 'unselected' ? this.unselected : this.selected;
		const onKeyDown =
			type === 'unselected' ? this.onFocusUnselected : this.onFocusSelected;

		const options = this.renderOptions(type, classNames);

		const { renderList } = this.props;

		if (_.isFunction(renderList)) {
			return renderList({
				type,
				classNames,
				ref,
				onKeyDown,
				options,
				MultiSelect: this,
			});
		}

		return (
			<ul
				ref={ref}
				tabIndex={0}
				onKeyDown={onKeyDown}
				className={classNames['unselected_wrapper']}>
				{options}
			</ul>
		);
		//</editor-fold>
	};

	render() {
		const { render } = this.props;
		const classNames = _g.getClassNames(styles, this.props.classNames);

		if (_.isFunction(render)) {
			return render({
				classNames,
				unselectedSearchInput: this.renderSearchInput('unselected', classNames),
				unselectedList: this.renderList('unselected', classNames),
				arrows: this.renderArrows(classNames),
				selectedSearchInput: this.renderSearchInput('selected', classNames),
				selectedList: this.renderList('selected', classNames),
				MultiSelect: this,
			});
		}
		return (
			<div className={classNames['wrapper']}>
				<div>
					{this.renderSearchInput('unselected', classNames)}
					{this.renderList('unselected', classNames)}
				</div>
				{this.renderArrows(classNames)}
				<div>
					{this.renderSearchInput('selected', classNames)}
					{this.renderList('selected', classNames)}
				</div>
			</div>
		);
	}
}

MultiSelect.propTypes = propTypes;

MultiSelect.defaultProps = defaultProps;

export default MultiSelect;
