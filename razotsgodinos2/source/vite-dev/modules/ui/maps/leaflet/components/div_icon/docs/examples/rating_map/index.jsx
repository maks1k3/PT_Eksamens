import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer, DivIcon } from 'ui/maps/leaflet';
import Item from './components/item';

const title = 'Leaflet DivIcon: rating map';

const data = [
	{
		id: 1,
		position: [56.5047, 21.0108],
		username: 'Name Surname',
		points: '32.1K',
		city: 'Liepāja',
		avatar: '/img/placeholder/no_avatar_thumbnail.jpg',
	},
	{
		id: 2,
		position: [56.9496, 24.1052],
		username: 'Name Surname',
		points: '12K',
		city: 'Rīga',
		avatar: '/img/placeholder/no_avatar_thumbnail.jpg',
	},
	{
		id: 3,
		position: [56.9471, 23.6168],
		username: 'Name Surname',
		points: '11K',
		city: 'Jūrmala',
		avatar: '/img/placeholder/no_avatar_thumbnail.jpg',
	},
];

const users = data.map(({ id, position, ...props }) => (
	<DivIcon
		key={id}
		position={position}
		iconSize={[100, 160]}
		iconAnchor={[50, 160]}>
		<Item id={id} {...props} />
	</DivIcon>
));

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { Map, TileLayer, DivIcon } from 'ui/maps/leaflet';
import Image from 'ui/media/image';

const data = [
	{
		id: 1,
		position: [56.5047, 21.0108],
		username: 'Name Surname',
		points: '32.1K',
		city: 'Liepāja',
		avatar: '/img/placeholder/no_avatar_thumbnail.jpg',
	},
	{
		id: 2,
		position: [56.9496, 24.1052],
		username: 'Name Surname',
		points: '12K',
		city: 'Rīga',
		avatar: '/img/placeholder/no_avatar_thumbnail.jpg',
	},
	{
		id: 3,
		position: [56.9471, 23.6168],
		username: 'Name Surname',
		points: '11K',
		city: 'Jūrmala',
		avatar: '/img/placeholder/no_avatar_thumbnail.jpg',
	},
];

const users = data.map(({ id, position, ...props }) => (
	<DivIcon
		key={id}
		position={position}
		iconSize={[100, 160]}
		iconAnchor={[50, 160]}>
		<Item id={id} {...props} />
	</DivIcon>
));

<Map
	style={{ height: '400px', width: '100%', position: 'relative' }}
	className="leaflet-map-grayscale"
	zoom={7}
	center={{
		lat: 56.5047,
		lng: 21.0108,
	}}
	worldCopyJump={false}
	maxBounds={[[-90, -180], [90, 180]]}
	minZoom={2}
	maxZoom={12}
	noWrap={true}
	onMoveend={e => {
		console.log({ onMoveend: { event: e } });
		const zoom = e.target._zoom;
		console.log(zoom);
	}}
	// dragging={!browser_window.isTouchDevice}
>
	<TileLayer
		attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
		url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	/>
	<div>{users}</div>
</Map>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Map
				style={{ height: '400px', width: '100%', position: 'relative' }}
				className="leaflet-map-grayscale"
				zoom={7}
				center={{
					lat: 56.5047,
					lng: 21.0108,
				}}
				worldCopyJump={false}
				maxBounds={[[-90, -180], [90, 180]]}
				minZoom={2}
				maxZoom={12}
				noWrap={true}
				onMoveend={e => {
					console.log({ onMoveend: { event: e } });
					const zoom = e.target._zoom;
					console.log(zoom);
				}}
				// dragging={!browser_window.isTouchDevice}
			>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<div>{users}</div>
			</Map>
		</ExampleHolder>
	);
};

export default Example;
