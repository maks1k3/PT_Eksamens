import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Description from 'common/docs/ui/description';
import description from './description';

import Examples from './examples';

const Docs = () => {
	return (
		<Fragment>
			<Description {...description} />
			<Examples />
		</Fragment>
	);
};

export default Docs;
