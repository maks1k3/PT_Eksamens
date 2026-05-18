import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RadioGroup from 'ui/inputs/radio_group';

import styles from './styles.less';

const title = 'RadioGroup: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RadioGroup from 'ui/inputs/radio_group';

<RadioGroup
	classNames={styles}
	theme="success"
	valueKey="name"
	labelKey="title"
	options={[
		{
			name: 'id_asc',
			title: 'Id ascending',
		},
		{
			name: 'id_desc',
			title: 'Id descending',
		},
		{
			name: 'created_asc',
			title: 'Created ascending',
		},
		{
			name: 'created_desc',
			title: 'Created descending',
		},
	]}
	renderOption={({
		index,
		label,
		value,
		classNames,
		disabled,
		theme,
		active,
		RadioGroup,
	}) => {
		const className = _g.classNames(classNames['option-wrapper'], {
			[classNames['option-wrapper_disabled']]: disabled,
		});

		const optionClassName = _g.classNames(classNames['option'], {
			[classNames['option_disabled']]: disabled,
		});

		const circleClassName = _g.classNames(classNames['circle'], {
			[classNames[\`circle_\${theme}\`]]: active,
			[classNames['circle_disabled']]: disabled,
		});

		const labelClassName = _g.classNames(classNames['label'], {
			[classNames['label_disabled']]: disabled,
		});

		return (
			<div
				key={index}
				className={className}
				onClick={() => {
					RadioGroup.onChange(value);
				}}>
				<div className={optionClassName}>
					{active && <div className={circleClassName} />}
				</div>
				<div className={labelClassName}>{label}</div>
			</div>
		);
	}}
	renderOptions={({ classNames, options, RadioGroup }) => {
		return (
			<div className="clearfix" style={{ width: '400px' }}>
				<div style={{ width: '50%', float: 'left' }}>
					<div style={{ padding: '5px 0' }}>{options[0]}</div>
					<div style={{ padding: '5px 0' }}>{options[1]}</div>
				</div>
				<div style={{ width: '50%', float: 'left' }}>
					<div style={{ padding: '5px 0' }}>{options[2]}</div>
					<div style={{ padding: '5px 0' }}>{options[3]}</div>
				</div>
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
			<RadioGroup
				classNames={styles}
				theme="success"
				valueKey="name"
				labelKey="title"
				options={[
					{
						name: 'id_asc',
						title: 'Id ascending',
					},
					{
						name: 'id_desc',
						title: 'Id descending',
					},
					{
						name: 'created_asc',
						title: 'Created ascending',
					},
					{
						name: 'created_desc',
						title: 'Created descending',
					},
				]}
				renderOption={({
					index,
					label,
					value,
					classNames,
					disabled,
					theme,
					active,
					RadioGroup,
				}) => {
					const className = _g.classNames(classNames['option-wrapper'], {
						[classNames['option-wrapper_disabled']]: disabled,
					});

					const optionClassName = _g.classNames(classNames['option'], {
						[classNames['option_disabled']]: disabled,
					});

					const circleClassName = _g.classNames(classNames['circle'], {
						[classNames[`circle_${theme}`]]: active,
						[classNames['circle_disabled']]: disabled,
					});

					const labelClassName = _g.classNames(classNames['label'], {
						[classNames['label_disabled']]: disabled,
					});

					return (
						<div
							key={index}
							className={className}
							onClick={() => {
								RadioGroup.onChange(value);
							}}>
							<div className={optionClassName}>
								{active && <div className={circleClassName} />}
							</div>
							<div className={labelClassName}>{label}</div>
						</div>
					);
				}}
				renderOptions={({ classNames, options, RadioGroup }) => {
					return (
						<div className="clearfix" style={{ width: '400px' }}>
							<div style={{ width: '50%', float: 'left' }}>
								<div style={{ padding: '5px 0' }}>{options[0]}</div>
								<div style={{ padding: '5px 0' }}>{options[1]}</div>
							</div>
							<div style={{ width: '50%', float: 'left' }}>
								<div style={{ padding: '5px 0' }}>{options[2]}</div>
								<div style={{ padding: '5px 0' }}>{options[3]}</div>
							</div>
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
