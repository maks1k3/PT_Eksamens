import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/editors/ace_editor`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ModeExample, { info as ModeExampleInfo } from './mode';
dataExtract({ info: ModeExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import ReadOnlyExample, { info as ReadOnlyExampleInfo } from './readonly';
dataExtract({ info: ReadOnlyExampleInfo, links, data, url });

import OnChangeExample, { info as OnChangeExampleInfo } from './on_change';
dataExtract({ info: OnChangeExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_control';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<ModeExample />
			<DisabledExample />
			<ReadOnlyExample />
			<OnChangeExample />
			<ExternalControlExample />
		</Fragment>
	);
};

export default Examples;
