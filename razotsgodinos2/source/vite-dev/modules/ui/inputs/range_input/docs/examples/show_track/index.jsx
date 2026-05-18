import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';
import Title from 'ui/common/title';

const title = 'RangeInput: showTrack';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

<Title>With track</Title>
<RangeInput value="20,40" showTrack={true} />
<Title>Without track</Title>
<RangeInput value="20,40,60" showTrack={false} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Title>With track</Title>
			<RangeInput value="20,40" showTrack={true} />
			<Title>Without track</Title>
			<RangeInput value="20,40,60" showTrack={false} />
		</ExampleHolder>
	);
};

export default Example;
