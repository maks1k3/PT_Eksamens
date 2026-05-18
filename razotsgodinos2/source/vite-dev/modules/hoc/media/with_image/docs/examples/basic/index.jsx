import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import WithImage from 'hoc/media/with_image';
import InfoTable from 'ui/tables/info_table';

const title = 'WithImage: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithImage from 'hoc/media/with_image';
import InfoTable from 'ui/tables/info_table';

const propTypes = {
	imageId: PropTypes.number.isRequired,
	//from hoc
	imageData: PropTypes.object,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { imageData } = this.props;

		return <InfoTable rows={imageData} />;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithImage(NewComponent);
  `,
};

const propTypes = {
	imageId: PropTypes.number.isRequired,
	//from hoc
	imageData: PropTypes.object,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { imageData } = this.props;

		return <InfoTable rows={imageData} />;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithImage(NewComponent);

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<NewComponent imageId={2} />
		</ExampleHolder>
	);
};

export default Example;
