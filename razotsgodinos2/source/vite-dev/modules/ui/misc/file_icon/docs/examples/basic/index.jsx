import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileIcon from 'ui/misc/file_icon';

const title = 'FileIcon: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileIcon from 'ui/misc/file_icon';

//File
<FileIcon extension="text" />

//Pdf
<FileIcon extension="pdf" />

//Document
<FileIcon extension="doc" />

//Excel
<FileIcon extension="xls" />

//Powerpoint
<FileIcon extension="ppt" />

//Image
<FileIcon extension="jpg" />

//Archive
<FileIcon extension="zip" />

//Audio
<FileIcon extension="mp3" />

//Video
<FileIcon extension="avi" />

//Code
<FileIcon extension="js" />

//Executable
<FileIcon extension="exe" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div>
				<h3>File</h3>
				<FileIcon extension="text" />
			</div>
			<div>
				<h3>Pdf</h3>
				<FileIcon extension="pdf" />
			</div>
			<div>
				<h3>Document</h3>
				<FileIcon extension="doc" />
			</div>
			<div>
				<h3>Excel</h3>
				<FileIcon extension="xls" />
			</div>
			<div>
				<h3>Powerpoint</h3>
				<FileIcon extension="ppt" />
			</div>
			<div>
				<h3>Image</h3>
				<FileIcon extension="jpg" />
			</div>
			<div>
				<h3>Archive</h3>
				<FileIcon extension="zip" />
			</div>
			<div>
				<h3>Audio</h3>
				<FileIcon extension="mp3" />
			</div>
			<div>
				<h3>Video</h3>
				<FileIcon extension="avi" />
			</div>
			<div>
				<h3>Code</h3>
				<FileIcon extension="js" />
			</div>
			<div>
				<h3>Executable</h3>
				<FileIcon extension="exe" />
			</div>
		</ExampleHolder>
	);
};

export default Example;
