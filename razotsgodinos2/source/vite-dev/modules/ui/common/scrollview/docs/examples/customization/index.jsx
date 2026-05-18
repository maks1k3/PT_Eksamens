import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ScrollView from 'ui/common/scrollview';

const title = 'ScrollView: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ScrollView from 'ui/common/scrollview';


<ScrollView
  height={300}
  width={300}
  renderThumbVertical={({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: '#fff',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }}
  renderThumbHorizontal={({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: '#fff',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }}>
  <div
    style={{ height: '1000px', width: '500px', background: '#54b048' }}>
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
				renderThumbVertical={({ style, ...props }) => {
					const thumbStyle = {
						backgroundColor: '#fff',
					};
					return <div style={{ ...style, ...thumbStyle }} {...props} />;
				}}
				renderThumbHorizontal={({ style, ...props }) => {
					const thumbStyle = {
						backgroundColor: '#fff',
					};
					return <div style={{ ...style, ...thumbStyle }} {...props} />;
				}}>
				<div
					style={{ height: '1000px', width: '500px', background: '#54b048' }}>
					This is long content
				</div>
			</ScrollView>
		</ExampleHolder>
	);
};

export default Example;
