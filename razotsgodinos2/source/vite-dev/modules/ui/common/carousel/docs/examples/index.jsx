import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/common/carousel`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import PageModeExample, { info as PageModeExampleInfo } from './page_mode';
dataExtract({ info: PageModeExampleInfo, links, data, url });

import CenterModeExample, {
	info as CenterModeExampleInfo,
} from './center_mode';
dataExtract({ info: CenterModeExampleInfo, links, data, url });

import MultipleExample, { info as MultipleExampleInfo } from './multiple';
dataExtract({ info: MultipleExampleInfo, links, data, url });

import InfiniteExample, { info as InfiniteExampleInfo } from './infinite';
dataExtract({ info: InfiniteExampleInfo, links, data, url });

import FadeExample, { info as FadeExampleInfo } from './fade';
dataExtract({ info: FadeExampleInfo, links, data, url });

import DraggableExample, { info as DraggableExampleInfo } from './draggable';
dataExtract({ info: DraggableExampleInfo, links, data, url });

import ScrollbableExample, {
	info as ScrollbableExampleInfo,
} from './scrollable';
dataExtract({ info: ScrollbableExampleInfo, links, data, url });

import AutoplayExample, { info as AutoplayExampleInfo } from './autoplay';
dataExtract({ info: AutoplayExampleInfo, links, data, url });

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
			<PageModeExample />
			<CenterModeExample />
			<MultipleExample />
			<InfiniteExample />
			<FadeExample />
			<DraggableExample />
			<ScrollbableExample />
			<AutoplayExample />
			<ExternalControlExample />
			<CallbacksExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
