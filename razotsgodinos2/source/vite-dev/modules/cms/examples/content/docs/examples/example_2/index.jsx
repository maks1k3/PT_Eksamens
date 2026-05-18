import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import BackendCode from 'common/docs/ui/backend_code';
import Code from 'common/docs/ui/code';

import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import Image from 'ui/media/image';
import Video from 'ui/media/video';
import FileLink from 'ui/misc/file_link';
import Map from 'ui/maps/google/components/map';
import Marker from 'ui/maps/google/components/marker';

const title = 'CMS content example 2';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithUi from 'hoc/store/ui'

import Editable from 'cms/editable';
import Image from 'ui/media/image';
import Video from 'ui/media/video';
import FileLink from 'ui/misc/file_link';
import Map from 'ui/maps/google/components/map';
import Marker from 'ui/maps/google/components/marker';


const propTypes = {
	//from ui
	title: PropTypes.string,
	content: PropTypes.string,
	//location
	address: PropTypes.string,
	lat: PropTypes.number,
	lng: PropTypes.number,
	zoom: PropTypes.number,
	//image
	image: PropTypes.string,
	//video
	provider: PropTypes.string,
	player: PropTypes.string,
	//file
	downloadUrl: PropTypes.string,
	fileName: PropTypes.string,
	extension: PropTypes.string,
	size: PropTypes.string,
};

