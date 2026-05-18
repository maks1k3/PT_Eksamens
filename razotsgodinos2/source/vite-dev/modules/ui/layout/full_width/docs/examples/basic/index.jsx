import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FullWidth from 'ui/layout/full_width';
import Container from 'ui/layout/container';

const title = 'FullWidth: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FullWidth from 'ui/layout/full_width';
import Container from 'ui/layout/container';

<FullWidth height="20px">
	<div style={{ backgroundColor: '#60dd77', height: '20px' }}>
		<Container>This is full page width content.</Container>
	</div>
</FullWidth>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<FullWidth height="20px">
				<div style={{ backgroundColor: '#60dd77', height: '20px' }}>
					<Container>This is full page width content.</Container>
				</div>
			</FullWidth>
		</ExampleHolder>
	);
};

export default Example;
