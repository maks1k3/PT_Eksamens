import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/file_input`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ImagePreviewExample, {
	info as ImagePreviewExampleInfo,
} from './image_preview';
dataExtract({ info: ImagePreviewExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<ImagePreviewExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
