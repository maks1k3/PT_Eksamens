import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Image from 'ui/media/image';

const title = 'Image: lazyload customization';

import images from 'ui/media/images/docs/examples/images';
import imageStyles from './Image.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Image from 'ui/media/image';

//imageStyles.less
.wrapper_lazyload {
  transition-duration: 1s;
  transition-timing-function: ease;
  transition-property: opacity, transform;
  opacity: 0;
  transform: translate3d(0,100px,0);
}

.wrapper_lazyload_loaded {
  opacity: 1;
  transform: none;
}

class ExampleComponent extends Component {
	constructor(props) {
		super(props);

		this.scrollArea = React.createRef();
		this.state = {
			ready: false,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.setState({ ready: true });
		//</editor-fold>
	}

	renderImage = (image, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderImage">
		return (
			<Image
				key={index}
				classNames={imageStyles}
				src={image.src}
				containerWidth={400}
				originalWidth={image.width}
				originalHeight={image.height}
				lazyLoad={true}
				lazyLoadOptions={{
					root: this.scrollArea.current,
					rootMargin: '0px',
					threshold: 0.0, //from 0 to 1.0
				}}
			/>
		);
		//</editor-fold>
	};

	render() {
		const { ready } = this.state;
		return (
			<div
				ref={this.scrollArea}
				style={{
					width: 400,
					height: 600,
					overflowY: 'auto',
					overflowX: 'hidden',
				}}>
				{ready && _.map(images, this.renderImage)}
			</div>
		);
	}
}`,
};

class ExampleComponent extends Component {
	constructor(props) {
		super(props);

		this.scrollArea = React.createRef();
		this.state = {
			ready: false,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.setState({ ready: true });
		//</editor-fold>
	}

	renderImage = (image, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderImage">
		return (
			<Image
				key={index}
				classNames={imageStyles}
				src={image.src}
				containerWidth={400}
				originalWidth={image.width}
				originalHeight={image.height}
				lazyLoad={true}
				lazyLoadOptions={{
					root: this.scrollArea.current, //null for ViewPort
					rootMargin: '0px',
					threshold: 0.0, //from 0 to 1.0
				}}
			/>
		);
		//</editor-fold>
	};

	render() {
		const { ready } = this.state;
		return (
			<div
				ref={this.scrollArea}
				style={{
					width: 400,
					height: 600,
					overflowY: 'auto',
					overflowX: 'hidden',
				}}>
				{ready && _.map(images, this.renderImage)}
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
			<ExampleComponent />
		</ExampleHolder>
	);
};

export default Example;
