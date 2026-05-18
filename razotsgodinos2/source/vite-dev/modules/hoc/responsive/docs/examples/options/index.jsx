import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import Responsive from 'hoc/responsive';

const title = 'Responsive: options';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'By default Responsive creates a wrapper div to measure containerWidth and do not render its content until containerWidth is measured. You can change this behaviour with options.',
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

		return <span>containerWidth:{containerWidth}</span>;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

const options = {
	wrapper: 'span', //null for no wrapper
	wrapperProps: { style: { display: 'inline-block' } },
	mountBeforeChildren: true,
};

NewComponent = Responsive(options)(NewComponent);
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

		return <span>containerWidth:{containerWidth}</span>;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

const options = {
	wrapper: 'span', //null for no wrapper
	wrapperProps: { style: { display: 'inline-block' } },
	mountBeforeChildren: false,
};

NewComponent = Responsive(options)(NewComponent);

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
