import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/maps/leaflet/wms_tile_layer`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
		</Fragment>
	);
};

export default Examples;
