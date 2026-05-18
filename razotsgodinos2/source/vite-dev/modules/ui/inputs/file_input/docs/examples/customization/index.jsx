import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import FileInput from 'ui/inputs/file_input';
import Icon from 'ui/misc/icon';
import FileIcon from 'ui/misc/file_icon';

import styles from './styles.less';

const title = 'FileInput: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import FileInput from 'ui/inputs/file_input';
import Icon from 'ui/misc/icon';
import FileIcon from 'ui/misc/file_icon';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
	<Field
		label="File"
		name="some_file_name"
		component={FileInput}
		componentProps={{
			classNames: styles,
			title: 'Add images',
			theme: 'success',
			icon: {
				provider: 'icomoon',
				name: 'image5',
			},
			accept: 'image/*',
			multiple: true,
			ButtonProps: {
				style: {
					outline: '1px solid red',
				},
			},
			renderFiles: ({ files, classNames, FileInput }) => {
				const _files = _.map(files, FileInput.renderFile);

				return (
					<div className={classNames['files-list-wrapper']}>{_files}</div>
				);
			},
			renderFile: ({
				classNames,
				file,
				index,
				name,
				extension,
				size,
				FileInput,
			}) => {
				return (
					<div key={index} className={classNames['file']}>
						<Icon
							className={classNames['delete-icon']}
							provider="icomoon"
							name="trash"
							onClick={() => {
								FileInput.onDeleteFile(index);
							}}
						/>
						<FileIcon
							className={classNames['file-icon']}
							extension={extension}
						/>
						<span className={classNames['file-name']}>{name}</span>
						<span className={classNames['file-size']}>({size})</span>
					</div>
				);
			},
		}}
	/>
</Form>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Form
				action="actions/success"
				submit={{
					title: 'Save',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
				<Field
					label="File"
					name="some_file_name"
					component={FileInput}
					componentProps={{
						classNames: styles,
						title: 'Add images',
						theme: 'success',
						icon: {
							provider: 'icomoon',
							name: 'image5',
						},
						accept: 'image/*',
						multiple: true,
						ButtonProps: {
							style: {
								outline: '1px solid red',
							},
						},
						renderFiles: ({ files, classNames, FileInput }) => {
							const _files = _.map(files, FileInput.renderFile);

							return (
								<div className={classNames['files-list-wrapper']}>{_files}</div>
							);
						},
						renderFile: ({
							classNames,
							file,
							index,
							name,
							extension,
							size,
							FileInput,
						}) => {
							return (
								<div key={index} className={classNames['file']}>
									<Icon
										className={classNames['delete-icon']}
										provider="icomoon"
										name="trash"
										onClick={() => {
											FileInput.onDeleteFile(index);
										}}
									/>
									<FileIcon
										className={classNames['file-icon']}
										extension={extension}
									/>
									<span className={classNames['file-name']}>{name}</span>
									<span className={classNames['file-size']}>({size})</span>
								</div>
							);
						},
					}}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
