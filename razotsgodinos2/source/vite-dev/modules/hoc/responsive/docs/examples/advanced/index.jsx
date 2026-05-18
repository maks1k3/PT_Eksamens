import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import Responsive from 'hoc/responsive';
import Button from 'ui/controls/button';

const title = 'Responsive: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Responsive from 'hoc/responsive';
import Button from 'ui/controls/button';

const propTypes = {
	//from hoc
	browserDevice: PropTypes.string,
	browserWindowWidth: PropTypes.number,
	containerWidth: PropTypes.number,
	updateDimensions: PropTypes.func,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			containerWidth,
			browserDevice,
			browserWindowWidth,
			updateDimensions,
		} = this.props;

		return (
			<div>
				<div>containerWidth: {containerWidth}</div>
				<div>browserWindowWidth: {browserWindowWidth}</div>
				<div>browserDevice: {browserDevice}</div>
				<Button
					title="updateDimensions"
					onClick={() => {
						console.log('updateDimensions');
						updateDimensions();
					}}
				/>
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = Responsive()(NewComponent);
  `,
};

const propTypes = {
	//from hoc
	browserDevice: PropTypes.string,
	browserWindowWidth: PropTypes.number,
	containerWidth: PropTypes.number,
	updateDimensions: PropTypes.func,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			containerWidth,
			browserDevice,
			browserWindowWidth,
			updateDimensions,
		} = this.props;

		return (
			<div>
				<div>containerWidth: {containerWidth}</div>
				<div>browserWindowWidth: {browserWindowWidth}</div>
				<div>browserDevice: {browserDevice}</div>
				<Button
					title="updateDimensions"
					onClick={() => {
						console.log('updateDimensions');
						updateDimensions();
					}}
				/>
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = Responsive()(NewComponent);

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<NewComponent />
		</ExampleHolder>
	);
};

export default Example;
