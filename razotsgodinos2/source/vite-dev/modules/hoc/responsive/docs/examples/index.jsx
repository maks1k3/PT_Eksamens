import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/hoc/responsive`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import AdvancedExample, { info as AdvancedExampleInfo } from './advanced';
dataExtract({ info: AdvancedExampleInfo, links, data, url });

import OptionsExample, { info as OptionsExampleInfo } from './options';
dataExtract({ info: OptionsExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<AdvancedExample />
			<OptionsExample />
		</Fragment>
	);
};

export default Examples;
