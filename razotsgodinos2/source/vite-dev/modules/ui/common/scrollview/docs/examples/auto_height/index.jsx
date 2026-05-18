import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ScrollView from 'ui/common/scrollview';

const title = 'ScrollView: autoHeight';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Take all available height.',
	code: `
import ScrollView from 'ui/common/scrollview';


<ScrollView width={300} autoHeight={true}>
	<div
		style={{ height: '1000px', width: '300px', background: '#54b048' }}>
		This is long content
	</div>
</ScrollView>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<ScrollView width={300} autoHeight={true}>
				<div
					style={{ height: '1000px', width: '300px', background: '#54b048' }}>
					This is long content
				</div>
			</ScrollView>
		</ExampleHolder>
	);
};

export default Example;
