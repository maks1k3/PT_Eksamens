import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import MultiSelect from 'ui/inputs/multi_select';
import Input from 'ui/inputs/input';
import Icon from 'ui/misc/icon';
import styles from './styles.less';

const title = 'MultiSelect: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MultiSelect from 'ui/inputs/multi_select';
import Icon from 'ui/misc/icon';
import Input from 'ui/inputs/input';


<MultiSelect
	searchable={true}
	classNames={styles}
	render={({
		classNames,
		unselectedSearchInput,
		unselectedList,
		arrows,
		selectedSearchInput,
		selectedList,
		MultiSelect,
	}) => {
		console.log({
			classNames: classNames,
			unselectedSearchInput: unselectedSearchInput,
			unselectedList: unselectedList,
			arrows: arrows,
			selectedSearchInput: selectedSearchInput,
			selectedList: selectedList,
			MultiSelect: MultiSelect,
		});
		return (
			<div className={classNames['wrapper']}>
				<div>
					{unselectedSearchInput}
					{unselectedList}
				</div>
				{arrows}
				<div>
					{selectedSearchInput}
					{selectedList}
				</div>
			</div>
		);
	}}
	renderOption={({
		option,
		className,
		key,
		extra,
		MultiSelect,
	}) => {
		console.log({
			option: option,
			className: className,
			key: key,
			extra: extra,
			MultiSelect: MultiSelect,
		});
		return (
			<li key={key} className={className} {...extra}>
				{option.label}
			</li>
		);
	}}
	renderSearchInput={({
		type,
		classNames,
		onChange,
		MultiSelect,
	}) => {
		console.log({
			type: type,
			classNames: classNames,
			onChange: onChange,
			MultiSelect: MultiSelect,
		});
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
	}}
	renderArrows={({
		selectAll,
		unselectAll,
		classNames,
		MultiSelect,
	}) => {
		console.log({
			selectAll: selectAll,
			unselectAll: unselectAll,
			classNames: classNames,
			MultiSelect: MultiSelect,
		});
		return (
			<div className={classNames['icon_wrapper']}>
				<Icon
					onClick={selectAll}
					className={classNames['arrow_left']}
					provider="icomoon"
					name="arrow-small-right"
				/>
				<Icon
					onClick={unselectAll}
					className={classNames['arrow_right']}
					provider="icomoon"
					name="arrow-small-left"
				/>
			</div>
		);
	}}
	renderList={({
		type,
		classNames,
		ref,
		onKeyDown,
		options,
		MultiSelect,
	}) => {
		console.log({
			type: type,
			classNames: classNames,
			ref: ref,
			onKeyDown: onKeyDown,
			options: options,
			MultiSelect: MultiSelect,
		});

		return (
			<ul
				ref={ref}
				tabIndex={0}
				onKeyDown={onKeyDown}
				className={classNames['unselected_wrapper']}>
				{options}
			</ul>
		);
	}}
	value="option_4,option_3"
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
			value: 'option_22',
			label: 'Option 22',
		},
		{
			value: 'option_3',
			label: 'Option 3',
		},
		{
			value: 'option_4',
			label: 'Option 4',
		},
		{
			value: 'option_5',
			label: 'Option 5',
		},
	]}
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
			<MultiSelect
				searchable={true}
				classNames={styles}
				render={({
					classNames,
					unselectedSearchInput,
					unselectedList,
					arrows,
					selectedSearchInput,
					selectedList,
					MultiSelect,
				}) => {
					console.log({
						classNames: classNames,
						unselectedSearchInput: unselectedSearchInput,
						unselectedList: unselectedList,
						arrows: arrows,
						selectedSearchInput: selectedSearchInput,
						selectedList: selectedList,
						MultiSelect: MultiSelect,
					});
					return (
						<div className={classNames['wrapper']}>
							<div>
								{unselectedSearchInput}
								{unselectedList}
							</div>
							{arrows}
							<div>
								{selectedSearchInput}
								{selectedList}
							</div>
						</div>
					);
				}}
				renderOption={({ option, className, key, extra, MultiSelect }) => {
					console.log({
						option: option,
						className: className,
						key: key,
						extra: extra,
						MultiSelect: MultiSelect,
					});
					return (
						<li key={key} className={className} {...extra}>
							{option.label}
						</li>
					);
				}}
				renderSearchInput={({ type, classNames, onChange, MultiSelect }) => {
					console.log({
						type: type,
						classNames: classNames,
						onChange: onChange,
						MultiSelect: MultiSelect,
					});
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
				}}
				renderArrows={({ selectAll, unselectAll, classNames, MultiSelect }) => {
					console.log({
						selectAll: selectAll,
						unselectAll: unselectAll,
						classNames: classNames,
						MultiSelect: MultiSelect,
					});
					return (
						<div className={classNames['icon_wrapper']}>
							<Icon
								onClick={selectAll}
								className={classNames['arrow_left']}
								provider="icomoon"
								name="arrow-small-right"
							/>
							<Icon
								onClick={unselectAll}
								className={classNames['arrow_right']}
								provider="icomoon"
								name="arrow-small-left"
							/>
						</div>
					);
				}}
				renderList={({
					type,
					classNames,
					ref,
					onKeyDown,
					options,
					MultiSelect,
				}) => {
					console.log({
						type: type,
						classNames: classNames,
						ref: ref,
						onKeyDown: onKeyDown,
						options: options,
						MultiSelect: MultiSelect,
					});

					return (
						<ul
							ref={ref}
							tabIndex={0}
							onKeyDown={onKeyDown}
							className={classNames['unselected_wrapper']}>
							{options}
						</ul>
					);
				}}
				value="option_4,option_3"
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
						value: 'option_22',
						label: 'Option 22',
					},
					{
						value: 'option_3',
						label: 'Option 3',
					},
					{
						value: 'option_4',
						label: 'Option 4',
					},
					{
						value: 'option_5',
						label: 'Option 5',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
