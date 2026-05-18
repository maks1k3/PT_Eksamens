import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Description from 'common/docs/ui/description';
import description from './description';

import settings from './settings';
import PropsTable from 'common/docs/ui/props_table';

import Examples from './examples';

const Docs = () => {
	return (
		<Fragment>
			<Description {...description} />
			<PropsTable rows={settings} title="Settings" />
			<Examples />
		</Fragment>
	);
};

export default Docs;
