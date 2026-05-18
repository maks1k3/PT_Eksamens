import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/maps/leaflet/div_icon`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DynamicExample, { info as DynamicExampleInfo } from './dynamic';
dataExtract({ info: DynamicExampleInfo, links, data, url });

import RatingMapExample, { info as RatingMapExampleInfo } from './rating_map';
dataExtract({ info: RatingMapExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<DynamicExample />
			<RatingMapExample />
		</Fragment>
	);
};

export default Examples;
