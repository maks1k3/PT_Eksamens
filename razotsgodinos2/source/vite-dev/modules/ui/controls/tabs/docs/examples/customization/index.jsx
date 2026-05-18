import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tabs from 'ui/controls/tabs';
import Icon from 'ui/misc/icon';
import Collapsible from 'ui/controls/collapsible';

import styles from './styles.less';

const title = 'Tabs: customization';

import items from '../items';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Tabs from 'ui/controls/tabs';
import Icon from 'ui/misc/icon';
import Collapsible from 'ui/controls/collapsible';


<Tabs
	items={items}
	classNames={styles}
	renderHorizontalTab={({ tab, current, classNames, onClick, Tabs }) => {
		const { name, title, icon, disabled } = tab;

		const className = _g.classNames(
			classNames['horizontal-link'],
			{ [classNames['horizontal-link_active']]: current === name },
			{ [classNames['horizontal-link_disabled']]: disabled },
		);

		const extra = {};

		if (!disabled) {
			extra.onClick = onClick;
		}

		return (
			<li key={name} className={classNames['horizontal-item']} {...extra}>
				<span className={className}>
					{icon && (
						<Icon
							provider={icon.provider}
							name={icon.name}
							className={classNames['horizontal-icon']}
						/>
					)}
					<span className={classNames['horizontal-title']}>{title}</span>
				</span>
			</li>
		);
	}}
	renderVerticalTab={({ tab, current, classNames, onClick, Tabs }) => {
		const { name, title, icon, disabled } = tab;

		const className = _g.classNames(
			classNames['vertical-link'],
			{ [classNames['vertical-link_active']]: current === name },
			{ [classNames['vertical-link_disabled']]: disabled },
		);

		const extra = {};

		if (!disabled) {
			extra.onClick = onClick;
		}

		return (
			<div key={name}>
				<div className={classNames['vertical-item']} {...extra}>
					<span className={className}>
						{icon && (
							<Icon
								provider={icon.provider}
								name={icon.name}
								className={classNames['vertical-icon']}
							/>
						)}
						<span className={classNames['vertical-title']}>{title}</span>
					</span>
				</div>
				<Collapsible opened={current === name}>
					{Tabs.renderItemContent(tab)}
				</Collapsible>
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
			<Tabs
				items={items}
				classNames={styles}
				renderHorizontalTab={({ tab, current, classNames, onClick, Tabs }) => {
					const { name, title, icon, disabled } = tab;

					const className = _g.classNames(
						classNames['horizontal-link'],
						{ [classNames['horizontal-link_active']]: current === name },
						{ [classNames['horizontal-link_disabled']]: disabled },
					);

					const extra = {};

					if (!disabled) {
						extra.onClick = onClick;
					}

					return (
						<li key={name} className={classNames['horizontal-item']} {...extra}>
							<span className={className}>
								{icon && (
									<Icon
										provider={icon.provider}
										name={icon.name}
										className={classNames['horizontal-icon']}
									/>
								)}
								<span className={classNames['horizontal-title']}>{title}</span>
							</span>
						</li>
					);
				}}
				renderVerticalTab={({ tab, current, classNames, onClick, Tabs }) => {
					const { name, title, icon, disabled } = tab;

					const className = _g.classNames(
						classNames['vertical-link'],
						{ [classNames['vertical-link_active']]: current === name },
						{ [classNames['vertical-link_disabled']]: disabled },
					);

					const extra = {};

					if (!disabled) {
						extra.onClick = onClick;
					}

					return (
						<div key={name}>
							<div className={classNames['vertical-item']} {...extra}>
								<span className={className}>
									{icon && (
										<Icon
											provider={icon.provider}
											name={icon.name}
											className={classNames['vertical-icon']}
										/>
									)}
									<span className={classNames['vertical-title']}>{title}</span>
								</span>
							</div>
							<Collapsible opened={current === name}>
								{Tabs.renderItemContent(tab)}
							</Collapsible>
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
