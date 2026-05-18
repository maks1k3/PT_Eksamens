import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer, DivIcon } from 'ui/maps/leaflet';
import Image from 'ui/media/image';

const title = 'Leaflet DivIcon: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { Map, TileLayer, DivIcon } from 'ui/maps/leaflet';
import Image from 'ui/media/image';

<Map
	className="leaflet-map-grayscale"
	center={[51.505, -0.09]}
	zoom={13}
	style={{ height: '400px', width: '100%', position: 'relative' }}>
	<TileLayer
		attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
		url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	/>

	<DivIcon position={[51.505, -0.09]}>
		<div
			style={{
				width: '150px',
				height: '150px',
				background: '#fff',
				border: '1px solid black',
			}}>
			<p>This is cat</p>
			<Image
				center={true}
				style={{ width: '100px', height: '100px' }}
				src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
			/>
		</div>
	</DivIcon>
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
				className="leaflet-map-grayscale"
				center={[51.505, -0.09]}
				zoom={13}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>

				<DivIcon position={[51.505, -0.09]}>
					<div
						style={{
							width: '150px',
							height: '150px',
							background: '#fff',
							border: '1px solid black',
						}}>
						<p>This is cat</p>
						<Image
							center={true}
							style={{ width: '100px', height: '100px' }}
							src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
						/>
					</div>
				</DivIcon>
			</Map>
		</ExampleHolder>
	);
};

export default Example;
