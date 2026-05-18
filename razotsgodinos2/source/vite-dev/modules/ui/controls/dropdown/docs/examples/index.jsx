import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/controls/dropdown`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_control';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import LazyLoadExample, { info as LazyLoadExampleInfo } from './lazy_load';
dataExtract({ info: LazyLoadExampleInfo, links, data, url });

import CloseExample, { info as CloseExampleInfo } from './close';
dataExtract({ info: CloseExampleInfo, links, data, url });

import AlignExample, { info as AlignExampleInfo } from './align';
dataExtract({ info: AlignExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

import AbsolutelyPositionedExample, {
	info as AbsolutelyPositionedExampleInfo,
} from './absolutely_positioned';
dataExtract({ info: AbsolutelyPositionedExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<ExternalControlExample />
			<LazyLoadExample />
			<CloseExample />
			<AlignExample />
			<CallbacksExample />
			<CustomizationExample />
			<AbsolutelyPositionedExample />
		</Fragment>
	);
};

export default Examples;
