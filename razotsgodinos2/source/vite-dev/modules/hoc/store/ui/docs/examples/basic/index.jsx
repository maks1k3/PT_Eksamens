import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import WithUi from 'hoc/store/ui';

const title = 'WithUi: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithUi from 'hoc/store/ui';

const propTypes = {
	//from ui
	title: PropTypes.string,
	color: PropTypes.string,
	page: PropTypes.number,
};

const defaultProps = {
	//from ui
	page: 2,
};

const uiProps = ownProps => {
	return {
		docs: {
			title: 'title',
			color: 'color',
		},
		Page: {
			current: 'page',
		},
	};
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, color, page } = this.props;

		return (
			<div>
				<div>title:{title}</div>
				<div>color:{color}</div>
				<div>page:{page}</div>
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
	//from ui
	title: PropTypes.string,
	color: PropTypes.string,
	page: PropTypes.number,
};

const defaultProps = {
	//from ui
	page: 2,
};

const uiProps = ownProps => {
	return {
		docs: {
			title: 'title',
			color: 'color',
		},
		Page: {
			current: 'page',
		},
	};
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, color, page } = this.props;

		return (
			<div>
				<div>title:{title}</div>
				<div>color:{color}</div>
				<div>page:{page}</div>
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
			<NewComponent />
		</ExampleHolder>
	);
};

export default Example;
