import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Dropdown from 'ui/controls/dropdown';

const title = 'Dropdown: close';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Dropdown from 'ui/controls/dropdown';


//Do not close on outside click
<Dropdown
	trigger="click me"
	content={<p>This is content</p>}
	closeOnOutsideClick={false}
/>

//Do not close on content click
<Dropdown
	trigger="click me"
	content={<p>This is content</p>}
	closeOnContentClick={false}
/>

//Do not close on outside click and content click
<Dropdown
	trigger="click me"
	content={<p>This is content</p>}
	closeOnOutsideClick={false}
	closeOnContentClick={false}
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
			<h3>Do not close on outside click</h3>
			<Dropdown
				trigger="click me"
				content={<p>This is content</p>}
				closeOnOutsideClick={false}
			/>
			<h3>Do not close on content click</h3>
			<Dropdown
				trigger="click me"
				content={<p>This is content</p>}
				closeOnContentClick={false}
			/>
			<h3>Do not close on outside click and content click</h3>
			<Dropdown
				trigger="click me"
				content={<p>This is content</p>}
				closeOnOutsideClick={false}
				closeOnContentClick={false}
			/>
		</ExampleHolder>
	);
};

export default Example;
