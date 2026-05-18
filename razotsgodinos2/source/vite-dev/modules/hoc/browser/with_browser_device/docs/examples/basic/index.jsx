import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import WithBrowserDevice from 'hoc/browser/with_browser_device';

const title = 'WithBrowserDevice: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'desktop >= 1024px, tablet < 1024px and > 480px, mobile <= 480px',
	code: `
import WithBrowserDevice from 'hoc/browser/with_browser_device';

const propTypes = {
	//from hoc
	browserDevice: PropTypes.string,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { browserDevice } = this.props;

		return <div>browserDevice:{browserDevice}</div>;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithBrowserDevice(NewComponent);
  `,
};

const propTypes = {
	//from hoc
	browserDevice: PropTypes.string,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { browserDevice } = this.props;

		return <div>browserDevice:{browserDevice}</div>;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithBrowserDevice(NewComponent);

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
