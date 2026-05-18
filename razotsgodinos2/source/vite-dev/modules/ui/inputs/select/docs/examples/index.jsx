import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/select`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import ReadOnlyExample, { info as ReadOnlyExampleInfo } from './readonly';
dataExtract({ info: ReadOnlyExampleInfo, links, data, url });

import LoadingExample, { info as LoadingExampleInfo } from './loading';
dataExtract({ info: LoadingExampleInfo, links, data, url });

import SearchableExample, { info as SearchableExampleInfo } from './searchable';
dataExtract({ info: SearchableExampleInfo, links, data, url });

import MultiExample, { info as MultiExampleInfo } from './multi';
dataExtract({ info: MultiExampleInfo, links, data, url });

import LoadOptionsExample, {
	info as LoadOptionsExampleInfo,
} from './load_options';
dataExtract({ info: LoadOptionsExampleInfo, links, data, url });

import AsyncExample, { info as AsyncExampleInfo } from './async';
dataExtract({ info: AsyncExampleInfo, links, data, url });

import CustomTextExample, {
	info as CustomTextExampleInfo,
} from './custom_text';
dataExtract({ info: CustomTextExampleInfo, links, data, url });

import IconExample, { info as IconExampleInfo } from './icon';
dataExtract({ info: IconExampleInfo, links, data, url });

import ClearableExample, { info as ClearableExampleInfo } from './clearable';
dataExtract({ info: ClearableExampleInfo, links, data, url });

import ControlledExample, { info as ControlledExampleInfo } from './controlled';
dataExtract({ info: ControlledExampleInfo, links, data, url });

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
			<LoadingExample />
			<SearchableExample />
			<MultiExample />
			<LoadOptionsExample />
			<AsyncExample />
			<CustomTextExample />
			<IconExample />
			<ClearableExample />
			<ControlledExample />
			<ExternalControlExample />
			<CallbacksExample />
			<ShowValidationErrorExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
