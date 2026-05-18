import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/form/field`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ComponentExample, { info as ComponentExampleInfo } from './component';
dataExtract({ info: ComponentExampleInfo, links, data, url });

import LabelExample, { info as LabelExampleInfo } from './label';
dataExtract({ info: LabelExampleInfo, links, data, url });

import ValidationExample, { info as ValidationExampleInfo } from './validation';
dataExtract({ info: ValidationExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import OnChangeExample, { info as OnChangeExampleInfo } from './on_change';
dataExtract({ info: OnChangeExampleInfo, links, data, url });

import OnSubmitExample, { info as OnSubmitExampleInfo } from './on_submit';
dataExtract({ info: OnSubmitExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<ComponentExample />
			<LabelExample />
			<ValidationExample />
			<DisabledExample />
			<OnChangeExample />
			<OnSubmitExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
