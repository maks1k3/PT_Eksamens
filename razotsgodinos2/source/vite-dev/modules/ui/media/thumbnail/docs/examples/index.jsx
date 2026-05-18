import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/media/thumbnail`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

import ShowPlayExample, { info as ShowPlayExampleInfo } from './show_play_icon';
dataExtract({ info: ShowPlayExampleInfo, links, data, url });

import LazyLoadBasicExample, {
	info as LazyLoadBasicExampleInfo,
} from './lazyload_basic';
dataExtract({ info: LazyLoadBasicExampleInfo, links, data, url });

import LazyLoadCustomizationExample, {
	info as LazyLoadCustomizationExampleInfo,
} from './lazyload_customization';
dataExtract({ info: LazyLoadCustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<CallbacksExample />
			<CustomizationExample />
			<ShowPlayExample />
			<LazyLoadBasicExample />
			<LazyLoadCustomizationExample />
		</Fragment>
	);
};

export default Examples;
