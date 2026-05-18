import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './DropdownContent.module.less';
import Link from 'core/navigation/link';
import getMainUrl from 'helpers/getMainUrl';
import Arrow from './Arrow';
import Phone from './Phone';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		footer_services: 'services',
	};
};

class DropdownContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { services } = this.props;
		const img = getMainUrl() + '/img/header.jpeg';
		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.services_wrapper}>
						{services.map((service) => {
							return (
								<Link
									to={service.url}
									key={service.id}
									className={styles.service}>
									<Arrow />
									{service.title}
								</Link>
							);
						})}
					</div>
					<div
						className={styles.contact_wrapper}
						style={{ backgroundImage: 'url(' + img + ')' }}>
						<div className={styles.mask} />
						<div className={styles.title}>{_g.lang('contact_us')}</div>
						<Link to={'tel: +371 28238010'} className={styles.button_wrapper}>
							<Phone />
							+371 28238010
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

DropdownContent.propTypes = propTypes;

DropdownContent.defaultProps = defaultProps;

export default WithUi(uiProps)(DropdownContent);
