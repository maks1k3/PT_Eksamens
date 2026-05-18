import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/color_picker`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import ClearableExample, { info as ClearableExampleInfo } from './clearable';
dataExtract({ info: ClearableExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_contorl';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import InsideFormExample, {
	info as InsideFormExampleInfo,
} from './inside_form';
dataExtract({ info: InsideFormExampleInfo, links, data, url });

import ShowValidationErrorExample, {
	info as ShowValidationErrorExampleInfo,
} from './validation_error';
dataExtract({ info: ShowValidationErrorExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<DisabledExample />
			<ClearableExample />
			<ExternalControlExample />
			<CallbacksExample />
			<InsideFormExample />
			<ShowValidationErrorExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
