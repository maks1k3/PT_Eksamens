import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileUploadButton from 'ui/file_upload/file_upload_button';
import Button from 'ui/controls/button';
import ProgressBar from 'ui/misc/progressbar';

const title = 'FileUploadButton: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileUploadButton from 'ui/file_upload/file_upload_button';
import Button from 'ui/controls/button'
import ProgressBar from 'ui/misc/progressbar';

<FileUploadButton
	action="example_api/file_upload"
	extraData={{ action: 'upload', id: 1 }}
	multiple={true}
	title="Upload images"
	icon={{
		provider: 'icomoon',
		name: 'image5',
	}}
	accept="image/*"
	ButtonProps={{
		theme: 'primary',
	}}
	ProgressBarProps={{
		theme: 'success',
	}}
	renderButton={({
		disabled,
		title,
		icon,
		ButtonProps,
		FileUploadButton,
	}) => {
		return (
			<Button
				{...ButtonProps}
				title={title}
				icon={icon}
				disabled={disabled}
			/>
		);
	}}
	renderUploadProgress={({
		percentCompleted,
		ProgressBarProps,
		FileUploadButton,
	}) => {
		return (
			<ProgressBar {...ProgressBarProps} percent={percentCompleted} />
		);
	}}
	customUpload={({
		name,
		files,
		action,
		extraData,
		multiple,
		onUploadStarted,
		FileUploadHandler,
	}) => {
		const data = new FormData();

		_.forEach(extraData, (item, name) => {
			data.append(name, _.toString(item));
		});

		if (!multiple) {
			data.append(name, _.head(files), _.head(files).name);
		} else {
			let index = 0;
			_.forEach(files, file => {
				data.append(\`\${name}[\${index}]\`, file, file.name);
				index++;
			});
		}

		if (_.isFunction(onUploadStarted)) {
			onUploadStarted({
				FileUploadHandler: FileUploadHandler,
			});
		}

		remoteRequest({
			url: action,
			data: data,
			onUploadProgress: FileUploadHandler.onUploadProgress,
			onSuccess: FileUploadHandler.onSuccess,
			onError: FileUploadHandler.onError,
			onFail: FileUploadHandler.onFail,
		});
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
			<FileUploadButton
				action="example_api/file_upload"
				extraData={{ action: 'upload', id: 1 }}
				multiple={true}
				title="Upload images"
				icon={{
					provider: 'icomoon',
					name: 'image5',
				}}
				accept="image/*"
				ButtonProps={{
					theme: 'primary',
				}}
				ProgressBarProps={{
					theme: 'success',
				}}
				renderButton={({
					disabled,
					title,
					icon,
					ButtonProps,
					FileUploadButton,
				}) => {
					return (
						<Button
							{...ButtonProps}
							title={title}
							icon={icon}
							disabled={disabled}
						/>
					);
				}}
				renderUploadProgress={({
					percentCompleted,
					ProgressBarProps,
					FileUploadButton,
				}) => {
					return (
						<ProgressBar {...ProgressBarProps} percent={percentCompleted} />
					);
				}}
				customUpload={({
					name,
					files,
					action,
					extraData,
					multiple,
					onUploadStarted,
					FileUploadHandler,
				}) => {
					const data = new FormData();

					_.forEach(extraData, (item, name) => {
						data.append(name, _.toString(item));
					});

					if (!multiple) {
						data.append(name, _.head(files), _.head(files).name);
					} else {
						let index = 0;
						_.forEach(files, file => {
							data.append(`${name}[${index}]`, file, file.name);
							index++;
						});
					}

					if (_.isFunction(onUploadStarted)) {
						onUploadStarted({
							FileUploadHandler: FileUploadHandler,
						});
					}

					remoteRequest({
						url: action,
						data: data,
						onUploadProgress: FileUploadHandler.onUploadProgress,
						onSuccess: FileUploadHandler.onSuccess,
						onError: FileUploadHandler.onError,
						onFail: FileUploadHandler.onFail,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
