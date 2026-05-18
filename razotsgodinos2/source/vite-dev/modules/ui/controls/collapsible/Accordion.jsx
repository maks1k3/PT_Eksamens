import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AccordionContext from './AccordionContext';
import { forEach, set, unset } from 'lodash-es';

const propTypes = {
	children: PropTypes.node,
};

const defaultProps = {};

class Accordion extends Component {
	constructor(props) {
		super(props);

		this.collapsibles = {};

		this.state = {
			context: {
				Accordion: this,
			},
		};
	}

	register = ({ name, Collapsible }) => {
		//<editor-fold defaultstate="collapsed" desc="register">
		set(this.collapsibles, name, Collapsible);
		//</editor-fold>
	};

	unregister = ({ name }) => {
		//<editor-fold defaultstate="collapsed" desc="unregister">
		unset(this.collapsibles, name);
		//</editor-fold>
	};

	setCurrent = ({ name }) => {
		//<editor-fold defaultstate="collapsed" desc="setCurrent">
		forEach(this.collapsibles, (Collapsible) => {
			if (Collapsible.name !== name) {
				if (Collapsible.state.isOpened) {
					Collapsible.close();
				}
			}
		});
		//</editor-fold>
	};

	render() {
		const { children } = this.props;
		return (
			<AccordionContext.Provider value={this.state.context}>
				{children}
			</AccordionContext.Provider>
		);
	}
}

Accordion.propTypes = propTypes;

Accordion.defaultProps = defaultProps;

export default Accordion;
