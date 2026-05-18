import React from 'react';
import PropTypes from 'prop-types';

import Image from 'ui/media/image';
import styles from './Item.less';

const propTypes = {
	id: PropTypes.number.isRequired,
	username: PropTypes.string.isRequired,
	points: PropTypes.string.isRequired,
	city: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
};

const defaultProps = {};

const Item = ({ username, points, city, avatar }) => {
	return (
		<a>
			<div className={styles['wrapper']}>
				<Image
					className={styles['placeholder']}
					src="/img/rating_map/user_map_item.png"
				/>
				<Image className={styles['user-profile']} src={avatar} />

				<span className={styles['respect-points-container']}>
					<span className={styles['respect-points']}>{points}</span>
				</span>

				<span className={styles['user-name-container']}>
					<span className={styles['user-name']}>{username}</span>
				</span>

				<span className={styles['city-name-container']}>
					<span className={styles['city-name']}>{city}</span>
				</span>
			</div>
		</a>
	);
};

Item.propTypes = propTypes;

Item.defaultProps = defaultProps;

export default Item;
