import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/animation/spinners`;
export const data = {};

import CircleLoaderExample, {
	info as CircleLoaderExampleInfo,
} from './circle_loader';
dataExtract({ info: CircleLoaderExampleInfo, links, data, url });

import FadingCircleLoaderExample, {
	info as FadingCircleLoaderExampleInfo,
} from './fading_circle_loader';
dataExtract({ info: FadingCircleLoaderExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<CircleLoaderExample />
			<FadingCircleLoaderExample />
		</Fragment>
	);
};

export default Examples;
