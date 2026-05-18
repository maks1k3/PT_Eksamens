import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/time/time`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import StaticExample, { info as StaticExampleInfo } from './static';
dataExtract({ info: StaticExampleInfo, links, data, url });

import FormatExample, { info as FormatExampleInfo } from './format';
dataExtract({ info: FormatExampleInfo, links, data, url });

import TimeZoneExample, { info as TimeZoneExampleInfo } from './timezone';
dataExtract({ info: TimeZoneExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<StaticExample />
			<FormatExample />
			<TimeZoneExample />
		</Fragment>
	);
};

export default Examples;
