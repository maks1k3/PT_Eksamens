import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import InfoTable from 'ui/tables/info_table';

const propTypes = {
	id: PropTypes.any.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	renderView: PropTypes.func,

	//from ui
	data: PropTypes.object,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		[ownProps.containerName]: {
			data: 'data',
		},
	};
};

class View extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { data, renderView } = this.props;

		if (_.isFunction(renderView)) {
			return renderView({ data, View: this });
		}

		const item = _.get(data, 'item', {});

		return <InfoTable rows={item} />;
	}
}

View.propTypes = propTypes;

View.defaultProps = defaultProps;

View = WithUi(uiProps)(View);

export default View;
