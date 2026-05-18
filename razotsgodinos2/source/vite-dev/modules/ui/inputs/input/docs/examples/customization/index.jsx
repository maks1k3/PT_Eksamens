import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';
import Icon from 'ui/misc/icon';

import styles from './styles.less';

const title = 'Input: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';
import Icon from 'ui/misc/icon';

<Input
	value="This is text"
	classNames={styles}
	icon={{
		provider: 'icomoon',
		name: 'atom',
	}}
	autoComplete="off"
	clearable={true}
	clearIcon={{ provider: 'fa', name: 'crosshairs' }}
	renderLeft={({ classNames, icon, Input }) => {
		if (_.isUndefined(icon)) {
			return null;
		}

		return (
			<div className={classNames['left']}>
				<Icon
					className={classNames['icon']}
					provider={icon.provider}
					name={icon.name}
				/>
			</div>
		);
	}}
	renderRight={({
		classNames,
		clearable,
		clearIcon,
		loading,
		value,
		Input,
	}) => {
		if (!clearable) {
			return null;
		}

		let content;

		if (!loading && clearable && value.length > 0) {
			content = (
				<Icon
					className={classNames['clear-icon']}
					provider={clearIcon.provider}
					name={clearIcon.name}
					onClick={Input.onClear}
				/>
			);
		}
		const extra = {};
	
		if (_g.isEmpty(content)) {
			extra.onClick = Input.focus;
		}

		return (
			<div className={classNames['right']} {...extra}>
				{content}
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
			<Input
				value="This is text"
				classNames={styles}
				icon={{
					provider: 'icomoon',
					name: 'atom',
				}}
				autoComplete="off"
				clearable={true}
				clearIcon={{ provider: 'fa', name: 'crosshairs' }}
				renderLeft={({ classNames, icon, Input }) => {
					if (_.isUndefined(icon)) {
						return null;
					}

					return (
						<div className={classNames['left']}>
							<Icon
								className={classNames['icon']}
								provider={icon.provider}
								name={icon.name}
							/>
						</div>
					);
				}}
				renderRight={({
					classNames,
					clearable,
					clearIcon,
					loading,
					value,
					Input,
				}) => {
					if (!clearable) {
						return null;
					}

					let content;

					if (!loading && clearable && value.length > 0) {
						content = (
							<Icon
								className={classNames['clear-icon']}
								provider={clearIcon.provider}
								name={clearIcon.name}
								onClick={Input.onClear}
							/>
						);
					}
					const extra = {};

					if (_g.isEmpty(content)) {
						extra.onClick = Input.focus;
					}

					return (
						<div className={classNames['right']} {...extra}>
							{content}
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
