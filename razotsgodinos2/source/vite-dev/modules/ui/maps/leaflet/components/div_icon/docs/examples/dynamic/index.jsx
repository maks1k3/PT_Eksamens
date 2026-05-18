import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer, DivIcon } from 'ui/maps/leaflet';

const title = 'Leaflet DivIcon: counter';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'React components with state as Marker icons.',
	code: `
import { Map, TileLayer, DivIcon } from 'ui/maps/leaflet';

<Map
	doubleClickZoom={false}
	center={[51.505, -0.09]}
	zoom={13}
	style={{ height: '400px', width: '100%', position: 'relative' }}>
	<TileLayer
		attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
		url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	/>

	<DivIcon position={[51.5, -0.08]}>
		<Item />
	</DivIcon>
	<DivIcon position={[51.509, -0.09]}>
		<Item />
	</DivIcon>
</Map>
  `,
};

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 0,
		};
	}

	onClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		this.setState(prevState => {
			return {
				counter: prevState.counter + 1,
			};
		});
		//</editor-fold>
	};

	render() {
		return (
			<div
				onClick={this.onClick}
				style={{
					border: '1px solid #ccc',
					backgroundColor: '#fff',
					padding: '20px',
					cursor: 'pointer',
				}}>
				counter: {this.state.counter}
			</div>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Map
				doubleClickZoom={false}
				center={[51.505, -0.09]}
				zoom={13}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>

				<DivIcon position={[51.5, -0.08]}>
					<Item />
				</DivIcon>
				<DivIcon position={[51.509, -0.09]}>
					<Item />
				</DivIcon>
			</Map>
		</ExampleHolder>
	);
};

export default Example;
