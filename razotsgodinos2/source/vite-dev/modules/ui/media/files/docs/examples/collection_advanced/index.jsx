import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import { FilesCollection } from 'ui/media/files';
import FileLink from 'ui/misc/file_link';

const title = 'FilesCollection: advanced';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { FilesCollection } from 'ui/media/files';
import FileLink from 'ui/misc/file_link';

<FilesCollection
	classNames={styles}
	collectionName="example_files_collection"
	collectionId={0}
	renderItem={({
		id,
		index,
		classNames,
		FilesCollection,
		fileData,
		fileId,
	}) => {
		const { display_name, extension, size } = fileData;

		const url = \`/media/file/download/\${fileId}\`;
		return (
			<div className={classNames['item']}>
				<FileLink
					to={url}
					title={\`\${display_name}.\${extension} \${
						!_g.isEmpty(size) ? \`(\${size})\` : ''
					}\`}
					extension={extension}
				/>
			</div>
		);
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
			<FilesCollection
				classNames={styles}
				collectionName="example_files_collection"
				collectionId={0}
				renderItem={({
					id,
					index,
					classNames,
					FilesCollection,
					fileData,
					fileId,
				}) => {
					const { display_name, extension, size } = fileData;

					const url = `/media/file/download/${fileId}`;
					return (
						<div className={classNames['item']}>
							<FileLink
								to={url}
								title={`${display_name}.${extension} ${
									!_g.isEmpty(size) ? `(${size})` : ''
								}`}
								extension={extension}
							/>
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
