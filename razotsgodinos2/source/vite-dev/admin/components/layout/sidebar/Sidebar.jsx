import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import menu from 'admin/menu';
import Menu from 'ui/controls/menu';

const propTypes = {};

const defaultProps = {};

class Sidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Menu rows={menu} />;
	}
}

Sidebar.propTypes = propTypes;

Sidebar.defaultProps = defaultProps;

export default Sidebar;
