import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FilesAdministration from 'ui/media/administration/files/cms';

const title = 'FilesAdministration: cms';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in cms administration.',
	code: `
import FilesAdministration from 'ui/media/administration/files/cms';

//basic
<FilesAdministration
	containerName="example_files_collection"
	containerId={0}
/>

//advanced
<FilesAdministration
	containerName="example_files_collection"
	containerId={0}
	addNewItemsTo="end" //end,start
	showEdit={true}
	showDelete={true}
	onChange={({ items, FilesAdministration }) => {
		console.log('onChange:', { items, FilesAdministration });
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
			code={info.code}>
			<FilesAdministration
				containerName="example_files_collection"
				containerId={0}
				addNewItemsTo="end" //end,start
				showEdit={true}
				showDelete={true}
				onChange={({ items, FilesAdministration }) => {
					console.log('onChange:', { items, FilesAdministration });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
