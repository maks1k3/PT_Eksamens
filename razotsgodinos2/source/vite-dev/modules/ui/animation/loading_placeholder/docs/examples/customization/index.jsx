import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import LoadingPlaceholder from 'ui/animation/loading_placeholder';

const title = 'LoadingPlaceholder: customization';

import styles from './LoadingPlaceholder.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import LoadingPlaceholder from 'ui/animation/loading_placeholder';

<LoadingPlaceholder
	classNames={styles}
	renderCustomMaskers={({ classNames, LoadingPlaceholder }) => {
		return (
			<div>
				<div
					className={classNames['background-masker']}
					style={{ height: 10, top: 10, width: '100%' }}></div>
				<div
					className={classNames['background-masker']}
					style={{ height: 10, top: 30, width: '100%' }}></div>
				<div
					className={classNames['background-masker']}
					style={{ height: 10, top: 20, width: 25, right: 0 }}></div>
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
			<LoadingPlaceholder
				classNames={styles}
				renderCustomMaskers={({ classNames, LoadingPlaceholder }) => {
					return (
						<div>
							<div
								className={classNames['background-masker']}
								style={{ height: 10, top: 10, width: '100%' }}></div>
							<div
								className={classNames['background-masker']}
								style={{ height: 10, top: 30, width: '100%' }}></div>
							<div
								className={classNames['background-masker']}
								style={{ height: 10, top: 20, width: 25, right: 0 }}></div>
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
