import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/common/scrollview`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import IsolatedExample, { info as IsolatedExampleInfo } from './isolated';
dataExtract({ info: IsolatedExampleInfo, links, data, url });

import AutoHeightExample, {
	info as AutoHeightExampleInfo,
} from './auto_height';
dataExtract({ info: AutoHeightExampleInfo, links, data, url });

import AutoHideExample, { info as AutoHideExampleInfo } from './auto_hide';
dataExtract({ info: AutoHideExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<IsolatedExample />
			<AutoHeightExample />
			<AutoHideExample />
			<CallbacksExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
