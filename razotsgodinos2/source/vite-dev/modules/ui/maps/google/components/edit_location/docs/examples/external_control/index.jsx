import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import EditLocation from 'ui/maps/google/components/edit_location';
import Button from 'ui/controls/button';

const title = 'EditLocation: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import EditLocation from 'ui/maps/google/components/edit_location';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.editLocation = React.createRef();

		this.state = {
			lat: 56.95096612859509,
			lng: 24.136962890625,
			zoom: 10,
		};
	}

	render() {
		const { lat, lng, zoom } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<EditLocation
						ref={this.editLocation}
						lat={lat}
						lng={lng}
						zoom={zoom}
						onLocationChanged={({ lat, lng, EditLocation }) => {
							this.setState({ lat, lng });
						}}
						onZoomChanged={({ zoom, EditLocation }) => {
							this.setState({ zoom });
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Update location"
						onClick={() => {
							this.setState({
								lat: 56.95096612859509,
								lng: 23.136962890625,
								zoom: 14,
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getLocation"
						onClick={() => {
							console.log(
								'getLocation',
								this.editLocation.current.getLocation(),
							);
						}}
					/>
				</div>
			</div>
		);
	}
}

  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
		this.editLocation = React.createRef();

		this.state = {
			lat: 56.95096612859509,
			lng: 24.136962890625,
			zoom: 10,
		};
	}

	render() {
		const { lat, lng, zoom } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<EditLocation
						ref={this.editLocation}
						lat={lat}
						lng={lng}
						zoom={zoom}
						onLocationChanged={({ lat, lng, EditLocation }) => {
							this.setState({ lat, lng });
						}}
						onZoomChanged={({ zoom, EditLocation }) => {
							this.setState({ zoom });
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Update location"
						onClick={() => {
							this.setState({
								lat: 56.95096612859509,
								lng: 23.136962890625,
								zoom: 14,
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getLocation"
						onClick={() => {
							console.log(
								'getLocation',
								this.editLocation.current.getLocation(),
							);
						}}
					/>
				</div>
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
			<Test />
		</ExampleHolder>
	);
};

export default Example;
