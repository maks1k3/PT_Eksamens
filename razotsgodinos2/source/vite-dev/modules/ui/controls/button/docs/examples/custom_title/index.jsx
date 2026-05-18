import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'Button: customTitle';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Button from 'ui/controls/button';

<Button
	customTitle={
		<span>
			CustomTitle title <b>can</b> <i>be</i> <u>anything</u>
		</span>
	}
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
			<Button
				customTitle={
					<span>
						CustomTitle title <b>can</b> <i>be</i> <u>anything</u>
					</span>
				}
			/>
		</ExampleHolder>
	);
};

export default Example;
