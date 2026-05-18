import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileUploadHandler from 'ui/file_upload/file_upload_handler';

const title = 'FileUploadHandler: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileUploadHandler from 'ui/file_upload/file_upload_handler';

<FileUploadHandler
	action="example_api/file_upload"
	extraData={{ action: 'upload', id: 1 }}>
	<div
		style={{
			display: 'inline-block',
			width: 200,
			height: 100,
			backgroundColor: '#ccc',
		}}>
		I am file upload!
	</div>
</FileUploadHandler>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<FileUploadHandler
				action="example_api/file_upload"
				extraData={{ action: 'upload', id: 1 }}>
				<div
					style={{
						display: 'inline-block',
						width: 200,
						height: 100,
						backgroundColor: '#ccc',
					}}>
					I am file upload!
				</div>
			</FileUploadHandler>
		</ExampleHolder>
	);
};

export default Example;
