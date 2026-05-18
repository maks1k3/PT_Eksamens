import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/animation/3d`;
export const data = {};

import FlippingSquareLoaderExample, {
	info as FlippingSquareLoaderExampleInfo,
} from './flipping_square_loader';
dataExtract({ info: FlippingSquareLoaderExampleInfo, links, data, url });

import CubeGridLoaderExample, {
	info as CubeGridLoaderExampleInfo,
} from './cube_grid_loader';
dataExtract({ info: CubeGridLoaderExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<FlippingSquareLoaderExample />
			<CubeGridLoaderExample />
		</Fragment>
	);
};

export default Examples;
