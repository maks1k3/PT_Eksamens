import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import Responsive from 'hoc/responsive';

const title = 'Responsive: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Responsive from 'hoc/responsive';

const propTypes = {
	//from hoc
	containerWidth: PropTypes.number,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { containerWidth } = this.props;

		return <div>containerWidth:{containerWidth}</div>;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = Responsive()(NewComponent);
  `,
};

const propTypes = {
	//from hoc
	containerWidth: PropTypes.number,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { containerWidth } = this.props;

		return <div>containerWidth:{containerWidth}</div>;
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
