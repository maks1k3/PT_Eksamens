import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Dropdown from 'ui/controls/dropdown';
import styles from './styles.less';

const title = 'Dropdown: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Dropdown from 'ui/controls/dropdown';


<Dropdown
	renderTrigger={({ classNames, onClick, Dropdown }) => {
		return (
			<div className={classNames['trigger']} onClick={onClick}>
				This is custom trigger
			</div>
		);
	}}
	content={<p>This is content</p>}
	classNames={styles}
	animate={true}
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
			<Dropdown
				renderTrigger={({ classNames, onClick, Dropdown }) => {
					return (
						<div className={classNames['trigger']} onClick={onClick}>
							This is custom trigger
						</div>
					);
				}}
				content={<p>This is content</p>}
				classNames={styles}
				animate={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
