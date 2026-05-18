import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import BackendCode from 'common/docs/ui/backend_code';
import Code from 'common/docs/ui/code';

import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import Pagination from 'ui/controls/pagination';

const title = 'CMS collection example 3';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import Pagination from 'ui/controls/pagination';

//Collection.js

const propTypes = {
	//from ui
	ids: PropTypes.array,
	lastPage: PropTypes.number,
	page: PropTypes.number,
};

const uiProps = ownProps => {
	return {
		collections: {
			collection_example_3: {
				ids: 'ids',
				lastPage: 'lastPage',
				page: 'page',
			},
		},
	};
};

class Collection extends Component {
	constructor(props) {
		super(props);
	}

	renderPagination = () => {
		//<editor-fold defaultstate="collapsed" desc="renderPagination">
		const { page, lastPage } = this.props;

		if (lastPage < 2) {
			return null;
		}

		return (
			<Pagination
				center={true}
				page={page}
				pageCount={lastPage}
				pageRangeDisplayed={2}
				marginPagesDisplayed={1}
				getLinkUrl={page => {
					return \`\${_g.getMainUrl(
						true,
					)}web_docs/cms/examples/collections?page=\${page}#cms-collection-example-3\`;
				}}
			/>
		);
		//</editor-fold>
	};

	render() {
		const { ids } = this.props;
		return (
			<Fragment>
				<Editable
					add={{
						name: 'collection_example_3',
						action: 'add',
					}}
					sort={{
						name: 'collection_example_3',
						action: 'sort',
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
				{this.renderPagination()}
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
};

const uiProps = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
				data: {
					title: 'title',
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
		const { title, id } = this.props;

		return (
			<Editable
				edit={{
					name: 'collection_example_3',
					action: 'edit',
					id: id,
					type: 'page',
				}}>
				<div>
					<h3>{title}</h3>
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
	ids: PropTypes.array,
	lastPage: PropTypes.number,
	page: PropTypes.number,
};

const uiProps = ownProps => {
	return {
		collections: {
			collection_example_3: {
				ids: 'ids',
				lastPage: 'lastPage',
				page: 'page',
			},
		},
	};
};

class Collection extends Component {
	constructor(props) {
		super(props);
	}

	renderPagination = () => {
		//<editor-fold defaultstate="collapsed" desc="renderPagination">
		const { page, lastPage } = this.props;

		if (lastPage < 2) {
			return null;
		}

		return (
			<Pagination
				center={true}
				page={page}
				pageCount={lastPage}
				pageRangeDisplayed={2}
				marginPagesDisplayed={1}
				getLinkUrl={page => {
					return `${_g.getMainUrl(
						false,
					)}web_docs/cms/examples/collections?page=${page}#cms-collection-example-3`;
				}}
			/>
		);
		//</editor-fold>
	};

	render() {
		const { ids } = this.props;
		return (
			<Fragment>
				<Editable
					add={{
						name: 'collection_example_3',
						action: 'add',
					}}
					sort={{
						name: 'collection_example_3',
						action: 'sort',
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
				{this.renderPagination()}
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
};

const uiProps2 = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
				data: {
					title: 'title',
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
		const { title, id } = this.props;

		return (
			<Editable
				edit={{
					name: 'collection_example_3',
					action: 'edit',
					id: id,
					type: 'page',
				}}>
				<div>
					<h3>{title}</h3>
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
|                             collection_example_3
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="collection_example_3">
$config['collection_example_3'] = [
    'data' => function ($data) {
        return [
            'title' => array_get($data, 'title', ''),
        ];
    },
];
//</editor-fold>

$page = $request->page === null ? 1 : intval($request->page);

$state = Data::get('en', [    
    'collections' => [
        'collection_example_3' => [
            'results_per_page' => 2,
            'page' => $page,
        ],
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
import Edit from './CollectionExample3';

const name = 'collection_example_3';

const getTitle = collectionItem => {
	//<editor-fold defaultstate="collapsed" desc="getTitle">

	const { title } = _.get(collectionItem, 'data', {});

	return \`\${title}\`;
	//</editor-fold>
};

const Collection = ({ action, id, collectionId, type }) => {
	return (
		<CollectionAdministration
			action={action}
			id={id}
			name={name}
			collectionId={collectionId}
			getTitle={getTitle}
			Edit={Edit}
			extra={{
				type: type,
			}}
		/>
	);
};

Collection.propTypes = {
	action: PropTypes.string,
	id: PropTypes.number,
	collectionId: PropTypes.number,
	type: PropTypes.string,
};

export default Collection;

//CollectionExample3.js

import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditCollectionItem from 'cms/collection/edit';
import Delete from 'cms/collection/delete';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const propTypes = {
	id: PropTypes.number.isRequired,
	extra: PropTypes.object,

	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
	images: PropTypes.array,
	name: PropTypes.string,
	collectionId: PropTypes.number,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = ownProps => {
	return {
		CMSPopup: {
			loading: 'loading',
			collection: {
				name: 'name',
				collectionId: 'collectionId',
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

class CollectionExample3 extends Component {
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

	onDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="onDelete">
		const { extra } = this.props;

		if (_.get(extra, 'type') === 'page') {
			location.href = \`\${_g.getMainUrl(true)}home\`;
		}
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

	renderDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDelete">
		const { loading, id, name, collectionId } = this.props;

		if (loading) {
			return null;
		}

		return (
			<Delete
				id={id}
				name={name}
				collectionId={collectionId}
				onSuccess={this.onDelete}
			/>
		);
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

CollectionExample3.propTypes = propTypes;

CollectionExample3.defaultProps = defaultProps;

CollectionExample3 = WithUi(uiProps)(CollectionExample3);

export default CollectionExample3;
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
