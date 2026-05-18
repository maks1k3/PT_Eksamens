import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/autocomplete`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import ReadOnlyExample, { info as ReadOnlyExampleInfo } from './read_only';
dataExtract({ info: ReadOnlyExampleInfo, links, data, url });

import ControlledExample, { info as ControlledExampleInfo } from './controlled';
dataExtract({ info: ControlledExampleInfo, links, data, url });

import OptionsFromServerExample, {
	info as OptionsFromServerExampleInfo,
} from './options_from_server';
dataExtract({ info: OptionsFromServerExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_control';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import ShowValidationErrorExample, {
	info as ShowValidationErrorExampleInfo,
} from './show_validation_error';
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
			<ReadOnlyExample />
			<ControlledExample />
			<OptionsFromServerExample />
			<ExternalControlExample />
			<CallbacksExample />
			<ShowValidationErrorExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
