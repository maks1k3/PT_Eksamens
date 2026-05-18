import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileLink from 'ui/misc/file_link';

const title = 'FileLink: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileLink from 'ui/misc/file_link';

<FileLink to="some url" title="file.pdf" extension="pdf" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<FileLink to="some url" title="file.pdf" extension="pdf" />
		</ExampleHolder>
	);
};

export default Example;
