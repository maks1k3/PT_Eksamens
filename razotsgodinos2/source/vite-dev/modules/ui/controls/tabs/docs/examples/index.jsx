import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/controls/tabs`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import CurrentAndDisabledExample, {
	info as CurrentAndDisabledExampleInfo,
} from './current_and_disabled';
dataExtract({ info: CurrentAndDisabledExampleInfo, links, data, url });

import InUrlExample, { info as InUrlExampleInfo } from './in_url';
dataExtract({ info: InUrlExampleInfo, links, data, url });

import LazyLoadExample, { info as LazyLoadExampleInfo } from './lazyload';
dataExtract({ info: LazyLoadExampleInfo, links, data, url });

import UnmountOnCloseExample, {
	info as unmountOnCloseExampleInfo,
} from './unmount_on_close';
dataExtract({ info: unmountOnCloseExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_control';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

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
			<CurrentAndDisabledExample />
			<InUrlExample />
			<LazyLoadExample />
			<UnmountOnCloseExample />
			<ExternalControlExample />
			<CallbacksExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
