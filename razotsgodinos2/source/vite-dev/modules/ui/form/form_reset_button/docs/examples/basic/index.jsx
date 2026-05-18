import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FormResetButton from 'ui/form/form_reset_button';
import Button from 'ui/controls/button';

const title = 'FormResetButton: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FormResetButton from 'ui/form/form_reset_button';
import Button from 'ui/controls/button';

<FormResetButton
	ButtonProps={{ title: 'Reset', theme: 'primary' }}
	render={({ ButtonProps, locked, onClick, FormResetButton }) => {
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
