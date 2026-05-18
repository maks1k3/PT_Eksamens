import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ScrollView from 'ui/common/scrollview';

const title = 'ScrollView: autoHide';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Hide scrollbars when not scolling.',
	code: `
import ScrollView from 'ui/common/scrollview';


<ScrollView height={300} width={300} autoHide={true}>
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
			<ScrollView height={300} width={300} autoHide={true}>
				<div
					style={{ height: '1000px', width: '300px', background: '#54b048' }}>
					This is long content
				</div>
			</ScrollView>
		</ExampleHolder>
	);
};

export default Example;
