import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import BackendCode from 'common/docs/ui/backend_code';
import Code from 'common/docs/ui/code';

import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import Image from 'ui/media/image';

const title = 'CMS content example 1';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithUi from 'hoc/store/ui'

import Editable from 'cms/editable';
import Image from 'ui/media/image';

const propTypes = {
	//from ui
	title: PropTypes.string,
	image: PropTypes.string,
};

const uiProps = ownProps => {
	return {
		content: {
			content_example_1: {
				data: {
					title: 'title',
				},
				media: {
					images: 'images',
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
		const { title, image } = this.props;
		return (
			<Editable
				edit={{
					name: 'content_example_1',
				}}>
				<div>
					<h3>{title}</h3>
					<Image src={image} responsive={true} />
				</div>
			</Editable>
		);
	}
}
NewComponent = WithUi(ownProps => {
	return {
		images: {
			[_.head(ownProps.images)]: {
				image: 'image',
			},
		},
	};
})(NewComponent);
NewComponent = WithUi(uiProps)(NewComponent);

NewComponent.propTypes = propTypes;
  `,
};

const propTypes = {
	//from ui
	title: PropTypes.string,
	image: PropTypes.string,
};

const uiProps = ownProps => {
	return {
		content: {
			content_example_1: {
				data: {
					title: 'title',
				},
				media: {
					images: 'images',
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
		const { title, image } = this.props;
		return (
			<Editable
				edit={{
					name: 'content_example_1',
				}}>
				<div>
					<h3>{title}</h3>
					<Image src={image} responsive={true} />
				</div>
			</Editable>
		);
	}
}
NewComponent = WithUi(ownProps => {
	return {
		images: {
			[_.head(ownProps.images)]: {
				image: 'image',
			},
		},
	};
})(NewComponent);
NewComponent = WithUi(uiProps)(NewComponent);

NewComponent.propTypes = propTypes;

//<editor-fold defaultstate="collapsed" desc="backendCode">
const backendCode = `
/*
|--------------------------------------------------------------------------
|                             content_example_1
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="content_example_1">
$config['content_example_1'] = [
    'media' => [
        'images' => 1,
    ],
    'data' => function ($data) {
        return [
            'title' => array_get($data, 'title', ''),
        ];
    },
];
//</editor-fold>

$state = Data::get('en', [
  'content' => [
      'content_example_1',
  ],
]);
`;
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="administrationCode">
const administrationCode = `
import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditContentForm from 'cms/content';
import ImageAdministration from 'ui/media/administration/image/cms';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
	images: PropTypes.array,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = ownProps => {
	return {
		CMSPopup: {
			loading: 'loading',
			content: {
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

class ContentExample1 extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'Edit ContentExample1',
		});
		//</editor-fold>
	}

	renderImageAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderImageAdministration">
		const { loading, images } = this.props;

		if (loading) {
			return null;
		}

		return <ImageAdministration id={_.head(images)} />;
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { data } = this.props;
		const title = _.get(data, 'title', '');

		return (
			<Fragment>
				<Field label="Title" name="title" component={Input} value={title} />
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				{this.renderImageAdministration()}
				<EditContentForm name="content_example_1">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

ContentExample1.propTypes = propTypes;

ContentExample1.defaultProps = defaultProps;

ContentExample1 = WithUi(uiProps)(ContentExample1);

export default ContentExample1;
`;
//</editor-fold>

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div className="margin-bottom">
				<NewComponent />
			</div>
			<div className="margin-bottom">
				<BackendCode code={backendCode} />
			</div>
			<Code title="Administration" code={administrationCode} />
		</ExampleHolder>
	);
};

export default Example;
