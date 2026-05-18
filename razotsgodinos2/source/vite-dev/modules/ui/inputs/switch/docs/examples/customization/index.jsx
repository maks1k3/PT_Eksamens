import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Switch from 'ui/inputs/switch';

import styles from './styles.less';

const title = 'Switch: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Switch from 'ui/inputs/switch';

<Switch
	classNames={styles}
	theme="success"
	label={
		<div>
			Enable some <b>functionality</b>
		</div>
	}
	renderThumb={({ className }) => {
		console.log({ className: className });
		return <div className={className} />;
	}}
	renderControls={({
		onBlur,
		onFocus,
		onClick,
		thumb,
		className,
		value,
		Switch,
	}) => {
		console.log({
			onClick: onClick,
			thumb: thumb,
			className: className,
			value: value,
			Switch: Switch,
		});

		return (
			<div
				tabIndex={0}
				onFocus={onFocus}
				onBlur={onBlur}
				onClick={onClick}
				className={className}>
				{thumb}
			</div>
		);
	}}
	renderLabel={({ onClick, className, label, Switch }) => {
		console.log({
			onClick: onClick,
			className: className,
			label: label,
			Switch: Switch,
		});
		return (
			<div onClick={onClick} className={className}>
				{label}
			</div>
		);
	}}
	render={({ classNames, controls, label, disabled, Switch }) => {
		console.log({
			classNames: classNames,
			controls: controls,
			label: label,
			disabled: disabled,
			Switch: Switch,
		});
		const wrapper = _g.classNames(classNames['wrapper'], {
			[classNames['wrapper_disabled']]: disabled,
		});

		return (
			<div className={wrapper}>
				{controls} {label}
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
			<Switch
				classNames={styles}
				theme="success"
				label={
					<div>
						Enable some <b>functionality</b>
					</div>
				}
				renderThumb={({ className }) => {
					console.log({ className: className });
					return <div className={className} />;
				}}
				renderControls={({
					onBlur,
					onFocus,
					onClick,
					thumb,
					className,
					value,
					Switch,
				}) => {
					console.log({
						onClick: onClick,
						thumb: thumb,
						className: className,
						value: value,
						Switch: Switch,
					});

					return (
						<div
							tabIndex={0}
							onFocus={onFocus}
							onBlur={onBlur}
							onClick={onClick}
							className={className}>
							{thumb}
						</div>
					);
				}}
				renderLabel={({ onClick, className, label, Switch }) => {
					console.log({
						onClick: onClick,
						className: className,
						label: label,
						Switch: Switch,
					});
					return (
						<div onClick={onClick} className={className}>
							{label}
						</div>
					);
				}}
				render={({ classNames, controls, label, disabled, Switch }) => {
					console.log({
						classNames: classNames,
						controls: controls,
						label: label,
						disabled: disabled,
						Switch: Switch,
					});
					const wrapper = _g.classNames(classNames['wrapper'], {
						[classNames['wrapper_disabled']]: disabled,
					});

					return (
						<div className={wrapper}>
							{controls} {label}
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
