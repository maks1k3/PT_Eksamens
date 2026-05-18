import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';

const hoc = WrappedComponent => {
	class WithBrowserDevice extends Component {
		static displayName = `WithBrowserDevice(${getDisplayName(
			WrappedComponent,
		)})`;

		constructor(props, context) {
			super(props, context);
			this.state = {
				browserDevice: browser_window.device,
			};
			this.mounted = false;
		}

		componentDidMount() {
			//<editor-fold defaultstate="collapsed" desc="componentDidMount">
			this.mounted = true;
			ee.on(events.browserWindow.resize, this.onResize);
			//</editor-fold>
		}

		componentWillUnmount() {
			//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
			this.mounted = false;
			ee.off(events.browserWindow.resize, this.onResize);
			//</editor-fold>
		}

		onResize = ({ device }) => {
			//<editor-fold defaultstate="collapsed" desc="onResize">
			if (!this.mounted) {
				return;
			}

			this.setState({
				browserDevice: device,
			});
			//</editor-fold>
		};

		render() {
			const { browserDevice } = this.state;
			return <WrappedComponent {...this.props} browserDevice={browserDevice} />;
		}
	}

	return WithBrowserDevice;
};

export default hoc;
