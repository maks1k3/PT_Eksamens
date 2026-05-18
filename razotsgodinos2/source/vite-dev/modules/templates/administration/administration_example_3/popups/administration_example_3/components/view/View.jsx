import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import InfoTable from 'ui/tables/info_table';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	item: PropTypes.object,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		[ownProps.containerName]: {
			data: {
				item: 'item',
			},
		},
	};
};

class View extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { item } = this.props;

		return <InfoTable rows={item} />;
	}
}

View.propTypes = propTypes;

View.defaultProps = defaultProps;

View = WithUi(uiProps)(View);

export default View;
