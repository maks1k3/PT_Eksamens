import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'VideoPopup: onGalleryFinish';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
	name: 'video',
	data:{
		current: 0,
		onGalleryFinish: 'loop',
		onGalleryFinish: 'close',
		onGalleryFinish: ({ VideoPopup }) => {
			console.log({ onGalleryFinish: { VideoPopup } });
			VideoPopup.close();
		},
		items:[
			{
				src:'https://www.youtube.com/embed/UprcpdwuwCg',
				provider: 'youtube',
			},
			{
				src:'https://www.youtube.com/embed/ifBM3SY3G-s',
				provider: 'youtube',
			},
			{
				src:'https://www.youtube.com/embed/1TB1x67Do5U',
				provider: 'youtube',
			},
		]
	}
});
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div style={{ marginTop: '5px' }}>
				<Button
					title="loop"
					onClick={() => {
						openPopup({
							name: 'video',
							data: {
								current: 0,
								onGalleryFinish: 'loop',
								items: [
									{
										src: 'https://www.youtube.com/embed/UprcpdwuwCg',
										provider: 'youtube',
									},
									{
										src: 'https://www.youtube.com/embed/ifBM3SY3G-s',
										provider: 'youtube',
									},
									{
										src: 'https://www.youtube.com/embed/1TB1x67Do5U',
										provider: 'youtube',
									},
								],
							},
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="close"
					onClick={() => {
						openPopup({
							name: 'video',
							data: {
								current: 0,
								onGalleryFinish: 'close',
								items: [
									{
										src: 'https://www.youtube.com/embed/UprcpdwuwCg',
										provider: 'youtube',
									},
									{
										src: 'https://www.youtube.com/embed/ifBM3SY3G-s',
										provider: 'youtube',
									},
									{
										src: 'https://www.youtube.com/embed/1TB1x67Do5U',
										provider: 'youtube',
									},
								],
							},
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="callback"
					onClick={() => {
						openPopup({
							name: 'video',
							data: {
								current: 0,
								onGalleryFinish: ({ VideoPopup }) => {
									console.log({ onGalleryFinish: { VideoPopup } });
									VideoPopup.close();
								},
								items: [
									{
										src: 'https://www.youtube.com/embed/UprcpdwuwCg',
										provider: 'youtube',
									},
									{
										src: 'https://www.youtube.com/embed/ifBM3SY3G-s',
										provider: 'youtube',
									},
									{
										src: 'https://www.youtube.com/embed/1TB1x67Do5U',
										provider: 'youtube',
									},
								],
							},
						});
					}}
				/>
			</div>
		</ExampleHolder>
	);
};

export default Example;
