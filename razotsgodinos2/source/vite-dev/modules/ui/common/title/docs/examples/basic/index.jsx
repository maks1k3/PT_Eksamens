import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Title from 'ui/common/title';

const title = 'Title: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Title from 'ui/common/title';

<Title>default h3</Title>
<Title level={1}>h1</Title>
<Title level={2}>h2</Title>
<Title level={3}>h3</Title>
<Title level={4}>h4</Title>
<Title level={5}>h5</Title>
<Title level={6}>h6</Title>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div>
				<Title>default h3</Title>
				<Title level={1}>h1</Title>
				<Title level={2}>h2</Title>
				<Title level={3}>h3</Title>
				<Title level={4}>h4</Title>
				<Title level={5}>h5</Title>
				<Title level={6}>h6</Title>
			</div>
		</ExampleHolder>
	);
};

export default Example;
