import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/controls/link`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ThemeExample, { info as ThemeExampleInfo } from './theme';
dataExtract({ info: ThemeExampleInfo, links, data, url });

import ModeExample, { info as ModeExampleInfo } from './mode';
dataExtract({ info: ModeExampleInfo, links, data, url });

import TargetExample, { info as TargetExampleInfo } from './target';
dataExtract({ info: TargetExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

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
			<ThemeExample />
			<ModeExample />
			<TargetExample />
			<DisabledExample />
			<CallbacksExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
