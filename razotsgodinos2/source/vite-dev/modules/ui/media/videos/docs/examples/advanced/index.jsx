import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Videos from 'ui/media/videos';
import Thumbnail from 'ui/media/thumbnail';

const title = 'Videos: advanced';

import styles from './styles.less';

import videos from '../videos';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Videos from 'ui/media/videos';

<Videos
	classNames={styles}
	items={videos}
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
	onItemClick={({ item, index, items, Videos }) => {
		const _items = _.map(items, item => {
			const { provider, player } = item;
			return {
				src: player,
				provider: provider,
			};
		});
		openPopup({
			name: 'video',
			data: {
				current: index,
				hideOnOverlayClick: true,
				autoPlay: true,
				onGalleryFinish: 'close', //'loop','close' or function(gallery){ gallery.close()}
				items: _items,
			},
		});
	}}
	renderItem={({
		classNames,
		item,
		index,
		gridItemWidth,
		onItemClick,
		Videos,
	}) => {
		const className = _g.classNames(
			classNames['item'],
			{ [classNames['item-full']]: gridItemWidth === '100%' },
			{ [classNames['item-grid']]: gridItemWidth !== '100%' },
		);

		const { thumbnail } = item;
		return (
			<Thumbnail
				key={index}
				className={className}
				src={thumbnail}
				width={gridItemWidth}
				height="250px"
				showPlayIcon={true}
				onClick={() => {
					onItemClick({ item, index });
				}}
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
			<Videos
				classNames={styles}
				items={videos}
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
				onItemClick={({ item, index, items, Videos }) => {
					const _items = _.map(items, item => {
						const { provider, player } = item;
						return {
							src: player,
							provider: provider,
						};
					});
					openPopup({
						name: 'video',
						data: {
							current: index,
							hideOnOverlayClick: true,
							autoPlay: true,
							onGalleryFinish: 'close', //'loop','close' or function(gallery){ gallery.close()}
							items: _items,
						},
					});
				}}
				renderItem={({
					classNames,
					item,
					index,
					gridItemWidth,
					onItemClick,
					Videos,
				}) => {
					const className = _g.classNames(
						classNames['item'],
						{ [classNames['item-full']]: gridItemWidth === '100%' },
						{ [classNames['item-grid']]: gridItemWidth !== '100%' },
					);

					const { thumbnail } = item;
					return (
						<Thumbnail
							key={index}
							className={className}
							src={thumbnail}
							width={gridItemWidth}
							height="250px"
							showPlayIcon={true}
							onClick={() => {
								onItemClick({ item, index });
							}}
						/>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
