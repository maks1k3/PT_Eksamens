import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/media/files`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import AdvancedExample, { info as AdvancedExampleInfo } from './advanced';
dataExtract({ info: AdvancedExampleInfo, links, data, url });

import CollectionBasicExample, {
	info as CollectionBasicExampleInfo,
} from './collection_basic';
dataExtract({ info: CollectionBasicExampleInfo, links, data, url });

import CollectionAdvancedExample, {
	info as CollectionAdvancedExampleInfo,
} from './collection_advanced';
dataExtract({ info: CollectionAdvancedExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<AdvancedExample />
			<CollectionBasicExample />
			<CollectionAdvancedExample />
		</Fragment>
	);
};

export default Examples;
