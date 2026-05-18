import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Map from 'ui/maps/google/components/map';

const title = 'Map: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Map from 'ui/maps/google/components/map';

<Map
	style={{ height: '400px', width: '100%', position: 'relative' }}
	zoom={14}
	initialCenter={{
		lat: 37.774929,
		lng: -122.419416,
	}}
	mapType="terrain" //roadmap, satellite, hybrid, terrain
	maxZoom={14}
	minZoom={10}
	clickableIcons={true}
	disableDefaultUI={false}
	zoomControl={true}
	mapTypeControl={true}
	scaleControl={true}
	streetViewControl={true}
	panControl={true}
	rotateControl={true}
	scrollwheel={true}
	draggable={true}
	keyboardShortcuts={true}
	disableDoubleClickZoom={false}
	noClear={false}
	styles={styles}
	gestureHandling="greedy" //cooperative,greedy,none,auto(default)
/>
  `,
};

//<editor-fold defaultstate="collapsed" desc="styles">
const styles = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#212121',
			},
		],
	},
	{
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#212121',
			},
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#9e9e9e',
			},
		],
	},
	{
		featureType: 'administrative.land_parcel',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#bdbdbd',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#181818',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#616161',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#1b1b1b',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#2c2c2c',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#8a8a8a',
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: '#373737',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#3c3c3c',
			},
		],
	},
	{
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [
			{
				color: '#4e4e4e',
			},
		],
	},
	{
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#616161',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#000000',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#3d3d3d',
			},
		],
	},
];
//</editor-fold>

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Map
				style={{ height: '400px', width: '100%', position: 'relative' }}
				zoom={14}
				initialCenter={{
					lat: 37.774929,
					lng: -122.419416,
				}}
				mapType="terrain" //roadmap, satellite, hybrid, terrain
				maxZoom={14}
				minZoom={10}
				clickableIcons={true}
				disableDefaultUI={false}
				zoomControl={true}
				mapTypeControl={true}
				scaleControl={true}
				streetViewControl={true}
				panControl={true}
				rotateControl={true}
				scrollwheel={true}
				draggable={true}
				keyboardShortcuts={true}
				disableDoubleClickZoom={false}
				noClear={false}
				styles={styles}
				gestureHandling="greedy" //cooperative,greedy,none,auto(default)
			/>
		</ExampleHolder>
	);
};

export default Example;
