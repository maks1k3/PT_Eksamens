import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import WithVideo from 'hoc/media/with_video';
import InfoTable from 'ui/tables/info_table';

const title = 'WithVideo: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithVideo from 'hoc/media/with_video';
import InfoTable from 'ui/tables/info_table';

const propTypes = {
	videoId: PropTypes.number.isRequired,
	//from hoc
	videoData: PropTypes.object,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { videoData } = this.props;

		return <InfoTable rows={videoData} />;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithVideo(NewComponent);
  `,
};

const propTypes = {
	videoId: PropTypes.number.isRequired,
	//from hoc
	videoData: PropTypes.object,
};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { videoData } = this.props;

		return <InfoTable rows={videoData} />;
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

NewComponent = WithVideo(NewComponent);

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<NewComponent videoId={2} />
		</ExampleHolder>
	);
};

export default Example;
