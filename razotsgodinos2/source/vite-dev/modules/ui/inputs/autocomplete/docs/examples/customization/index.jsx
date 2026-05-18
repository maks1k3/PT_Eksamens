import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/inputs/autocomplete';

const title = 'AutoComplete: customization';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/inputs/autocomplete';

<AutoComplete
	classNames={styles}
	renderOptions={({ classNames, options, AutoComplete }) => {
		const items = _.map(options, AutoComplete.renderOption);

		return <div className={classNames['options']}>{items}</div>;
	}}
	renderOption={({
		classNames,
		option,
		index,
		valueKey,
		labelKey,
		focusedIndex,
		onClick,
		AutoComplete,
	}) => {
		const { [valueKey]: value, [labelKey]: label } = option;

		const className = _g.classNames(classNames['option'], {
			[classNames['option_active']]: index === focusedIndex,
		});

		return (
			<div key={index} className={className} onClick={onClick}>
				{label}
			</div>
		);
	}}
	options={[
		{
			value: 'age_of_mythology',
			label: 'Age of Mythology',
		},
		{
			value: 'starcraft',
			label: 'StarCraft',
		},
		{
			value: 'counter_strike',
			label: 'Counter strike',
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
			<AutoComplete
				classNames={styles}
				renderOptions={({ classNames, options, AutoComplete }) => {
					const items = _.map(options, AutoComplete.renderOption);

					return <div className={classNames['options']}>{items}</div>;
				}}
				renderOption={({
					classNames,
					option,
					index,
					valueKey,
					labelKey,
					focusedIndex,
					onClick,
					AutoComplete,
				}) => {
					const { [valueKey]: value, [labelKey]: label } = option;

					const className = _g.classNames(classNames['option'], {
						[classNames['option_active']]: index === focusedIndex,
					});

					return (
						<div key={index} className={className} onClick={onClick}>
							{label}
						</div>
					);
				}}
				options={[
					{
						value: 'age_of_mythology',
						label: 'Age of Mythology',
					},
					{
						value: 'starcraft',
						label: 'StarCraft',
					},
					{
						value: 'counter_strike',
						label: 'Counter strike',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
