import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/controls/menu`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import CustomizatinoExample, {
	info as CustomizatinoExampleInfo,
} from './customization';
dataExtract({ info: CustomizatinoExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<CustomizatinoExample />
		</Fragment>
	);
};

export default Examples;
