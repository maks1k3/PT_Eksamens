import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'ui/controls/tabs';
import { isNull, map, upperCase } from 'lodash-es';

const propTypes = {
	langs: PropTypes.array.isRequired,
	renderItem: PropTypes.func.isRequired,
	TabsProps: PropTypes.object,
};

const defaultProps = {};

class LangsTab extends Component {
	constructor(props) {
		super(props);
	}

	renderItem = (lang) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { renderItem } = this.props;
		return {
			name: lang,
			title: upperCase(lang),
			content: renderItem(lang),
		};
		//</editor-fold>
	};

	render() {
		const { langs, TabsProps } = this.props;
		const items = map(langs, this.renderItem);

		const extra = {};

		const currentLang = uiStore.get('currentLang', null);

		if (!isNull(currentLang)) {
			extra.current = currentLang;
		}

		return <Tabs {...TabsProps} items={items} {...extra} />;
	}
}

LangsTab.propTypes = propTypes;

LangsTab.defaultProps = defaultProps;

export default LangsTab;
