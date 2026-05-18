import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Collapsible from 'ui/controls/collapsible';

const title = 'Collapsible: lazyLoad';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'Renders content only if opened first time. Adds display:none if opened before.',
	code: `
import Collapsible from 'ui/controls/collapsible';


<Collapsible title="Some lazyLoadeded content" lazyLoad={true}>
	<div style={{ background: '#1a5bc2', height: 300 }}>
		This is content
	</div>
</Collapsible>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Collapsible title="Some lazyLoadeded content" lazyLoad={true}>
				<div style={{ background: '#1a5bc2', height: 300 }}>
					This is content
				</div>
			</Collapsible>
		</ExampleHolder>
	);
};

export default Example;
