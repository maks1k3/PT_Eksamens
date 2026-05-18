import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/media/image`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ResizeExample, { info as ResizeExampleInfo } from './resize';
dataExtract({ info: ResizeExampleInfo, links, data, url });

import ResponsiveExample, { info as ResponsiveExampleInfo } from './responsive';
dataExtract({ info: ResponsiveExampleInfo, links, data, url });

import CenterExample, { info as CenterExampleInfo } from './center';
dataExtract({ info: CenterExampleInfo, links, data, url });

import PlaceholderExample, {
	info as PlaceholderExampleInfo,
} from './placeholder';
dataExtract({ info: PlaceholderExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

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
			<ResizeExample />
			<ResponsiveExample />
			<CenterExample />
			<PlaceholderExample />
			<CallbacksExample />
			<CustomizationExample />
			<LazyLoadBasicExample />
			<LazyLoadCustomizationExample />
		</Fragment>
	);
};

export default Examples;
