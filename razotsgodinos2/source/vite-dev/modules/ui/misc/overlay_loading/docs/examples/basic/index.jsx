import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import OverlayLoading from 'ui/misc/overlay_loading';

const title = 'OverlayLoading: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import OverlayLoading from 'ui/misc/overlay_loading';

<div style={{ position: 'relative' }}>
	<OverlayLoading />
	<div style={{ height: '400px' }}>This is some content</div>
</div>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div style={{ position: 'relative' }}>
				<OverlayLoading />
				<div style={{ height: '400px' }}>This is some content</div>
			</div>
		</ExampleHolder>
	);
};

export default Example;
