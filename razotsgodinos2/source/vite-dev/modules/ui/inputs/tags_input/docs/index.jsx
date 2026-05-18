import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Description from 'common/docs/ui/description';
import description from './description';

import props from './props';
import PropsTable from 'common/docs/ui/props_table';

import methods from './methods';
import MethodsTable from 'common/docs/ui/methods_table';
import Examples from './examples';

const Docs = () => {
	return (
		<Fragment>
			<Description {...description} />
			<PropsTable rows={props} />
			<MethodsTable rows={methods} />
			<Examples />
		</Fragment>
	);
};

export default Docs;
