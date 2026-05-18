import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';
import Title from 'ui/common/title';

const title = 'RangeInput: valueLabelDisplay';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

<Title>on</Title>
<RangeInput value="20" valueLabelDisplay="on" />
<Title>off</Title>
<RangeInput value="20" valueLabelDisplay="off" />
<Title>auto</Title>
<RangeInput value="20" valueLabelDisplay="auto" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Title>on</Title>
			<RangeInput value="20" valueLabelDisplay="on" />
			<Title>off</Title>
			<RangeInput value="20" valueLabelDisplay="off" />
			<Title>auto</Title>
			<RangeInput value="20" valueLabelDisplay="auto" />
		</ExampleHolder>
	);
};

export default Example;
