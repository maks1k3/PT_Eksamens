import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/media/administration/file_administration`;
export const data = {};

import MainExample, { info as MainExampleInfo } from './main';
dataExtract({ info: MainExampleInfo, links, data, url });

import CMSExample, { info as CMSExampleInfo } from './cms';
dataExtract({ info: CMSExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<MainExample />
			<CMSExample />
		</Fragment>
	);
};

export default Examples;
