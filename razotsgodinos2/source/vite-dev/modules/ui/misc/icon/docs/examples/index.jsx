import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/misc/icon`;
export const data = {};

import IconBasicExample, { info as IconBasicExampleInfo } from './basic';
dataExtract({ info: IconBasicExampleInfo, links, data, url });
import IconAdvancedExample, {
	info as IconAdvancedExampleInfo,
} from './advanced';
dataExtract({ info: IconAdvancedExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<IconBasicExample />
			<IconAdvancedExample />
		</Fragment>
	);
};

export default Examples;
