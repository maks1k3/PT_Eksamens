import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'PopupLoader: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import PopupLoader from 'popups/components/ui/popup_loader';

<PopupLoader classNames={styles} />
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
