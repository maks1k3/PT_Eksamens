import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FormSubmitButton from 'ui/form/form_submit_button';
import Button from 'ui/controls/button';

const title = 'FormSubmitButton: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FormSubmitButton from 'ui/form/form_submit_button';
import Button from 'ui/controls/button';

<FormSubmitButton
	ButtonProps={{ title: 'Submit', theme: 'primary' }}
	render={({ ButtonProps, locked, onClick, FormSubmitButton }) => {
		return <Button {...ButtonProps} loading={locked} onClick={onClick} />;
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
