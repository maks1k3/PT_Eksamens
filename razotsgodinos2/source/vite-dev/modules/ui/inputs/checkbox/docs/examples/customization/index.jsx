import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Checkbox from 'ui/inputs/checkbox';
import Icon from 'ui/misc/icon';

import styles from './styles.less';

const title = 'Checkbox: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Checkbox from 'ui/inputs/checkbox';
import Icon from 'ui/misc/icon';

<Checkbox
	classNames={styles}
	theme="success"
	value="1"
	label="This is checkbox"
	renderTick={({ classNames, disabled, Checkbox }) => {
		const className = _g.classNames(classNames['tick'], {
			[classNames['tick_disabled']]: disabled,
		});

		return (
			<Icon className={className} provider="icomoon" name="checkmark4" />
		);
	}}
	renderLabel={({ classNames, label, disabled, onClick, Checkbox }) => {
		const className = _g.classNames(classNames['label'], {
			[classNames['label_disabled']]: disabled,
		});

		return (
			<div className={className} onClick={onClick}>
				{label}
			</div>
		);
	}}
	render={({ classNames, input, label, Checkbox }) => {
		return (
			<div className={classNames['outer']}>
				{input}
				{label}
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
			<Checkbox
				classNames={styles}
				theme="success"
				value="1"
				label="This is checkbox"
				renderTick={({ classNames, disabled, Checkbox }) => {
					const className = _g.classNames(classNames['tick'], {
						[classNames['tick_disabled']]: disabled,
					});

					return (
						<Icon className={className} provider="icomoon" name="checkmark4" />
					);
				}}
				renderLabel={({ classNames, label, disabled, onClick, Checkbox }) => {
					const className = _g.classNames(classNames['label'], {
						[classNames['label_disabled']]: disabled,
					});

					return (
						<div className={className} onClick={onClick}>
							{label}
						</div>
					);
				}}
				render={({ classNames, input, label, Checkbox }) => {
					return (
						<div className={classNames['outer']}>
							{input}
							{label}
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
