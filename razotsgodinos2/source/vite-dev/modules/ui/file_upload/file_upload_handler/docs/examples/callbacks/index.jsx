import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileUploadHandler from 'ui/file_upload/file_upload_handler';

const title = 'FileUploadHandler: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileUploadHandler from 'ui/file_upload/file_upload_handler';

<FileUploadHandler
	action="example_api/file_upload"
	extraData={{ action: 'upload', id: 1 }}
	onUploadStarted={({ FileUploadHandler }) => {
		console.log('onUploadStarted:', { FileUploadHandler });
	}}
	onUploadFinished={({ FileUploadHandler }) => {
		console.log('onUploadFinished:', { FileUploadHandler });
	}}
	onUploadProgress={({ percentCompleted, FileUploadHandler }) => {
		console.log('onUploadProgress:', {
			percentCompleted,
			FileUploadHandler,
		});
	}}
	onSuccess={({ response, FileUploadHandler }) => {
		console.log('onSuccess:', {
			response,
			FileUploadHandler,
		});
	}}
	onError={({ response, FileUploadHandler }) => {
		console.log('onError:', {
			response,
			FileUploadHandler,
		});
	}}
	onFail={({ response, FileUploadHandler }) => {
		console.log('onError:', {
			response,
			FileUploadHandler,
		});
	}}>
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
				extraData={{ action: 'upload', id: 1 }}
				onUploadStarted={({ FileUploadHandler }) => {
					console.log('onUploadStarted:', { FileUploadHandler });
				}}
				onUploadFinished={({ FileUploadHandler }) => {
					console.log('onUploadFinished:', { FileUploadHandler });
				}}
				onUploadProgress={({ percentCompleted, FileUploadHandler }) => {
					console.log('onUploadProgress:', {
						percentCompleted,
						FileUploadHandler,
					});
				}}
				onSuccess={({ response, FileUploadHandler }) => {
					console.log('onSuccess:', {
						response,
						FileUploadHandler,
					});
				}}
				onError={({ response, FileUploadHandler }) => {
					console.log('onError:', {
						response,
						FileUploadHandler,
					});
				}}
				onFail={({ response, FileUploadHandler }) => {
					console.log('onError:', {
						response,
						FileUploadHandler,
					});
				}}>
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
