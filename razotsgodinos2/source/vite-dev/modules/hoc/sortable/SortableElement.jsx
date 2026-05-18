import React, { PureComponent as Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import getDisplayName from 'helpers/getDisplayName';
import SortableContainerContext from './SortableContainerContext';
import { omit } from 'lodash-es';

const propTypes = {
	index: PropTypes.number.isRequired,
	collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	disabled: PropTypes.bool,
};

const omittedProps = Object.keys(propTypes);

const defaultProps = {
	collection: 0,
	disabled: false,
};

const hoc = (WrappedComponent) => {
	class WithSortableElement extends Component {
		static displayName = `WithSortableElement(${getDisplayName(
			WrappedComponent,
		)})`;

		constructor(props) {
			super(props);
		}

		componentDidMount() {
			//<editor-fold defaultstate="collapsed" desc="componentDidMount">
			this.register();
			//</editor-fold>
		}

		componentDidUpdate(prevProps) {
			//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
			if (this.node) {
				if (prevProps.index !== this.props.index) {
					this.node.sortableInfo.index = this.props.index;
				}

				if (prevProps.disabled !== this.props.disabled) {
					this.node.sortableInfo.disabled = this.props.disabled;
				}
			}

			if (prevProps.collection !== this.props.collection) {
				this.unregister(prevProps.collection);
				this.register();
			}
			//</editor-fold>
		}

		componentWillUnmount() {
			//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
			this.unregister();
			//</editor-fold>
		}

		register = () => {
			//<editor-fold defaultstate="collapsed" desc="register">
			const { collection, disabled, index } = this.props;
			const node = findDOMNode(this);

			node.sortableInfo = {
				collection,
				disabled,
				index,
				manager: this.context.SortableContainer.manager,
			};

			this.node = node;
			this.ref = { node };

			this.context.SortableContainer.manager.add(collection, this.ref);
			//</editor-fold>
		};

		unregister = (collection = this.props.collection) => {
			//<editor-fold defaultstate="collapsed" desc="unregister">
			this.context.SortableContainer.manager.remove(collection, this.ref);
			//</editor-fold>
		};

		render() {
			return <WrappedComponent {...omit(this.props, omittedProps)} />;
		}
	}

	WithSortableElement.contextType = SortableContainerContext;

	WithSortableElement.propTypes = propTypes;

	WithSortableElement.defaultProps = defaultProps;

	return WithSortableElement;
};

export default hoc;
