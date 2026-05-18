import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileAdministration from 'ui/media/administration/file/cms';

const title = 'FileAdministration: cms';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in cms administration.',
	code: `
import FileAdministration from 'ui/media/administration/file/cms';

//basic
<FileAdministration
	id={2}
/>

//advanced
<FileAdministration
	id={2}
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
				id={2}
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
