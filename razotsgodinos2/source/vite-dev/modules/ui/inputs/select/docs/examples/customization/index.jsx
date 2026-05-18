import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Select from 'ui/inputs/select';
import Icon from 'ui/misc/icon';

import styles from './styles.less';

const title = 'Select: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Select from 'ui/inputs/select';
import Icon from 'ui/misc/icon';

<Select
	classNames={styles}
	closeOnOutsideClick={false}
	closeOnSelect={false}
	icon={{
		provider: 'mdi',
		name: 'atom',
	}}
	caretUpIcon={{
		provider: 'fa',
		name: 'angle-up',
	}}
	caretDownIcon={{
		provider: 'fa',
		name: 'angle-down',
	}}
	clearIcon={{
		provider: 'icomoon',
		name: 'cross',
	}}
	options={[
		{
			value: 'option_1',
			label: 'Option 1',
		},
		{
			value: 'option_2',
			label: 'Option 2',
		},
		{
			value: 'option_3',
			label: 'Option 3',
		},
		{
			value: 'option_4',
			label: 'Option 4',
		},
	]}
	renderSelect={({
		classNames,
		focused,
		showValidationError,
		disabled,
		Select,
	}) => {
		const className = _g.classNames(
			classNames['wrapper'],
			{ [classNames['wrapper_focused']]: focused },
			{ [classNames['wrapper_disabled']]: disabled },
			{ [classNames['wrapper_error']]: showValidationError },
		);

		return (
			<div
				ref={Select.trigger}
				tabIndex={0}
				className={className}
				onClick={Select.onSelectClick}
				onFocus={Select.onFocus}
				onBlur={Select.onBlur}>
				{Select.renderLeft(classNames)}
				{Select.renderCenter(classNames)}
				{Select.renderRight(classNames)}
				{Select.renderDisabled(classNames)}
			</div>
		);
	}}
	renderMenu={({ classNames, searchInput, options, Select }) => {
		return (
			<div>
				{searchInput}
				{options}
			</div>
		);
	}}
	renderValue={({
		classNames,
		value,
		label,
		onValueClickProp,
		onValueClick,
		Select,
	}) => {
		const className = _g.classNames(classNames['value'], {
			[classNames['value_clickable']]: _.isFunction(onValueClickProp),
		});

		return (
			<div className={classNames['value-wrapper']}>
				<span
					className={className}
					onClick={event => {
						onValueClick({ value, event });
					}}>
					{label}
				</span>
			</div>
		);
	}}
	renderPlaceholder={({ classNames, placeholder, Select }) => {
		return (
			<div className={classNames['placeholder-wrapper']}>
				<span className={classNames['placeholder']}>{placeholder}</span>
			</div>
		);
	}}
	renderClear={({
		classNames,
		clearIcon,
		onClearClick,
		clearValueText,
		Select,
	}) => {
		return (
			<div
				className={classNames['clearable-wrapper']}
				onClick={onClearClick}
				title={clearValueText}>
				<Icon
					className={classNames['clearable']}
					provider={clearIcon.provider}
					name={clearIcon.name}
				/>
			</div>
		);
	}}
	renderCaret={({
		classNames,
		opened,
		caretUpIcon,
		caretDownIcon,
		Select,
	}) => {
		return (
			<div className={classNames['caret-wrapper']}>
				<Icon
					className={classNames['caret']}
					provider={
						opened ? caretUpIcon.provider : caretDownIcon.provider
					}
					name={opened ? caretUpIcon.name : caretDownIcon.name}
				/>
			</div>
		);
	}}
	renderOption={({ index, className, onClick, value, label, option, Select }) => {
		return (
			<div key={index} className={className} onClick={onClick}>
				{label}
			</div>
		);
	}}
	renderLoading={({ classNames, Select }) => {
		return (
			<div className={classNames['loading-wrapper']}>
				<div className={classNames['loading']} />
			</div>
		);
	}}
	renderLeft={({ classNames, icon, Select }) => {
		if (!_.isUndefined(icon)) {
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
	}}
	renderRight={({ classNames, clear, loading, caret, Select }) => {
		return (
			<div className={classNames['right']}>
				{clear}
				{loading}
				{caret}
			</div>
		);
	}}
/>
//Mutli
<Select
	classNames={styles}
	value="option_1,option_2,option_3"
	multi={true}
	options={[
		{
			value: 'option_1',
			label: 'Option 1',
		},
		{
			value: 'option_2',
			label: 'Option 2',
		},
		{
			value: 'option_3',
			label: 'Option 3',
		},
		{
			value: 'option_4',
			label: 'Option 4',
		},
	]}
	renderMultiValue={({
		classNames,
		values,
		labels,
		onValueClickProp,
		onValueClick,
		onChange,
		Select,
	}) => {
		const className = _g.classNames(classNames['tag-title'], {
			[classNames['tag-title_clickable']]: _.isFunction(onValueClickProp),
		});

		const tags = _.map(labels, (label, index) => {
			return (
				<span key={index} className={classNames['tag']}>
					<span
						className={className}
						onClick={event => {
							onValueClick({ value: values[index], event });
						}}>
						{label}
					</span>
					<span
						className={classNames['tag-remove']}
						onClick={event => {
							event.stopPropagation();
							onChange(values[index]);
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
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Select
				classNames={styles}
				closeOnOutsideClick={false}
				closeOnSelect={false}
				icon={{
					provider: 'mdi',
					name: 'atom',
				}}
				caretUpIcon={{
					provider: 'fa',
					name: 'angle-up',
				}}
				caretDownIcon={{
					provider: 'fa',
					name: 'angle-down',
				}}
				clearIcon={{
					provider: 'icomoon',
					name: 'cross',
				}}
				options={[
					{
						value: 'option_1',
						label: 'Option 1',
					},
					{
						value: 'option_2',
						label: 'Option 2',
					},
					{
						value: 'option_3',
						label: 'Option 3',
					},
					{
						value: 'option_4',
						label: 'Option 4',
					},
				]}
				renderSelect={({
					classNames,
					focused,
					showValidationError,
					disabled,
					Select,
				}) => {
					const className = _g.classNames(
						classNames['wrapper'],
						{ [classNames['wrapper_focused']]: focused },
						{ [classNames['wrapper_disabled']]: disabled },
						{ [classNames['wrapper_error']]: showValidationError },
					);

					return (
						<div
							ref={Select.trigger}
							tabIndex={0}
							className={className}
							onClick={Select.onSelectClick}
							onFocus={Select.onFocus}
							onBlur={Select.onBlur}>
							{Select.renderLeft(classNames)}
							{Select.renderCenter(classNames)}
							{Select.renderRight(classNames)}
							{Select.renderDisabled(classNames)}
						</div>
					);
				}}
				renderMenu={({ classNames, searchInput, options, Select }) => {
					return (
						<div>
							{searchInput}
							{options}
						</div>
					);
				}}
				renderValue={({
					classNames,
					value,
					label,
					onValueClickProp,
					onValueClick,
					Select,
				}) => {
					const className = _g.classNames(classNames['value'], {
						[classNames['value_clickable']]: _.isFunction(onValueClickProp),
					});

					return (
						<div className={classNames['value-wrapper']}>
							<span
								className={className}
								onClick={event => {
									onValueClick({ value, event });
								}}>
								{label}
							</span>
						</div>
					);
				}}
				renderPlaceholder={({ classNames, placeholder, Select }) => {
					return (
						<div className={classNames['placeholder-wrapper']}>
							<span className={classNames['placeholder']}>{placeholder}</span>
						</div>
					);
				}}
				renderClear={({
					classNames,
					clearIcon,
					onClearClick,
					clearValueText,
					Select,
				}) => {
					return (
						<div
							className={classNames['clearable-wrapper']}
							onClick={onClearClick}
							title={clearValueText}>
							<Icon
								className={classNames['clearable']}
								provider={clearIcon.provider}
								name={clearIcon.name}
							/>
						</div>
					);
				}}
				renderCaret={({
					classNames,
					opened,
					caretUpIcon,
					caretDownIcon,
					Select,
				}) => {
					return (
						<div className={classNames['caret-wrapper']}>
							<Icon
								className={classNames['caret']}
								provider={
									opened ? caretUpIcon.provider : caretDownIcon.provider
								}
								name={opened ? caretUpIcon.name : caretDownIcon.name}
							/>
						</div>
					);
				}}
				renderOption={({
					index,
					className,
					onClick,
					value,
					label,
					option,
					Select,
				}) => {
					return (
						<div key={index} className={className} onClick={onClick}>
							{label}
						</div>
					);
				}}
				renderLoading={({ classNames, Select }) => {
					return (
						<div className={classNames['loading-wrapper']}>
							<div className={classNames['loading']} />
						</div>
					);
				}}
				renderLeft={({ classNames, icon, Select }) => {
					if (!_.isUndefined(icon)) {
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
				}}
				renderRight={({ classNames, clear, loading, caret, Select }) => {
					return (
						<div className={classNames['right']}>
							{clear}
							{loading}
							{caret}
						</div>
					);
				}}
			/>
			<h3>Mutli</h3>
			<Select
				classNames={styles}
				value="option_1,option_2,option_3"
				multi={true}
				options={[
					{
						value: 'option_1',
						label: 'Option 1',
					},
					{
						value: 'option_2',
						label: 'Option 2',
					},
					{
						value: 'option_3',
						label: 'Option 3',
					},
					{
						value: 'option_4',
						label: 'Option 4',
					},
				]}
				renderMultiValue={({
					classNames,
					values,
					labels,
					onValueClickProp,
					onValueClick,
					onChange,
					Select,
				}) => {
					const className = _g.classNames(classNames['tag-title'], {
						[classNames['tag-title_clickable']]: _.isFunction(onValueClickProp),
					});

					const tags = _.map(labels, (label, index) => {
						return (
							<span key={index} className={classNames['tag']}>
								<span
									className={className}
									onClick={event => {
										onValueClick({ value: values[index], event });
									}}>
									{label}
								</span>
								<span
									className={classNames['tag-remove']}
									onClick={event => {
										event.stopPropagation();
										onChange(values[index]);
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
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
