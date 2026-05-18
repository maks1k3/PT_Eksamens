import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import BackendCode from 'common/docs/ui/backend_code';
import Code from 'common/docs/ui/code';

import WithUi from 'hoc/store/ui';
import getCollectionName from 'helpers/collections/getCollectionName';

import Editable from 'cms/editable';
import Button from 'ui/controls/button';

const title = 'CMS collection example 2';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithUi from 'hoc/store/ui';
import getCollectionName from 'helpers/collections/getCollectionName';

import Editable from 'cms/editable';
import Button from 'ui/controls/button';

//Collection.js

const propTypes = {
	//from ui
	currentLang: PropTypes.string,
	ids: PropTypes.array,
	loadMore: PropTypes.bool,
};

const uiProps = ownProps => {
	return {
		currentLang: 'currentLang',
		collections: {
			collection_example_2: {
				ids: 'ids',
				loadMore: 'loadMore',
			},
		},
	};
};

class Collection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		};

		this.mounted = false;
		this.page = 1;
		this.loading = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		//</editor-fold>
	}

	loadMore = () => {
		//<editor-fold defaultstate="collapsed" desc="loadMore">
		if (this.loading) {
			return;
		}
		const { currentLang, loadMore } = this.props;

		if (!loadMore) {
			return;
		}

		this.loading = true;

		this.setState({
			loading: true,
		});

		const collectionName = 'collection_example_2';
		const collectionId = 0;

		remoteRequest({
			url: 'cms/collection',
			data: {
				action: 'get',
				lang: currentLang,
				name: collectionName,
				collection_id: collectionId,
				page: ++this.page,
				active: 1,
				results_per_page: 2,
				is_load_more: 1,
				order: {
					date: 'desc',
				},
			},
			onSuccess: response => {
				if (!this.mounted) {
					return;
				}

				this.setState({
					loading: false,
				});

				this.loading = false;

				const collection = _.get(
					response,
					\`collections.\${getCollectionName(collectionName, collectionId)}\`,
				);

				const collectionItems = _.get(response, 'collectionItems');
				const images = _.get(response, 'images');
				const videos = _.get(response, 'videos');
				const files = _.get(response, 'files');

				const update = [];

				if (!_g.isEmpty(images)) {
					update.push({
						path: 'images',
						value: images,
					});
				}

				if (!_g.isEmpty(videos)) {
					update.push({
						path: 'videos',
						value: videos,
					});
				}

				if (!_g.isEmpty(files)) {
					update.push({
						path: 'files',
						value: files,
					});
				}

				if (!_g.isEmpty(collectionItems)) {
					update.push({
						path: 'collectionItems',
						value: collectionItems,
					});
				}

				let ids = _g.cloneDeep(
					uiStore.get(
						\`collections.\${getCollectionName(
							collectionName,
							collectionId,
						)}.ids\`,
						[],
					),
				);
				ids = ids.concat(collection.ids);
				collection.ids = ids;

				update.push({
					path: \`collections.\${getCollectionName(
						collectionName,
						collectionId,
					)}\`,
					value: collection,
				});

				uiStore.multiUpdate(update);
			},
			onError: response => {
				showAlert({ content: response.msg });
			},
		});

		//</editor-fold>
	};

	renderLoadMore = () => {
		//<editor-fold defaultstate="collapsed" desc="renderLoadMore">
		const { loading } = this.state;
		const { loadMore } = this.props;

		if (!loadMore) {
			return null;
		}

		return (
			<div className="margin-bottom" style={{ textAlign: 'center' }}>
				<Button title="Load more" loading={loading} onClick={this.loadMore} />
			</div>
		);
		//</editor-fold>
	};

	render() {
		const { ids } = this.props;
		return (
			<Fragment>
				<Editable
					add={{
						name: 'collection_example_2',
						action: 'add',
					}}>
					<div className="margin-bottom">
						{_.map(ids, id => {
							return (
								<div key={id} className="margin-bottom">
									<Item id={id} />
								</div>
							);
						})}
					</div>
				</Editable>
				{this.renderLoadMore()}
			</Fragment>
		);
	}
}
Collection = WithUi(uiProps)(Collection);

Collection.propTypes = propTypes;

//Item.js

const propTypes = {
	id: PropTypes.number.isRequired,

	//from ui
	title: PropTypes.string,
	content: PropTypes.string,
	date: PropTypes.string,
	active: PropTypes.bool,
};

const uiProps = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
				date: 'date',
				active: 'active',
				langData: {
					title: 'title',
					content: 'content',
				},
			},
		},
	};
};

class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, content, active, date, id } = this.props;

		return (
			<Editable
				edit={{
					name: 'collection_example_2',
					action: 'edit',
					id: id,
				}}
				active={active}>
				<div>
					<h3>{title}</h3>
					<div>date: {date}</div>
					<div
						className="content margin-bottom"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
			</Editable>
		);
	}
}

Item.propTypes = propTypes;

Item = WithUi(uiProps)(Item);
  `,
};

const propTypes = {
	//from ui
	currentLang: PropTypes.string,
	ids: PropTypes.array,
	loadMore: PropTypes.bool,
};

const uiProps = ownProps => {
	return {
		currentLang: 'currentLang',
		collections: {
			collection_example_2: {
				ids: 'ids',
				loadMore: 'loadMore',
			},
		},
	};
};

class Collection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		};

		this.mounted = false;
		this.page = 1;
		this.loading = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		//</editor-fold>
	}

	loadMore = () => {
		//<editor-fold defaultstate="collapsed" desc="loadMore">
		if (this.loading) {
			return;
		}
		const { currentLang, loadMore } = this.props;

		if (!loadMore) {
			return;
		}

		this.loading = true;

		this.setState({
			loading: true,
		});

		const collectionName = 'collection_example_2';
		const collectionId = 0;

		remoteRequest({
			url: 'cms/collection',
			data: {
				action: 'get',
				lang: currentLang,
				name: collectionName,
				collection_id: collectionId,
				page: ++this.page,
				active: 1,
				results_per_page: 2,
				is_load_more: 1,
				order: {
					date: 'desc',
				},
			},
			onSuccess: response => {
				if (!this.mounted) {
					return;
				}

				this.setState({
					loading: false,
				});

				this.loading = false;

				const collection = _.get(
					response,
					`collections.${getCollectionName(collectionName, collectionId)}`,
				);

				const collectionItems = _.get(response, 'collectionItems');
				const images = _.get(response, 'images');
				const videos = _.get(response, 'videos');
				const files = _.get(response, 'files');

				const update = [];

				if (!_g.isEmpty(images)) {
					update.push({
						path: 'images',
						value: images,
					});
				}

				if (!_g.isEmpty(videos)) {
					update.push({
						path: 'videos',
						value: videos,
					});
				}

				if (!_g.isEmpty(files)) {
					update.push({
						path: 'files',
						value: files,
					});
				}

				if (!_g.isEmpty(collectionItems)) {
					update.push({
						path: 'collectionItems',
						value: collectionItems,
					});
				}

				let ids = _g.cloneDeep(
					uiStore.get(
						`collections.${getCollectionName(
							collectionName,
							collectionId,
						)}.ids`,
						[],
					),
				);
				ids = ids.concat(collection.ids);
				collection.ids = ids;

				update.push({
					path: `collections.${getCollectionName(
						collectionName,
						collectionId,
					)}`,
					value: collection,
				});

				uiStore.multiUpdate(update);
			},
			onError: response => {
				showAlert({ content: response.msg });
			},
		});

		//</editor-fold>
	};

	renderLoadMore = () => {
		//<editor-fold defaultstate="collapsed" desc="renderLoadMore">
		const { loading } = this.state;
		const { loadMore } = this.props;

		if (!loadMore) {
			return null;
		}

		return (
			<div className="margin-bottom" style={{ textAlign: 'center' }}>
				<Button title="Load more" loading={loading} onClick={this.loadMore} />
			</div>
		);
		//</editor-fold>
	};

	render() {
		const { ids } = this.props;
		return (
			<Fragment>
				<Editable
					add={{
						name: 'collection_example_2',
						action: 'add',
					}}>
					<div className="margin-bottom">
						{_.map(ids, id => {
							return (
								<div key={id} className="margin-bottom">
									<Item id={id} />
								</div>
							);
						})}
					</div>
				</Editable>
				{this.renderLoadMore()}
			</Fragment>
		);
	}
}
Collection = WithUi(uiProps)(Collection);

Collection.propTypes = propTypes;

const propTypes2 = {
	id: PropTypes.number.isRequired,

	//from ui
	title: PropTypes.string,
	content: PropTypes.string,
	date: PropTypes.string,
	active: PropTypes.bool,
};

const uiProps2 = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
				date: 'date',
				active: 'active',
				langData: {
					title: 'title',
					content: 'content',
				},
			},
		},
	};
};

