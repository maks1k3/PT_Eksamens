import React, { PureComponent as Component } from 'react';
import ReactDOM from 'react-dom';
import getDisplayName from 'helpers/getDisplayName';
import { isNull, isUndefined } from 'lodash-es';
import { extend } from 'jquery';

const hoc = (options) => (WrappedComponent) => {
	// function Wrapper(props, ref) {
	const defaults = {
		wrapper: 'div',
		wrapperProps: {},
		mountBeforeChildren: true,
	};

	options = !isUndefined(options)
		? extend({}, defaults, options)
		: extend({}, defaults);

	class Responsive extends Component {
		static displayName = `Responsive(${getDisplayName(WrappedComponent)})`;

		constructor(props, context) {
			super(props, context);

			this.state = {
				mounted: false,
				containerWidth: 0,
				browserWindowWidth: 0,
				browserDevice: 'mobile',
			};

			this.browserWindowWidth = browser_window.width;
			this.browserDevice = browser_window.device;
			this.mounted = false;
		}

		componentDidMount() {
			//<editor-fold defaultstate="collapsed" desc="componentDidMount">
			this.mounted = true;
			this.updateDimensions();
			ee.on(events.browserWindow.resize, this.onResize);
			//</editor-fold>
		}

		componentWillUnmount() {
			//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
			this.mounted = false;
			ee.off(events.browserWindow.resize, this.onResize);
			//</editor-fold>
		}

		onResize = ({ width, device }) => {
			//<editor-fold defaultstate="collapsed" desc="onResize">
			this.browserWindowWidth = width;
			this.browserDevice = device;
			if (this.mounted) {
				this.updateDimensions();
			}
			//</editor-fold>
		};

		getDimensions = () => {
			//<editor-fold defaultstate="collapsed" desc="getDimensions">
			const node = ReactDOM.findDOMNode(this);

			return {
				width: $(node).width(),
				//height: $(node).height(),
			};
			//return $(node).outerWidth(true);
			//return $(node).width();
			//</editor-fold>
		};

		updateDimensions = () => {
			//<editor-fold defaultstate="collapsed" desc="updateDimensions">
			const dimensions = this.getDimensions();
			this.setState({
				mounted: true,
				containerWidth: dimensions.width,
				browserWindowWidth: this.browserWindowWidth,
				browserDevice: this.browserDevice,
			});
			//</editor-fold>
		};

		render() {
			const { mounted, containerWidth, browserWindowWidth, browserDevice } =
				this.state;
			const wrappedComponent = (
				<WrappedComponent
					// ref={ref}
					{...this.props}
					containerWidth={containerWidth}
					browserWindowWidth={browserWindowWidth}
					browserDevice={browserDevice}
					updateDimensions={this.updateDimensions}
				/>
			);

			const { wrapper, wrapperProps, mountBeforeChildren } = options;

			if (!isNull(wrapper)) {
				if (mountBeforeChildren && !mounted) {
					return React.createElement(wrapper, wrapperProps);
				} else {
					return React.createElement(wrapper, wrapperProps, wrappedComponent);
				}
			} else {
				if (mountBeforeChildren && !mounted) {
					return null;
				} else {
					return wrappedComponent;
				}
			}
		}
	}

	// 	return <Responsive {...props} />;
	// }
	// return React.forwardRef(Wrapper);

	return Responsive;
};

export default hoc;
