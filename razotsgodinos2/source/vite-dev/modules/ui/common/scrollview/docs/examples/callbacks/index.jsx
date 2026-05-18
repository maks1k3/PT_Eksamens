import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ScrollView from 'ui/common/scrollview';

const title = 'ScrollView: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ScrollView from 'ui/common/scrollview';


<ScrollView
	height={300}
	width={300}
	onScroll={({ values, ScrollView }) => {
		console.log({ onScroll: { values, ScrollView } });
	}}
	onScrolledToBottom={({ values, ScrollView }) => {
		console.log({ onScrolledToBottom: { values, ScrollView } });
	}}
	onScrolledToTop={({ values, ScrollView }) => {
		console.log({ onScrolledToTop: { values, ScrollView } });
	}}>
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
			<ScrollView
				height={300}
				width={300}
				onScroll={({ values, ScrollView }) => {
					console.log({ onScroll: { values, ScrollView } });
				}}
				onScrolledToBottom={({ values, ScrollView }) => {
					console.log({ onScrolledToBottom: { values, ScrollView } });
				}}
				onScrolledToTop={({ values, ScrollView }) => {
					console.log({ onScrolledToTop: { values, ScrollView } });
				}}>
				<div
					style={{ height: '1000px', width: '300px', background: '#54b048' }}>
					This is long content
				</div>
			</ScrollView>
		</ExampleHolder>
	);
};

export default Example;
