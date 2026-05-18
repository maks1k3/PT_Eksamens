import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileUploadHandler from 'ui/file_upload/file_upload_handler';

import styles from './styles.less';

const title = 'FileUploadHandler: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileUploadHandler from 'ui/file_upload/file_upload_handler';

<FileUploadHandler
	classNames={styles}
	name="file"
	action="example_api/file_upload"
	extraData={{ action: 'upload', id: 1 }}
	multiple={true}
	autoUpload={true}
	accept="image/*"
	disabled={false}>
	<div
		style={{
			display: 'inline-block',
			width: 200,
			height: 100,
			backgroundColor: '#ccc',
		}}>
		Upload images
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
				classNames={styles}
				name="file"
				action="example_api/file_upload"
				extraData={{ action: 'upload', id: 1 }}
				multiple={true}
				autoUpload={true}
				accept="image/*"
				disabled={false}>
				<div
					style={{
						display: 'inline-block',
						width: 200,
						height: 100,
						backgroundColor: '#ccc',
					}}>
					Upload images
				</div>
			</FileUploadHandler>
		</ExampleHolder>
	);
};

export default Example;
