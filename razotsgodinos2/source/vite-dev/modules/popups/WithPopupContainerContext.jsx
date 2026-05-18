import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';

import PopupContainerContext from './PopupContainerContext';

const hoc = WrappedComponent => {
	class WithPopupContainerContext extends Component {
		static displayName = `WithPopupContainerContext(${getDisplayName(
			WrappedComponent,
		)})`;

		constructor(props) {
			super(props);
		}

		render() {
			return (
				<PopupContainerContext.Consumer>
					{context => (
						<WrappedComponent {...this.props} popupContainerContext={context} />
					)}
				</PopupContainerContext.Consumer>
			);
		}
	}

	return WithPopupContainerContext;
};

export default hoc;
