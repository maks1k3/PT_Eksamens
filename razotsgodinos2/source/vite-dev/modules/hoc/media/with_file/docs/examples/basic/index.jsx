import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import WithFile from 'hoc/media/with_file';
import InfoTable from 'ui/tables/info_table';

const title = 'WithFile: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithFile from 'hoc/media/with_file';
import InfoTable from 'ui/tables/info_table';

const propTypes = {
	fileId: PropTypes.number.isRequired,
	//from hoc
	fileData: PropTypes.object,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { fileData } = this.props;

		return <InfoTable rows={fileData} />;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithFile(NewComponent);
  `,
};

const propTypes = {
	fileId: PropTypes.number.isRequired,
	//from hoc
	fileData: PropTypes.object,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { fileData } = this.props;

		return <InfoTable rows={fileData} />;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithFile(NewComponent);

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<NewComponent fileId={2} />
		</ExampleHolder>
	);
};

export default Example;
