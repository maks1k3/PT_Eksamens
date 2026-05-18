import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Map from 'ui/maps/google/components/map';

const title = 'Map: callbacks';

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
	onReady={({ Map, event }) => {
		console.log('onReady:', { Map, event });
	}}
	onClick={({ Map, event }) => {
		console.log('onClick:', { Map, event });
	}}
	onDragend={({ Map, event }) => {
		console.log('onDragend:', { Map, event });
	}}
	onRecenter={({ Map, event }) => {
		console.log('onRecenter:', { Map, event });
	}}
	onBoundsChanged={({ Map, event }) => {
		console.log('onBoundsChanged:', { Map, event });
	}}
	onCenterChanged={({ Map, event }) => {
		console.log('onCenterChanged:', { Map, event });
	}}
	onDblclick={({ Map, event }) => {
		console.log('onDblclick:', { Map, event });
	}}
	onDragstart={({ Map, event }) => {
		console.log('onDragstart:', { Map, event });
	}}
	onHeadingChange={({ Map, event }) => {
		console.log('onHeadingChange:', { Map, event });
	}}
	onIdle={({ Map, event }) => {
		console.log('onIdle:', { Map, event });
	}}
	onMaptypeidChanged={({ Map, event }) => {
		console.log('onMaptypeidChanged:', { Map, event });
	}}
	onMousemove={({ Map, event }) => {
		console.log('onMousemove:', { Map, event });
	}}
	onMouseout={({ Map, event }) => {
		console.log('onMouseout:', { Map, event });
	}}
	onMouseover={({ Map, event }) => {
		console.log('onMouseover:', { Map, event });
	}}
	onProjectionChanged={({ Map, event }) => {
		console.log('onProjectionChanged:', { Map, event });
	}}
	onResize={({ Map, event }) => {
		console.log('onResize:', { Map, event });
	}}
	onRightclick={({ Map, event }) => {
		console.log('onRightclick:', { Map, event });
	}}
	onTilesloaded={({ Map, event }) => {
		console.log('onTilesloaded:', { Map, event });
	}}
	onTiltChanged={({ Map, event }) => {
		console.log('onTiltChanged:', { Map, event });
	}}
	onZoomChanged={({ Map, event }) => {
		console.log('onZoomChanged:', { Map, event });
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
			<Map
				style={{ height: '400px', width: '100%', position: 'relative' }}
				zoom={14}
				initialCenter={{
					lat: 37.774929,
					lng: -122.419416,
				}}
				onReady={({ Map, event }) => {
					console.log('onReady:', { Map, event });
				}}
				onClick={({ Map, event }) => {
					console.log('onClick:', { Map, event });
				}}
				onDragend={({ Map, event }) => {
					console.log('onDragend:', { Map, event });
				}}
				onRecenter={({ Map, event }) => {
					console.log('onRecenter:', { Map, event });
				}}
				onBoundsChanged={({ Map, event }) => {
					console.log('onBoundsChanged:', { Map, event });
				}}
				onCenterChanged={({ Map, event }) => {
					console.log('onCenterChanged:', { Map, event });
				}}
				onDblclick={({ Map, event }) => {
					console.log('onDblclick:', { Map, event });
				}}
				onDragstart={({ Map, event }) => {
					console.log('onDragstart:', { Map, event });
				}}
				onHeadingChange={({ Map, event }) => {
					console.log('onHeadingChange:', { Map, event });
				}}
				onIdle={({ Map, event }) => {
					console.log('onIdle:', { Map, event });
				}}
				onMaptypeidChanged={({ Map, event }) => {
					console.log('onMaptypeidChanged:', { Map, event });
				}}
				onMousemove={({ Map, event }) => {
					console.log('onMousemove:', { Map, event });
				}}
				onMouseout={({ Map, event }) => {
					console.log('onMouseout:', { Map, event });
				}}
				onMouseover={({ Map, event }) => {
					console.log('onMouseover:', { Map, event });
				}}
				onProjectionChanged={({ Map, event }) => {
					console.log('onProjectionChanged:', { Map, event });
				}}
				onResize={({ Map, event }) => {
					console.log('onResize:', { Map, event });
				}}
				onRightclick={({ Map, event }) => {
					console.log('onRightclick:', { Map, event });
				}}
				onTilesloaded={({ Map, event }) => {
					console.log('onTilesloaded:', { Map, event });
				}}
				onTiltChanged={({ Map, event }) => {
					console.log('onTiltChanged:', { Map, event });
				}}
				onZoomChanged={({ Map, event }) => {
					console.log('onZoomChanged:', { Map, event });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
