import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';
import Title from 'ui/common/title';

const title = 'RangeInput: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

<RangeInput
  theme="main"
  value="50"
  valueLabelDisplay="on"
/>
<RangeInput
  theme="primary"
  value="50"
  valueLabelDisplay="on"
/>
<RangeInput
  theme="success"
  value="50"
  valueLabelDisplay="on"
/>
<RangeInput
  theme="info"
  value="50"
  valueLabelDisplay="on"
/>
<RangeInput
  theme="warning"
  value="50"
  valueLabelDisplay="on"
/>
<RangeInput
  theme="danger"
  value="50"
  valueLabelDisplay="on"
/>
<RangeInput
  theme="custom"
  value="50"
  valueLabelDisplay="on"
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
			<div style={{ marginBottom: '30px' }}>
				<Title>main</Title>
				<RangeInput theme="main" value="50" valueLabelDisplay="on" />
			</div>
			<div style={{ marginBottom: '30px' }}>
				<Title>primary</Title>
				<RangeInput theme="primary" value="50" valueLabelDisplay="on" />
			</div>
			<div style={{ marginBottom: '30px' }}>
				<Title>success</Title>
				<RangeInput theme="success" value="50" valueLabelDisplay="on" />
			</div>
			<div style={{ marginBottom: '30px' }}>
				<Title>info</Title>
				<RangeInput theme="info" value="50" valueLabelDisplay="on" />
			</div>
			<div style={{ marginBottom: '30px' }}>
				<Title>warning</Title>
				<RangeInput theme="warning" value="50" valueLabelDisplay="on" />
			</div>
			<div style={{ marginBottom: '30px' }}>
				<Title>danger</Title>
				<RangeInput theme="danger" value="50" valueLabelDisplay="on" />
			</div>
			<div style={{ marginBottom: '30px' }}>
				<Title>custom</Title>
				<RangeInput theme="custom" value="50" valueLabelDisplay="on" />
			</div>
		</ExampleHolder>
	);
};

export default Example;
