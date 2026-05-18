import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/common/horizontal_content`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DraggableExample, { info as DraggableExampleInfo } from './draggable';
dataExtract({ info: DraggableExampleInfo, links, data, url });

import ScrollableExample, { info as ScrollableExampleInfo } from './scrollable';
dataExtract({ info: ScrollableExampleInfo, links, data, url });

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
			<DraggableExample />
			<ScrollableExample />
			<ExternalControlExample />
			<CallbacksExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
