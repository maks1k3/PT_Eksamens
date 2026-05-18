import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'LoadingPopup: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
	name: 'loading',
	data: {
		title: 'Loading...',
	},
});
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
				title="Show"
				onClick={() => {
					openPopup({
						name: 'loading',
						data: {
							title: 'Loading...',
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
