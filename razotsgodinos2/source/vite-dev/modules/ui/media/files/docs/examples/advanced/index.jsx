import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Files from 'ui/media/files';
import FileLink from 'ui/misc/file_link';

const title = 'Files: advanced';

import styles from './styles.less';

import files from '../files';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Files from 'ui/media/files';
import FileLink from 'ui/misc/file_link';

<Files
	classNames={styles}
	items={files}
	renderItem={({ classNames, item, index, Files }) => {
		const { url, name, extension, size } = item;
		return (
			<div key={index} className={classNames['item']}>
				<FileLink
					to={url}
					title={\`\${name}.\${extension} \${
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
			<Files
				classNames={styles}
				items={files}
				renderItem={({ classNames, item, index, Files }) => {
					const { url, name, extension, size } = item;
					return (
						<div key={index} className={classNames['item']}>
							<FileLink
								to={url}
								title={`${name}.${extension} ${
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
