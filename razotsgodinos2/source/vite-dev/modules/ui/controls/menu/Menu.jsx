import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Holder from './components/holder';
import Item from './components/item';
import { map } from 'lodash-es';

const propTypes = {
	rows: PropTypes.array.isRequired,
	renderItem: PropTypes.func,

	holderClassNames: PropTypes.object,
	itemClassNames: PropTypes.object,
};

const defaultProps = {};

class Menu extends Component {
	constructor(props) {
		super(props);
		this.id = _g.generateShortId();
	}

	renderRows = () => {
		//<editor-fold defaultstate="collapsed" desc="renderRows">
		const { rows } = this.props;
		return map(rows, this.renderRow);
		//</editor-fold>
	};

	renderRow = (row) => {
		//<editor-fold defaultstate="collapsed" desc="renderRow">
		const { name } = row;
		const { renderItem, itemClassNames, holderClassNames } = this.props;

		return (
			<Item
				key={name}
				row={row}
				renderItem={renderItem}
				holderClassNames={holderClassNames}
				classNames={itemClassNames}
			/>
		);

		//</editor-fold>
	};

	render() {
		const { holderClassNames } = this.props;
		return (
			<Holder key={this.id} classNames={holderClassNames}>
				{this.renderRows()}
			</Holder>
		);
	}
}

Menu.propTypes = propTypes;

Menu.defaultProps = defaultProps;

export default Menu;
