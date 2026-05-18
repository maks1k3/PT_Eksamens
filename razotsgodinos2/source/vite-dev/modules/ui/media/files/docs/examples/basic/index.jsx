import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Files from 'ui/media/files';

const title = 'Files: basic';

import files from '../files';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Files from 'ui/media/files';

<Files
  items={
    {
      url: '/file/download/1',
      extension: 'pdf',
      name: 'Brochure',
      size: '4 MB',
    },
    {
      url: '/file/download/1',
      extension: 'doc',
      name: 'file1',
      size: '55.78 KB',
    },
    ...
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
			<Files items={files} />
		</ExampleHolder>
	);
};

export default Example;
