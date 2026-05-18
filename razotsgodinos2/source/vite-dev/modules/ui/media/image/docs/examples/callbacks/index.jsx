import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Image from 'ui/media/image';

const title = 'Image: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Image from 'ui/media/image'

<Image
	getDimensions={({ width, height, Image }) => {
		console.log({
			width,
			height,
			Image,
		});
	}}
	src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
	noImagePlaceholder="http://codebase.a4.lv/img/placeholder/no_image.jpg"
	onClick={({ event, Image }) => {
		console.log({ onClick: { event, Image, target: event.target } });
	}}
	onLoad={({ event, Image }) => {
		console.log({ onLoad: { event, Image } });
	}}
	onError={({ event, Image }) => {
		console.log({ onError: { event, Image } });
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
			<Image
				getDimensions={({ width, height, Image }) => {
					console.log({
						width,
						height,
						Image,
					});
				}}
				src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
				noImagePlaceholder="http://codebase.a4.lv/img/placeholder/no_image.jpg"
				onClick={({ event, Image }) => {
					console.log({ onClick: { event, Image, target: event.target } });
				}}
				onLoad={({ event, Image }) => {
					console.log({ onLoad: { event, Image } });
				}}
				onError={({ event, Image }) => {
					console.log({ onError: { event, Image } });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
