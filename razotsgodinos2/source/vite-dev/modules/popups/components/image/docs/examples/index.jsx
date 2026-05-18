import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/popups/image`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

import OnGalleryFinishExample, {
	info as OnGalleryFinishExampleInfo,
} from './on_gallery_finish';
dataExtract({ info: OnGalleryFinishExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<CustomizationExample />
			<OnGalleryFinishExample />
		</Fragment>
	);
};

export default Examples;
