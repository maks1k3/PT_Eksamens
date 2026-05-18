import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import { get } from 'lodash-es';
import styles from './Item.module.less';

const propTypes = {
	id: PropTypes.number.isRequired,
	//from ui
	langData: PropTypes.object,
};

const defaultProps = {
	//from ui
};

const uiProps = (ownProps) => {
	return {
		collectionItems: {
			[ownProps.id]: {
				langData: 'langData',
			},
		},
	};
};

class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { id, langData } = this.props;
		let title = get(langData, 'title', '');
		let description = get(langData, 'description', '');
		return (
			<Editable
				edit={{
					name: 'privacy_policy',
					action: 'edit',
					id: id,
				}}>
				<div className="text-[16px] text-black">
					<div className="font-bold">{title}</div>
					<div
						className={styles.desc}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</div>
			</Editable>
		);
	}
}

Item.propTypes = propTypes;

Item.defaultProps = defaultProps;

export default WithUi(uiProps)(Item);
