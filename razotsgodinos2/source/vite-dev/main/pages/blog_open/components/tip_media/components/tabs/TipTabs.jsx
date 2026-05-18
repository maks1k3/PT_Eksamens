import React from 'react';
import PropTypes from 'prop-types';
import styles from './TipTabs.module.less';

const TipTabs = ({ value, onChange, hasGallery, hasVideo }) => {
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
				className={`${styles.tab} ${value === 'info' ? styles.active : ''}`}
				onClick={() => onChange('info')}>
				Papildus informācija
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

TipTabs.propTypes = {
	value: PropTypes.oneOf(['gallery', 'video', 'info']).isRequired,
	onChange: PropTypes.func.isRequired,
	hasGallery: PropTypes.bool,
	hasVideo: PropTypes.bool,
};

TipTabs.defaultProps = {
	hasGallery: false,
	hasVideo: false,
};

export default TipTabs;
