import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/animation/horizontal_bars`;
export const data = {};

import PulseLoaderExample, {
	info as PulseLoaderExampleInfo,
} from './pulse_loader';
dataExtract({ info: PulseLoaderExampleInfo, links, data, url });

import BeatLoaderExample, {
	info as BeatLoaderExampleInfo,
} from './beat_loader';
dataExtract({ info: BeatLoaderExampleInfo, links, data, url });

import SyncLoaderExample, {
	info as SyncLoaderExampleInfo,
} from './sync_loader';
dataExtract({ info: SyncLoaderExampleInfo, links, data, url });

import ScaleLoaderExample, {
	info as ScaleLoaderExampleInfo,
} from './scale_loader';
dataExtract({ info: ScaleLoaderExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<PulseLoaderExample />
			<BeatLoaderExample />
			<SyncLoaderExample />
			<ScaleLoaderExample />
		</Fragment>
	);
};

export default Examples;
