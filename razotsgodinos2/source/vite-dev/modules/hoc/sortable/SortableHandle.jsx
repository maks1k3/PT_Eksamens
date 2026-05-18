import React, { PureComponent as Component } from 'react';
import { findDOMNode } from 'react-dom';
import getDisplayName from 'helpers/getDisplayName';

const hoc = WrappedComponent => {
	class WithSortableHandle extends Component {
		static displayName = `WithSortableHandle(${getDisplayName(
			WrappedComponent,
		)})`;

		constructor(props) {
			super(props);
		}

		componentDidMount() {
			//<editor-fold defaultstate="collapsed" desc="componentDidMount">
			const node = findDOMNode(this);
			node.sortableHandle = true;
			//</editor-fold>
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	return WithSortableHandle;
};

export function isSortableHandle(node) {
	return node.sortableHandle != null;
}

export default hoc;
