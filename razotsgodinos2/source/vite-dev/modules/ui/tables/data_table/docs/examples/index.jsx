import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/tables/data_table`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import RenderExample, { info as RenderExampleInfo } from './render';
dataExtract({ info: RenderExampleInfo, links, data, url });

import InitialExample, { info as InitialExampleInfo } from './initial_state';
dataExtract({ info: InitialExampleInfo, links, data, url });

import TranslationsExample, {
	info as TranslationsExampleInfo,
} from './translations';
dataExtract({ info: TranslationsExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_control';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

import CustomRowColorsExample, {
	info as CustomRowColorsExampleInfo,
} from './custom_row_colors';
dataExtract({ info: CustomRowColorsExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<RenderExample />
			<InitialExample />
			<TranslationsExample />
			<CallbacksExample />
			<ExternalControlExample />
			<CustomizationExample />
			<CustomRowColorsExample />
		</Fragment>
	);
};

export default Examples;
