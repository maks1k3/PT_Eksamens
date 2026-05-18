import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/controls/pagination`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ControlledExample, { info as ControlledExampleInfo } from './controlled';
dataExtract({ info: ControlledExampleInfo, links, data, url });

import DisabledArrowsExample, {
	info as DisabledArrowsExampleInfo,
} from './disabled_arrows';
dataExtract({ info: DisabledArrowsExampleInfo, links, data, url });

import GetLinkUrlExample, {
	info as GetLinkUrlExampleInfo,
} from './get_link_url';
dataExtract({ info: GetLinkUrlExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<ControlledExample />
			<DisabledArrowsExample />
			<GetLinkUrlExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
