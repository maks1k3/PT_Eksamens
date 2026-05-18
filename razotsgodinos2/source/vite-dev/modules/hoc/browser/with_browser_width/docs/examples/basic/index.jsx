import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import WithBrowserWidth from 'hoc/browser/with_browser_width';

const title = 'WithBrowserWidth: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithBrowserWidth from 'hoc/browser/with_browser_width';

const propTypes = {
	//from hoc
	browserWidth: PropTypes.number,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { browserWidth } = this.props;

		return <div>browserWidth:{browserWidth}</div>;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithBrowserWidth(NewComponent);
  `,
};

const propTypes = {
	//from hoc
	browserWidth: PropTypes.number,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { browserWidth } = this.props;

		return <div>browserWidth:{browserWidth}</div>;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithBrowserWidth(NewComponent);

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
