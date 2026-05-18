import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/card_input`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import PrefilledValuesExample, {
	info as PrefilledValuesExampleInfo,
} from './prefilled_values';
dataExtract({ info: PrefilledValuesExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import UsageWithFormExample, {
	info as UsageWithFormExampleInfo,
} from './usage_with_form';
dataExtract({ info: UsageWithFormExampleInfo, links, data, url });

import TranslationsExample, {
	info as TranslationsExampleInfo,
} from './translations';
dataExtract({ info: TranslationsExampleInfo, links, data, url });

import CustomTranslationsExample, {
	info as CustomTranslationsExampleInfo,
} from './custom_translations';
dataExtract({ info: CustomTranslationsExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<PrefilledValuesExample />
			<DisabledExample />
			<UsageWithFormExample />
			<TranslationsExample />
			<CustomTranslationsExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
