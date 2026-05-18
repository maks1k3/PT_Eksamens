import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileAdministration from 'ui/media/administration/file/main';

const title = 'FileAdministration: main';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in administration panel.',
	code: `
import FileAdministration from 'ui/media/administration/file/main';

//basic
<FileAdministration
	id={1}
/>

//advanced
<FileAdministration
	id={1}
	showDelete={true}
	onUpdate={({ response, file, FileAdministration }) => {
		console.log('onUpdate:', { response, file, FileAdministration });
	}}
	onDelete={({ response, file, FileAdministration }) => {
		console.log('onDelete:', { response, file, FileAdministration });
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
			<FileAdministration
				id={1}
				showDelete={true}
				onUpdate={({ response, file, FileAdministration }) => {
					console.log('onUpdate:', { response, file, FileAdministration });
				}}
				onDelete={({ response, file, FileAdministration }) => {
					console.log('onDelete:', { response, file, FileAdministration });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
