import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/maps/leaflet/map`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import BoundsExample, { info as BoundsExampleInfo } from './bounds';
dataExtract({ info: BoundsExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import AdvancedExample, { info as AdvancedExampleInfo } from './advanced';
dataExtract({ info: AdvancedExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<BoundsExample />
			<CallbacksExample />
			<AdvancedExample />
		</Fragment>
	);
};

export default Examples;
