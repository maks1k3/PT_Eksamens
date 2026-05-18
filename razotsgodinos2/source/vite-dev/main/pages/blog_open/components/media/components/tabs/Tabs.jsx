import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tabs.module.less';

const Tabs = ({ value, onChange, hasGallery, hasVideo }) => {
	// прячем табы если нечего переключать
	if (!hasGallery && !hasVideo) return null;

	return (
		<div className={styles.category}>
			<button
				type="button"
				className={`${styles.tab} ${value === 'gallery' ? styles.active : ''}`}
				onClick={() => onChange('gallery')}
				disabled={!hasGallery}>
				Galerija
			</button>

			<button
				type="button"
				className={`${styles.tab} ${value === 'video' ? styles.active : ''}`}
				onClick={() => onChange('video')}
				disabled={!hasVideo}>
				Video
			</button>
		</div>
	);
};

Tabs.propTypes = {
	value: PropTypes.oneOf(['gallery', 'video']).isRequired,
	onChange: PropTypes.func.isRequired,
	hasGallery: PropTypes.bool,
	hasVideo: PropTypes.bool,
};

Tabs.defaultProps = {
	hasGallery: false,
	hasVideo: false,
};

export default Tabs;
