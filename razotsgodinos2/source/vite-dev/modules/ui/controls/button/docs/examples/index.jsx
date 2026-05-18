import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/controls/button`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ThemeExample, { info as ThemeExampleInfo } from './theme';
dataExtract({ info: ThemeExampleInfo, links, data, url });

import IconExample, { info as IconExampleInfo } from './icon';
dataExtract({ info: IconExampleInfo, links, data, url });

import CustomTitleExample, {
	info as CustomTitleExampleInfo,
} from './custom_title';
dataExtract({ info: CustomTitleExampleInfo, links, data, url });

import FullWidthExample, { info as FullWidthExampleInfo } from './full_width';
dataExtract({ info: FullWidthExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import LoadingExample, { info as LoadingExampleInfo } from './loading';
dataExtract({ info: LoadingExampleInfo, links, data, url });

import CustomLoadingExample, {
	info as CustomLoadingExampleInfo,
} from './custom_loading';
dataExtract({ info: CustomLoadingExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<ThemeExample />
			<IconExample />
			<CustomTitleExample />
			<FullWidthExample />
			<DisabledExample />
			<LoadingExample />
			<CustomLoadingExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
