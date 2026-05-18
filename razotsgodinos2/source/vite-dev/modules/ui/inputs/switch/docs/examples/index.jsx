import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/switch`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ThemeExample, { info as ThemeExampleInfo } from './theme';
dataExtract({ info: ThemeExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import ReadOnlyExample, { info as ReadOnlyExampleInfo } from './readonly';
dataExtract({ info: ReadOnlyExampleInfo, links, data, url });

import ControlledExample, { info as ControlledExampleInfo } from './controlled';
dataExtract({ info: ControlledExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import OnChangeExample, { info as OnChangeExampleInfo } from './on_change';
dataExtract({ info: OnChangeExampleInfo, links, data, url });

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
			<DisabledExample />
			<ReadOnlyExample />
			<ControlledExample />
			<ExternalControlExample />
			<OnChangeExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
