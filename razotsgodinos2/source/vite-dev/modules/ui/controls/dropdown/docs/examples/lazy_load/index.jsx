import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Dropdown from 'ui/controls/dropdown';
import Icon from 'ui/misc/icon';

const title = 'Dropdown: lazyLoad';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'Content of dropdown will not exist in DOM until dropdown is opened.',
	code: `
import Dropdown from 'ui/controls/dropdown';
import Icon from 'ui/misc/icon';

<Dropdown
	trigger={<Icon provider="icomoon" name="plus3" />}
	content={<p>This is content</p>}
	lazyLoad={true}
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
			<Dropdown
				trigger={<Icon provider="icomoon" name="plus3" />}
				content={<p>This is content</p>}
				lazyLoad={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
