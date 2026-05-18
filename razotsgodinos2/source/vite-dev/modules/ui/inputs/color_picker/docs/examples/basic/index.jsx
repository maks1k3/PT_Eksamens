import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ColorPicker from 'ui/inputs/color_picker';

const title = 'ColorPicker: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ColorPicker from 'ui/inputs/color_picker';

<ColorPicker />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<ColorPicker />
		</ExampleHolder>
	);
};

export default Example;
