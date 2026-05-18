import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'Popup Header: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Header from 'popups/components/ui/header';

<Header
	classNames={styles}
	theme="primary"
	title="Some title"
	showCloseControl={true}
	onClose={() => {
		closePopup({ name: 'some_popup_name', level: 2 });
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
