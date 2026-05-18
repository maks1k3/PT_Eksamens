import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ExampleHolder from 'common/docs/ui/example_holder';
import BackendCode from 'common/docs/ui/backend_code';
import Code from 'common/docs/ui/code';

import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import Thumbnail from 'ui/media/thumbnail';
import ResponsiveGrid from 'ui/list/responsive_grid';

const title = 'CMS collection example 1';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import Thumbnail from 'ui/media/thumbnail';
import ResponsiveGrid from 'ui/list/responsive_grid';

//Collection.js

const propTypes = {
	//from ui
	ids: PropTypes.array,
};

const uiProps = ownProps => {
	return {
		collections: {
			collection_example_1: {
				ids: 'ids',
			},
		},
	};
};

class Collection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { ids } = this.props;
		return (
			<Editable
				add={{
					name: 'collection_example_1',
					action: 'add',
				}}
				sort={{
					name: 'collection_example_1',
					action: 'sort',
				}}>
				<ResponsiveGrid
					items={ids}
					getGridProps={({
						containerWidth,
						browserWindowWidth,
						browserDevice,
					}) => {
						return {
							gutter: 10,
							minWidth: 200,
						};
					}}
					renderItem={({ gridItemWidth, item, index }) => {
						const style = {};

						style.width = gridItemWidth;

						if (gridItemWidth === '100%') {
							style.marginBottom = '5px';
						} else {
							style.margin = '0 5px 10px 5px';
							style.float = 'left';
						}

						return (
							<div key={index} style={style}>
								<Item id={item} />
							</div>
						);
					}}
				/>
			</Editable>
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
	image: PropTypes.string,
};

const uiProps = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
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

class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, image, id } = this.props;

		return (
			<Editable
				edit={{
					name: 'collection_example_1',
					action: 'edit',
					id: id,
				}}>
				<div>
					<h3>{title}</h3>
					<Thumbnail width="100%" height="180px" src={image} />
				</div>
			</Editable>
		);
	}
}

Item.propTypes = propTypes;

Item = WithUi(ownProps => {
	return {
		images: {
			[_.head(ownProps.images)]: {
				image: 'image',
			},
		},
	};
})(Item);
Item = WithUi(uiProps)(Item);
  `,
};

const propTypes = {
	//from ui
	ids: PropTypes.array,
};

const uiProps = ownProps => {
	return {
		collections: {
			collection_example_1: {
				ids: 'ids',
			},
		},
	};
};

class Collection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { ids } = this.props;
		return (
			<Editable
				add={{
					name: 'collection_example_1',
					action: 'add',
				}}
				sort={{
					name: 'collection_example_1',
					action: 'sort',
				}}>
				<ResponsiveGrid
					items={ids}
					getGridProps={({
						containerWidth,
						browserWindowWidth,
						browserDevice,
					}) => {
						return {
							gutter: 10,
							minWidth: 200,
						};
					}}
					renderItem={({ gridItemWidth, item, index }) => {
						const style = {};

						style.width = gridItemWidth;

						if (gridItemWidth === '100%') {
							style.marginBottom = '5px';
						} else {
							style.margin = '0 5px 10px 5px';
							style.float = 'left';
						}

						return (
							<div key={index} style={style}>
								<Item id={item} />
							</div>
						);
					}}
				/>
			</Editable>
		);
	}
}
Collection = WithUi(uiProps)(Collection);

Collection.propTypes = propTypes;

const propTypes2 = {
	id: PropTypes.number.isRequired,

	//from ui
	title: PropTypes.string,
	image: PropTypes.string,
};

const uiProps2 = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
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

class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, image, id } = this.props;

		return (
			<Editable
				edit={{
					name: 'collection_example_1',
					action: 'edit',
					id: id,
				}}>
				<div>
					<h3>{title}</h3>
					<Thumbnail width="100%" height="180px" src={image} />
				</div>
			</Editable>
		);
	}
}

Item.propTypes = propTypes2;

Item = WithUi(ownProps => {
	return {
		images: {
			[_.head(ownProps.images)]: {
				image: 'image',
			},
		},
	};
})(Item);
Item = WithUi(uiProps2)(Item);

//<editor-fold defaultstate="collapsed" desc="backendCode">
const backendCode = `
/*
 |--------------------------------------------------------------------------
 |                             collection_example_1
 |--------------------------------------------------------------------------|
 */
 //<editor-fold defaultstate="collapsed" desc="collection_example_1">
 $config['collection_example_1'] = [
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
     'collections' => [
         'collection_example_1' => [
             'results_per_page' => 'all',
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
import Edit from './CollectionExample1';

const name = 'collection_example_1';

const getTitle = collectionItem => {
	//<editor-fold defaultstate="collapsed" desc="getTitle">
	const { title } = _.get(collectionItem, 'data', {});

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

//CollectionExample1.js

import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditCollectionItem from 'cms/collection/edit';
import Delete from 'cms/collection/delete';
import ImageAdministration from 'ui/media/administration/image/cms';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const propTypes = {
	id: PropTypes.number.isRequired,

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

class CollectionExample1 extends Component {
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
				{this.renderImageAdministration()}
				<EditCollectionItem id={id}>{this.renderForm()}</EditCollectionItem>
				{this.renderDelete()}
			</Fragment>
		);
	}
}

CollectionExample1.propTypes = propTypes;

CollectionExample1.defaultProps = defaultProps;

CollectionExample1 = WithUi(uiProps)(CollectionExample1);

export default CollectionExample1;
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
