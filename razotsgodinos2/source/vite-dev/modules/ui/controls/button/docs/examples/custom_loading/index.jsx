import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';
import BeatLoader from 'ui/animation/horizontal_bars/beat_loader';

import loaderStyles from './loader.less';

const title = 'Button: renderLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Button from 'ui/controls/button';
import BeatLoader from 'ui/animation/horizontal_bars/beat_loader';

<Button
	title="Loading"
	loading={true}
	renderLoader={({ Button }) => {
		return <BeatLoader classNames={loaderStyles} pageCenter={true} />;
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
			<Button
				title="Loading"
				loading={true}
				renderLoader={({ Button }) => {
					return <BeatLoader classNames={loaderStyles} pageCenter={true} />;
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
