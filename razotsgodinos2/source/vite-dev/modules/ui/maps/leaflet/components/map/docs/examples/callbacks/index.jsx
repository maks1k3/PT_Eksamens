import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer } from 'ui/maps/leaflet';

const title = 'Leaflet Map: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { Map, TileLayer } from 'ui/maps/leaflet';

<Map
	style={{ height: '400px', width: '100%', position: 'relative' }}
	center={{
		lat: 51.505,
		lng: -0.09,
	}}
	length={4}
	onClick={e => {
		console.log({ onClick: { e } });
	}}	
	onResize={e => {
		console.log({ onResize: { e } });
	}}
	onUnload={e => {
		console.log({ onUnload: { e } });
	}}
	onViewreset={e => {
		console.log({ onViewreset: { e } });
	}}
	onLoad={e => {
		console.log({ onLoad: { e } });
	}}
	onMovestart={e => {
		console.log({ onMovestart: { e } });
	}}
	onZoom={e => {
		console.log({ onZoom: { e } });
	}}
	onMove={e => {
		console.log({ onMove: { e } });
	}}
	onZoomend={e => {
		console.log({ onZoomend: { e } });
	}}
	onMoveend={e => {
		console.log({ onMoveend: { event: e } });
		const zoom = e.target._zoom;
		console.log(zoom);
	}}
	zoom={13}>
	<TileLayer
		attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
		url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	/>
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
				center={{
					lat: 51.505,
					lng: -0.09,
				}}
				length={4}
				onClick={e => {
					console.log({ onClick: { e } });
				}}
				onResize={e => {
					console.log({ onResize: { e } });
				}}
				onUnload={e => {
					console.log({ onUnload: { e } });
				}}
				onViewreset={e => {
					console.log({ onViewreset: { e } });
				}}
				onLoad={e => {
					console.log({ onLoad: { e } });
				}}
				onMovestart={e => {
					console.log({ onMovestart: { e } });
				}}
				onZoom={e => {
					console.log({ onZoom: { e } });
				}}
				onMove={e => {
					console.log({ onMove: { e } });
				}}
				onZoomend={e => {
					console.log({ onZoomend: { e } });
				}}
				onMoveend={e => {
					console.log({ onMoveend: { event: e } });
					const zoom = e.target._zoom;
					console.log(zoom);
				}}
				zoom={13}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
			</Map>
		</ExampleHolder>
	);
};

export default Example;
