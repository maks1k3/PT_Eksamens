import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';

import MapContext from './MapContext';

const hoc = WrappedComponent => {
	class WithMapContext extends Component {
		static displayName = `WithMapContext(${getDisplayName(WrappedComponent)})`;

		constructor(props) {
			super(props);
		}

		render() {
			return (
				<MapContext.Consumer>
					{context => <WrappedComponent {...this.props} mapContext={context} />}
				</MapContext.Consumer>
			);
		}
	}

	return WithMapContext;
};

export default hoc;
