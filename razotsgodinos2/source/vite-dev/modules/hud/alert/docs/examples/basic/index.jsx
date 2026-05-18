import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'Alert: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
showAlert({ content: 'Server error!' });		
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
				title="Basic"
				onClick={() => {
					showAlert({ content: 'Server error!' });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