class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, content, active, date, id } = this.props;

		return (
			<Editable
				edit={{
					name: 'collection_example_2',
					action: 'edit',
					id: id,
				}}
				active={active}>
				<div>
					<h3>{title}</h3>
					<div>date: {date}</div>
					<div
						className="content margin-bottom"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
			</Editable>
		);
	}
}

Item.propTypes = propTypes2;

Item = WithUi(uiProps2)(Item);

//<editor-fold defaultstate="collapsed" desc="backendCode">
const backendCode = `
/*
|--------------------------------------------------------------------------
|                             collection_example_2
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="collection_example_2">
$config['collection_example_2'] = [
		'langData' => function ($title, $content, $data) {
				return [
						'title' => $title,
						'content' => $content,
						'slug' => str_slug($title),
						'preview' => SearchHelper::getSearchIndex($content, false, 80),
				];
		},
];
//</editor-fold>

$state = Data::get('en', [
	'collection_example_2' => [
	    'results_per_page' => 2,
	    'active' => 1,
	    'order' => [
	        'date' => 'desc',
	    ]
	],
]);
`;
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="administrationCode">
const administrationCode = `
//index.js

import React from 'react';
import PropTypes from 'prop-types';
import CollectionAdministration from 'cms/collection_administration';
import Edit from './CollectionExample2';

const name = 'collection_example_2';

const getTitle = collectionItem => {
	//<editor-fold defaultstate="collapsed" desc="getTitle">

	const { title } = _.get(collectionItem, 'langData', {});

	return \`\${title}\`;
	//</editor-fold>
};

const Collection = ({ action, id, collectionId }) => {
	return (
		<CollectionAdministration
			action={action}
			id={id}
			name={name}
			collectionId={collectionId}
			getTitle={getTitle}
			Edit={Edit}
		/>
	);
};

Collection.propTypes = {
	action: PropTypes.string,
	id: PropTypes.number,
	collectionId: PropTypes.number,
};

export default Collection;

//CollectionExample2.js

import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditCollectionItem from 'cms/collection/edit';
import Delete from 'cms/collection/delete';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import DateTimePicker from 'ui/inputs/datetime_picker';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';

const propTypes = {
	id: PropTypes.number.isRequired,

	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
	langData: PropTypes.object,
	langs: PropTypes.array,
	name: PropTypes.string,
	collectionId: PropTypes.number,
	active: PropTypes.bool,
	date: PropTypes.string,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = ownProps => {
	return {
		CMSPopup: {
			langs: 'langs',
			loading: 'loading',
			collection: {
				name: 'name',
				collectionId: 'collectionId',
				data: 'data',
				langData: 'langData',
				active: 'active',
				date: 'date',
			},
		},
	};
};

class CollectionExample2 extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { id } = this.props;
		uiStore.update('CMSPopup', {
			title: 'Edit item #' + id,
		});
		//</editor-fold>
	}

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { langs, loading, active, date } = this.props;

		if (loading) {
			return null;
		}

		return (
			<Fragment>
				<Field
					name="date"
					label="Date"
					component={DateTimePicker}
					value={date}
				/>
				<Field
					name="active"
					label="Active"
					component={Checkbox}
					value={active}
				/>
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

	renderDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDelete">
		const { loading, id, name, collectionId } = this.props;

		if (loading) {
			return null;
		}

		return <Delete id={id} name={name} collectionId={collectionId} />;
		//</editor-fold>
	};

	render() {
		const { id } = this.props;
		return (
			<Fragment>
				<EditCollectionItem id={id}>{this.renderForm()}</EditCollectionItem>
				{this.renderDelete()}
			</Fragment>
		);
	}
}

CollectionExample2.propTypes = propTypes;

CollectionExample2.defaultProps = defaultProps;

CollectionExample2 = WithUi(uiProps)(CollectionExample2);

export default CollectionExample2;
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
				<Collection />
			</div>
			<div className="margin-bottom">
				<BackendCode code={backendCode} />
			</div>
			<Code title="Administration" code={administrationCode} />
		</ExampleHolder>
	);
};

export default Example;