const uiProps = ownProps => {
	return {
		content: {
			content_example_2: {
				data: {
					address: 'address',
					lat: 'lat',
					lng: 'lng',
					zoom: 'zoom',
				},
				langData: {
					title: 'title',
					content: 'content',
				},
				media: {
					images: 'images',
					videos: 'videos',
					files: 'files',
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
		const {
			title,
			content,
			address,
			lat,
			lng,
			zoom,
			image,
			provider,
			player,
			downloadUrl,
			fileName,
			extension,
			size,
		} = this.props;
		return (
			<Editable
				edit={{
					name: 'content_example_2',
				}}>
				<div>
					<h3>{title}</h3>
					<div
						className="content margin-bottom"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
					<div className="margin-bottom">
						<Image src={image} responsive={true} />
					</div>
					<div className="margin-bottom">
						{!_g.isEmpty(player) && <Video provider={provider} src={player} />}
					</div>
					<div className="margin-bottom">
						<FileLink
							to={downloadUrl}
							title={\`\${fileName} (\${size})\`}
							extension={extension}
						/>
					</div>
					<div className="margin-bottom">
						<Map
							style={{ height: '400px', width: '100%', position: 'relative' }}
							zoom={zoom}
							center={{
								lat: lat,
								lng: lng,
							}}
							initialCenter={{
								lat: lat,
								lng: lng,
							}}>
							<Marker position={{ lat: lat, lng: lng }} label={address} />
						</Map>
					</div>
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
		videos: {
			[_.head(ownProps.videos)]: {
				provider: 'provider',
				player: 'player',
			},
		},
		files: {
			[_.head(ownProps.files)]: {
				download_url: 'downloadUrl',
				display_name: 'fileName',
				extension: 'extension',
				size: 'size',
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
	content: PropTypes.string,
	//location
	address: PropTypes.string,
	lat: PropTypes.number,
	lng: PropTypes.number,
	zoom: PropTypes.number,
	//image
	image: PropTypes.string,
	//video
	provider: PropTypes.string,
	player: PropTypes.string,
	//file
	downloadUrl: PropTypes.string,
	fileName: PropTypes.string,
	extension: PropTypes.string,
	size: PropTypes.string,
};

const uiProps = ownProps => {
	return {
		content: {
			content_example_2: {
				data: {
					address: 'address',
					lat: 'lat',
					lng: 'lng',
					zoom: 'zoom',
				},
				langData: {
					title: 'title',
					content: 'content',
				},
				media: {
					images: 'images',
					videos: 'videos',
					files: 'files',
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
		const {
			title,
			content,
			address,
			lat,
			lng,
			zoom,
			image,
			provider,
			player,
			downloadUrl,
			fileName,
			extension,
			size,
		} = this.props;
		return (
			<Editable
				edit={{
					name: 'content_example_2',
				}}>
				<div>
					<h3>{title}</h3>
					<div
						className="content margin-bottom"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
					<div className="margin-bottom">
						<Image src={image} responsive={true} />
					</div>
					<div className="margin-bottom">
						{!_g.isEmpty(player) && <Video provider={provider} src={player} />}
					</div>
					<div className="margin-bottom">
						<FileLink
							to={downloadUrl}
							title={`${fileName} (${size})`}
							extension={extension}
						/>
					</div>
					<div className="margin-bottom">
						<Map
							style={{ height: '400px', width: '100%', position: 'relative' }}
							zoom={zoom}
							center={{
								lat: lat,
								lng: lng,
							}}
							initialCenter={{
								lat: lat,
								lng: lng,
							}}>
							<Marker position={{ lat: lat, lng: lng }} label={address} />
						</Map>
					</div>
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
		videos: {
			[_.head(ownProps.videos)]: {
				provider: 'provider',
				player: 'player',
			},
		},
		files: {
			[_.head(ownProps.files)]: {
				download_url: 'downloadUrl',
				display_name: 'fileName',
				extension: 'extension',
				size: 'size',
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
|                             content_example_2
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="content_example_2">
$config['content_example_2'] = [
    'media' => [
        'images' => 1,
        'videos' => 1,
        'files' => 1,
    ],
    'langData' => function ($title, $content, $data) {
        return [
            'title' => $title,
            'content' => $content,
        ];
    },
    'data' => function ($data) {
        return [
            'address' => array_get($data, 'address', ''),
            'lat' => array_get($data, 'lat', 0),
            'lng' => array_get($data, 'lng', 0),
            'zoom' => array_get($data, 'zoom', 16),
        ];
    },
];
//</editor-fold>
`;
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="administrationCode">
const administrationCode = `
import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditContentForm from 'cms/content';
import ImageAdministration from 'ui/media/administration/image/cms';
import FileAdministration from 'ui/media/administration/file/cms';
import VideoAdministration from 'ui/media/administration/video/cms';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';
import CKEditor from 'ui/editors/ckeditor';
import EditLocation from 'ui/maps/google/components/edit_location';
import Tabs from 'ui/controls/tabs';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
	langData: PropTypes.object,
	langs: PropTypes.array,
	images: PropTypes.array,
	videos: PropTypes.array,
	files: PropTypes.array,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = ownProps => {
	return {
		CMSPopup: {
			loading: 'loading',
			langs: 'langs',
			content: {
				data: 'data',
				langData: 'langData',
				media: {
					images: 'images',
					videos: 'videos',
					files: 'files',
				},
			},
		},
	};
};

class ContentExample2 extends Component {
	constructor(props) {
		super(props);

		this.editLocation = React.createRef();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'Edit ContentExample2',
		});
		//</editor-fold>
	}

	onBeforeSubmit = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="onBeforeSubmit">
		const { address, lat, lng, zoom } = this.editLocation.current.getLocation();

		data.address = address;
		data.lat = lat;
		data.lng = lng;
		data.zoom = zoom;
		//</editor-fold>
	};

	renderMediaAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderMediaAdministration">
		const { loading } = this.props;

		if (loading) {
			return null;
		}

		const items = [];

		items.push({
			name: 'image',
			title: 'Image',
			icon: {
				provider: 'icomoon',
				name: 'image2',
			},
			content: this.renderImageAdministration(),
		});

		items.push({
			name: 'video',
			title: 'Video',
			icon: {
				provider: 'icomoon',
				name: 'play',
			},
			content: this.renderVideoAdministration(),
		});

		items.push({
			name: 'file',
			title: 'File',
			icon: {
				provider: 'icomoon',
				name: 'file-empty2',
			},
			content: this.renderFileAdministration(),
		});

		return <Tabs items={items} lazyLoad={true} />;
		//</editor-fold>
	};

	renderImageAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderImageAdministration">
		const { images } = this.props;

		return <ImageAdministration id={_.head(images)} />;
		//</editor-fold>
	};

	renderVideoAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderVideoAdministration">
		const { videos } = this.props;

		return <VideoAdministration id={_.head(videos)} />;
		//</editor-fold>
	};

	renderFileAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFileAdministration">
		const { files } = this.props;

		return <FileAdministration id={_.head(files)} />;
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { data, langs, loading } = this.props;
		const address = _.get(data, 'address');
		const zoom = _.get(data, 'zoom');
		const lat = _.get(data, 'lat');
		const lng = _.get(data, 'lng');

		if (loading) {
			return null;
		}

		return (
			<Fragment>
				<div className="margin-bottom">
					<EditLocation
						ref={this.editLocation}
						address={address}
						zoom={zoom}
						lat={lat}
						lng={lng}
					/>
				</div>
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = lang => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { langData } = this.props;
		const _langData = _.get(langData, lang, {});

		const title = _.get(_langData, 'title', '');
		const content = _.get(_langData, 'content', '');

		return (
			<Fragment>
				<Field
					label="Title"
					name={\`\${lang}_title\`}
					component={Input}
					value={title}
				/>
				<Field
					label="Content"
					name={\`\${lang}_content\`}
					component={CKEditor}
					value={content}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				{this.renderMediaAdministration()}
				<EditContentForm
					name="content_example_2"
					onBeforeSubmit={this.onBeforeSubmit}>
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

ContentExample2.propTypes = propTypes;

ContentExample2.defaultProps = defaultProps;

ContentExample2 = WithUi(uiProps)(ContentExample2);

export default ContentExample2;
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
