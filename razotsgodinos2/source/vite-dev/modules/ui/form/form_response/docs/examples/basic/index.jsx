import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FormResponse from 'ui/form/form_response';
import AlertBox from 'ui/misc/alertbox';

const title = 'FormResponse: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FormResponse from 'ui/form/form_response';
import AlertBox from 'ui/misc/alertbox';

<FormResponse
	AlertBoxProps={{ showClose: true }}
	render={({ AlertBoxProps, type, content, onClose, FormResponse }) => {
		const theme = type === 'success' ? 'success' : 'danger';

		return (
			<AlertBox
				{...AlertBoxProps}
				content={content}
				theme={theme}
				onClose={onClose}
			/>
		);
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}
		/>
	);
};

export default Example;
