import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileUploadButton from 'ui/file_upload/file_upload_button';

const title = 'FileUploadButton: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileUploadButton from 'ui/file_upload/file_upload_button';

<FileUploadButton
	action="example_api/file_upload"
	extraData={{ action: 'upload', id: 1 }}
	title="Upload a file"
	icon={{
		provider: 'icomoon',
		name: 'file-empty2',
	}}
	disabled={true}
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
			<FileUploadButton
				action="example_api/file_upload"
				extraData={{ action: 'upload', id: 1 }}
				title="Upload a file"
				icon={{
					provider: 'icomoon',
					name: 'file-empty2',
				}}
				disabled={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
