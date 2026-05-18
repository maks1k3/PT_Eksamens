import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import WithStore from 'hoc/store';

const title = 'WithStore: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Can be used to sync ui with url.',
	code: `
import WithStore from 'hoc/store';

const propTypes = {
	//from store
	action: PropTypes.string,
	path: PropTypes.string,
};

const defaultProps = {};

const storeProps = ownProps => {
	return {
		navigation: {
			current: {
				action: 'action',
				path: 'path',
			},
		},
	};
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { action, path } = this.props;

		return (
			<div>
				<div>action:{action}</div>
				<div>path:{path}</div>
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithStore(storeProps)(NewComponent);
  `,
};

const propTypes = {
	//from store
	action: PropTypes.string,
	path: PropTypes.string,
};

const defaultProps = {};

const storeProps = ownProps => {
	return {
		navigation: {
			current: {
				action: 'action',
				path: 'path',
			},
		},
	};
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { action, path } = this.props;

		return (
			<div>
				<div>action:{action}</div>
				<div>path:{path}</div>
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithStore(storeProps)(NewComponent);

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
