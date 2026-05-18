import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Sticky from 'ui/layout/sticky';

const title = 'Sticky: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Sticky from 'ui/layout/sticky';

//basic
<Sticky>
	I am sticky
</Sticky>

//advanced
<Sticky
	className="some_class_name"
	style={{
		height: '400px',
		width: '200px',
		top: '50px',
		background: '#89ad69',
		padding: '20px',
	}}>
	I am sticky
</Sticky>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div style={{ height: '1000px' }}>
				<Sticky
					className="some_class_name"
					style={{
						height: '400px',
						width: '200px',
						top: '50px',
						background: '#89ad69',
						padding: '20px',
					}}>
					I am sticky
				</Sticky>
			</div>
		</ExampleHolder>
	);
};

export default Example;
