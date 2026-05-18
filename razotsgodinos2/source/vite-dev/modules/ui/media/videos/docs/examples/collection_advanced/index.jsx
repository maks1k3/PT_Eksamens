import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import { VideosCollection } from 'ui/media/videos';
import Thumbnail from 'ui/media/thumbnail';

const title = 'VideosCollection: advanced';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { VideosCollection } from 'ui/media/videos';
import Thumbnail from 'ui/media/thumbnail';

<VideosCollection
	classNames={styles}
	collectionName="example_videos_collection"
	collectionId={0}
	getGridProps={({
		containerWidth,
		browserWindowWidth,
		browserDevice,
	}) => {
		return {
			gutter: 20,
			minWidth: 250,
		};
	}}
	onItemClick={({ id, ids, index, Videos }) => {
		const _collectionItems = _.pick(uiStore.get('collectionItems'), ids);

		const collectionItems = [];

		_.forEach(ids, id => {
			const item = _.find(_collectionItems, i => i.id === id);
			collectionItems.push(item);
		});

		const videos = [];

		_.forEach(collectionItems, collectionItem => {
			const videoId = _.head(collectionItem.media.videos);
			const video = uiStore.get(\`videos.\${videoId}\`);
			videos.push({
				src: video.player,
				provider: video.provider,
			});
		});

		openPopup({
			name: 'video',
			data: {
				current: _.findIndex(ids, i => i === id),
				hideOnOverlayClick: true,
				autoPlay: true,
				onGalleryFinish: 'loop', //'loop','close' or function(gallery){ gallery.close()}
				items: videos,
			},
		});
	}}
	renderItem={({
		id,
		index,
		classNames,
		gridItemWidth,
		onItemClick,
		VideosCollection,
		videoData,
	}) => {
		const className = _g.classNames(
			classNames['item'],
			{ [classNames['item-full']]: gridItemWidth === '100%' },
			{ [classNames['item-grid']]: gridItemWidth !== '100%' },
		);

		const { thumbnail } = videoData;

		return (
			<Thumbnail
				className={className}
				src={thumbnail}
				width={gridItemWidth}
				height="200px"
				showPlayIcon={true}
				onClick={onItemClick}
			/>
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
			<VideosCollection
				classNames={styles}
				collectionName="example_videos_collection"
				collectionId={0}
				getGridProps={({
					containerWidth,
					browserWindowWidth,
					browserDevice,
				}) => {
					return {
						gutter: 20,
						minWidth: 250,
					};
				}}
				onItemClick={({ id, ids, index, Videos }) => {
					const _collectionItems = _.pick(uiStore.get('collectionItems'), ids);

					const collectionItems = [];

					_.forEach(ids, id => {
						const item = _.find(_collectionItems, i => i.id === id);
						collectionItems.push(item);
					});

					const videos = [];

					_.forEach(collectionItems, collectionItem => {
						const videoId = _.head(collectionItem.media.videos);
						const video = uiStore.get(`videos.${videoId}`);
						videos.push({
							src: video.player,
							provider: video.provider,
						});
					});

					openPopup({
						name: 'video',
						data: {
							current: _.findIndex(ids, i => i === id),
							hideOnOverlayClick: true,
							autoPlay: true,
							onGalleryFinish: 'loop', //'loop','close' or function(gallery){ gallery.close()}
							items: videos,
						},
					});
				}}
				renderItem={({
					id,
					index,
					classNames,
					gridItemWidth,
					onItemClick,
					VideosCollection,
					videoData,
				}) => {
					const className = _g.classNames(
						classNames['item'],
						{ [classNames['item-full']]: gridItemWidth === '100%' },
						{ [classNames['item-grid']]: gridItemWidth !== '100%' },
					);

					const { thumbnail } = videoData;

					return (
						<Thumbnail
							className={className}
							src={thumbnail}
							width={gridItemWidth}
							height="200px"
							showPlayIcon={true}
							onClick={onItemClick}
						/>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
