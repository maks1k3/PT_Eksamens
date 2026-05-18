import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/media/gallery/viewer_js`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import AdvancedExample, { info as AdvancedExampleInfo } from './advanced';
dataExtract({ info: AdvancedExampleInfo, links, data, url });

import ImagesExample, { info as ImagesExampleInfo } from './images_example';
dataExtract({ info: ImagesExampleInfo, links, data, url });

import ImagesCollectionExample, {
	info as ImagesCollectionExampleInfo,
} from './images_collection';
dataExtract({ info: ImagesCollectionExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<AdvancedExample />
			<ImagesExample />
			<ImagesCollectionExample />
		</Fragment>
	);
};

export default Examples;
