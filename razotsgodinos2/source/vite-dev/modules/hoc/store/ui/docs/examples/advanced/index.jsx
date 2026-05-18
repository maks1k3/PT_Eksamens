import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import WithUi from 'hoc/store/ui';
import Icon from 'ui/misc/icon';

const title = 'WithUi: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'ownProps usage example.',
	code: `
import WithUi from 'hoc/store/ui';

import Icon from 'ui/misc/icon';

const propTypes = {
	menuIndex: PropTypes.number.isRequired,
	//from ui
	provider: PropTypes.string,
	name: PropTypes.string,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		menu: {
			[ownProps.menuIndex]: {
				icon: {
					provider: 'provider',
					name: 'name',
				},
			},
		},
	};
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { provider, name } = this.props;

		return (
			<div>
				<div>provider:{provider}</div>
				<div>name:{name}</div>
				<Icon provider={provider} name={name} />
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithUi(uiProps)(NewComponent);
  `,
};

const propTypes = {
	menuIndex: PropTypes.number.isRequired,
	//from ui
	provider: PropTypes.string,
	name: PropTypes.string,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		menu: {
			[ownProps.menuIndex]: {
				icon: {
					provider: 'provider',
					name: 'name',
				},
			},
		},
	};
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { provider, name } = this.props;

		return (
			<div>
				<div>provider:{provider}</div>
				<div>name:{name}</div>
				<Icon provider={provider} name={name} />
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithUi(uiProps)(NewComponent);

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<NewComponent menuIndex={4} />
		</ExampleHolder>
	);
};

export default Example;
