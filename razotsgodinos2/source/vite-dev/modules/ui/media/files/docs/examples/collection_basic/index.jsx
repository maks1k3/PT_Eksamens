import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import { FilesCollection } from 'ui/media/files';

const title = 'FilesCollection: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { FilesCollection } from 'ui/media/files';

<FilesCollection
	collectionName="example_files_collection"
	collectionId={0}
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
			<FilesCollection
				collectionName="example_files_collection"
				collectionId={0}
			/>
		</ExampleHolder>
	);
};

export default Example;
