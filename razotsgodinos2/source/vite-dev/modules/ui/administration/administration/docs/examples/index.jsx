import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/administration/main`;
export const data = {};

import Example1, { info as Example1Info } from './example1';
dataExtract({ info: Example1Info, links, data, url });

import Example2, { info as Example2Info } from './example2';
dataExtract({ info: Example2Info, links, data, url });

import Example3, { info as Example3Info } from './example3';
dataExtract({ info: Example3Info, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<Example1 />
			<Example2 />
			<Example3 />
		</Fragment>
	);
};

export default Examples;
