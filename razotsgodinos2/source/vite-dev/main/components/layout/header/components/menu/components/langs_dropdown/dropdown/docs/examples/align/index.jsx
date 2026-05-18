import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Dropdown from 'ui/controls/dropdown';

const title = 'Dropdown: align';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Dropdown from 'ui/controls/dropdown';


//Bottom-right
<Dropdown
  opened={true}
  align="bottom-right"
  closeOnOutsideClick={false}
  trigger="click me"
  content={<p>This is content</p>}
/>

//Bottom-left
<Dropdown
  opened={true}
  align="bottom-left"
  closeOnOutsideClick={false}
  trigger="click me"
  content={<p>This is content</p>}
/>

//Top-right
<Dropdown
  opened={true}
  align="top-right"
  closeOnOutsideClick={false}
  trigger="click me"
  content={<p>This is content</p>}
/>

//Top-left
<Dropdown
  opened={true}
  align="top-left"
  closeOnOutsideClick={false}
  trigger="click me"
  content={<p>This is content</p>}
/>

//Auto
Switches between bottom-right and top-right relative to
$(window).scrollTop()
<Dropdown
  align="auto"
  trigger="click me"
  content={<p>This is content</p>}
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
			<h3>Bottom-right</h3>
			<div style={{ height: '80px' }}>
				<Dropdown
					opened={true}
					align="bottom-right"
					closeOnOutsideClick={false}
					trigger="click me"
					content={<p>This is content</p>}
				/>
			</div>
			<h3>Bottom-left</h3>
			<div style={{ height: '80px' }}>
				<Dropdown
					opened={true}
					align="bottom-left"
					closeOnOutsideClick={false}
					trigger="click me"
					content={<p>This is content</p>}
				/>
			</div>
			<h3>Top-right</h3>
			<div style={{ height: '60px' }} />
			<Dropdown
				opened={true}
				align="top-right"
				closeOnOutsideClick={false}
				trigger="click me"
				content={<p>This is content</p>}
			/>
			<h3>Top-left</h3>
			<div style={{ height: '60px' }} />
			<Dropdown
				opened={true}
				align="top-left"
				closeOnOutsideClick={false}
				trigger="click me"
				content={<p>This is content</p>}
			/>
			<h3>Auto</h3>
			<div>
				Switches between bottom-right and top-right relative to
				$(window).scrollTop()
			</div>
			<Dropdown
				align="auto"
				trigger="click me"
				content={<p>This is content</p>}
			/>
			<div style={{ height: '60px' }} />
		</ExampleHolder>
	);
};

export default Example;
