import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import { Map, TileLayer, Rectangle } from 'ui/maps/leaflet';

const title = 'Leaflet Map: bounds';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { Map, TileLayer, Rectangle } from 'ui/maps/leaflet';

const outer = [[50.505, -29.09], [52.505, 29.09]];
const inner = [[49.505, -2.09], [53.505, 2.09]];

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bounds: outer,
		};
	}

	onClickInner = () => {
		//<editor-fold defaultstate="collapsed" desc="onClickInner">
		this.setState({
			bounds: inner,
		});
		//</editor-fold>
	};

	onClickOuter = () => {
		//<editor-fold defaultstate="collapsed" desc="onClickOuter">
		this.setState({
			bounds: outer,
		});
		//</editor-fold>
	};

	render() {
		return (
			<Map
				bounds={this.state.bounds}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Rectangle
					bounds={outer}
					color={this.state.bounds === outer ? 'red' : 'white'}
					onClick={this.onClickOuter}
				/>
				<Rectangle
					bounds={inner}
					color={this.state.bounds === inner ? 'red' : 'white'}
					onClick={this.onClickInner}
				/>
			</Map>
		);
	}
}
  `,
};

const outer = [[50.505, -29.09], [52.505, 29.09]];
const inner = [[49.505, -2.09], [53.505, 2.09]];

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bounds: outer,
		};
	}

	onClickInner = () => {
		//<editor-fold defaultstate="collapsed" desc="onClickInner">
		this.setState({
			bounds: inner,
		});
		//</editor-fold>
	};

	onClickOuter = () => {
		//<editor-fold defaultstate="collapsed" desc="onClickOuter">
		this.setState({
			bounds: outer,
		});
		//</editor-fold>
	};

	render() {
		return (
			<Map
				bounds={this.state.bounds}
				style={{ height: '400px', width: '100%', position: 'relative' }}>
				<TileLayer
					attribution="&copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Rectangle
					bounds={outer}
					color={this.state.bounds === outer ? 'red' : 'white'}
					onClick={this.onClickOuter}
				/>
				<Rectangle
					bounds={inner}
					color={this.state.bounds === inner ? 'red' : 'white'}
					onClick={this.onClickInner}
				/>
			</Map>
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
			<Test />
		</ExampleHolder>
	);
};

export default Example;
