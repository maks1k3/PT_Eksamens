import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/editors/ckeditor`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import OnChangeExample, { info as OnChangeExampleInfo } from './on_change';
dataExtract({ info: OnChangeExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_control';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import ToolbarExample, { info as ToolbarExampleInfo } from './toolbar';
dataExtract({ info: ToolbarExampleInfo, links, data, url });

import CustomToolbarExample, {
	info as CustomToolbarExampleInfo,
} from './custom_toolbar';
dataExtract({ info: CustomToolbarExampleInfo, links, data, url });

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
			<OnChangeExample />
			<ExternalControlExample />
			<ToolbarExample />
			<CustomToolbarExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
