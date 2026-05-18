import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './TipMedia.module.less';

import TipTabs from './components/tabs/TipTabs';
import TipGallery from './components/gallery/TipGallery';
import TipVideo from './components/video/TipVideo';
import TipInfo from './components/info/TipInfo';
import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';

const propTypes = { blog: PropTypes.any };

const uiProps = (ownProps) => {
	return {
		content: {
			facebook: {
				langData: 'langData2',
			},
			instagram: {
				langData: 'langData3',
			},
			share_with: {
				langData: 'langData4',
			},
		},
	};
};

const defaultProps = { blog: null };

class TipMedia extends Component {
	state = { tab: 'gallery' };

	setTab = (tab) => this.setState({ tab });

	getActiveTab = (hasGallery, hasVideo) => {
		const { tab } = this.state;
		if (tab === 'gallery' && !hasGallery && hasVideo) return 'video';
		if (tab === 'video' && !hasVideo && hasGallery) return 'gallery';
		return tab;
	};

	onShare = async (e) => {
		e?.preventDefault?.();
		const url = window.location.href;
		const title = document.title;

		if (navigator.share) {
			try {
				await navigator.share({ title, url });
				return;
			} catch (err) {
				return;
			}
		}

		try {
			await navigator.clipboard.writeText(url);
		} catch (err) {
			const tmp = document.createElement('input');
			tmp.value = url;
			document.body.appendChild(tmp);
			tmp.select();
			document.execCommand('copy');
			document.body.removeChild(tmp);
		}
	};

	render() {
		const { blog } = this.props;

		const tipGallery =
			blog?.tip_gallery || blog?.gallery_tip || blog?.gallery || [];
		const tipVideos =
			blog?.tip_videos || blog?.videos_tip || blog?.videos || [];

		const hasGallery = (tipGallery || []).length > 0;
		const hasVideo = (tipVideos || []).length > 0;

		if (!hasGallery && !hasVideo) return null;

		const activeTab = this.getActiveTab(hasGallery, hasVideo);
		const firstVideo = tipVideos?.[0];

		const shareHref =
			typeof window !== 'undefined' ? window.location.href : '#';

		const currentUrl =
			typeof window !== 'undefined' ? window.location.href : '';

		const facebookShareUrl =
			typeof window !== 'undefined'
				? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
						window.location.href,
					)}`
				: '#';

		const instagramShareUrl =
			typeof window !== 'undefined'
				? `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`
				: '#';

		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<TipTabs
						value={activeTab}
						onChange={this.setTab}
						hasGallery={hasGallery}
						hasVideo={hasVideo}
					/>

					{activeTab === 'gallery' && hasGallery && (
						<TipGallery images={tipGallery} />
					)}

					{activeTab === 'video' && hasVideo && <TipVideo video={firstVideo} />}
					{activeTab === 'info' && <TipInfo blog={blog} />}

					<div className={styles.social_media}>
						<div className={styles.share}>
							<Editable
								edit={{
									name: 'share_with',
								}}>
								{this.props.langData4?.share_project}
							</Editable>
						</div>
						<div className={styles.social_links}>
							<div className={styles.line} />
							<a
								href={facebookShareUrl}
								target="_blank"
								rel="noopener noreferrer">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none">
									<path
										d="M16.5 6H13.5C12.9477 6 12.5 6.44772 12.5 7V10H16.5C16.6137 9.99748 16.7216 10.0504 16.7892 10.1419C16.8568 10.2334 16.8758 10.352 16.84 10.46L16.1 12.66C16.0318 12.8619 15.8431 12.9984 15.63 13H12.5V20.5C12.5 20.7761 12.2761 21 12 21H9.5C9.22386 21 9 20.7761 9 20.5V13H7.5C7.22386 13 7 12.7761 7 12.5V10.5C7 10.2239 7.22386 10 7.5 10H9V7C9 4.79086 10.7909 3 13 3H16.5C16.7761 3 17 3.22386 17 3.5V5.5C17 5.77614 16.7761 6 16.5 6Z"
										fill="#252521"
									/>
								</svg>
							</a>

							<div className={styles.line} />

							<a
								href={instagramShareUrl}
								target="_blank"
								rel="noopener noreferrer">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none">
									<path
										d="M12 7.5C11.11 7.5 10.24 7.76392 9.49993 8.25839C8.75991 8.75285 8.18314 9.45566 7.84254 10.2779C7.50195 11.1002 7.41283 12.005 7.58647 12.8779C7.7601 13.7508 8.18868 14.5526 8.81802 15.182C9.44736 15.8113 10.2492 16.2399 11.1221 16.4135C11.995 16.5872 12.8998 16.4981 13.7221 16.1575C14.5443 15.8169 15.2471 15.2401 15.7416 14.5001C16.2361 13.76 16.5 12.89 16.5 12C16.4988 10.8069 16.0243 9.66303 15.1806 8.81939C14.337 7.97575 13.1931 7.50124 12 7.5ZM12 15C11.4067 15 10.8266 14.8241 10.3333 14.4944C9.83994 14.1648 9.45542 13.6962 9.22836 13.1481C9.0013 12.5999 8.94189 11.9967 9.05764 11.4147C9.1734 10.8328 9.45912 10.2982 9.87868 9.87868C10.2982 9.45912 10.8328 9.1734 11.4147 9.05764C11.9967 8.94189 12.5999 9.0013 13.1481 9.22836C13.6962 9.45542 14.1648 9.83994 14.4944 10.3333C14.8241 10.8266 15 11.4067 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15ZM16.5 2.25H7.5C6.10807 2.25149 4.77358 2.80509 3.78933 3.78933C2.80509 4.77358 2.25149 6.10807 2.25 7.5V16.5C2.25149 17.8919 2.80509 19.2264 3.78933 20.2107C4.77358 21.1949 6.10807 21.7485 7.5 21.75H16.5C17.8919 21.7485 19.2264 21.1949 20.2107 20.2107C21.1949 19.2264 21.7485 17.8919 21.75 16.5V7.5C21.7485 6.10807 21.1949 4.77358 20.2107 3.78933C19.2264 2.80509 17.8919 2.25149 16.5 2.25ZM20.25 16.5C20.25 17.4946 19.8549 18.4484 19.1516 19.1516C18.4484 19.8549 17.4946 20.25 16.5 20.25H7.5C6.50544 20.25 5.55161 19.8549 4.84835 19.1516C4.14509 18.4484 3.75 17.4946 3.75 16.5V7.5C3.75 6.50544 4.14509 5.55161 4.84835 4.84835C5.55161 4.14509 6.50544 3.75 7.5 3.75H16.5C17.4946 3.75 18.4484 4.14509 19.1516 4.84835C19.8549 5.55161 20.25 6.50544 20.25 7.5V16.5ZM18 7.125C18 7.3475 17.934 7.56501 17.8104 7.75002C17.6868 7.93502 17.5111 8.07922 17.3055 8.16436C17.1 8.24951 16.8738 8.27179 16.6555 8.22838C16.4373 8.18498 16.2368 8.07783 16.0795 7.9205C15.9222 7.76316 15.815 7.56271 15.7716 7.34448C15.7282 7.12625 15.7505 6.90005 15.8356 6.69448C15.9208 6.48891 16.065 6.31321 16.25 6.1896C16.435 6.06598 16.6525 6 16.875 6C17.1734 6 17.4595 6.11853 17.6705 6.3295C17.8815 6.54048 18 6.82663 18 7.125Z"
										fill="#252521"
									/>
								</svg>
							</a>
							<div className={styles.line} />

							<a href={shareHref} onClick={this.onShare}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none">
									<path
										d="M8.4649 11.2927C9.5979 10.1597 11.5739 10.1597 12.7069 11.2927L13.4139 11.9997L14.8279 10.5857L14.1209 9.8787C13.1779 8.9347 11.9219 8.4137 10.5859 8.4137C9.2499 8.4137 7.9939 8.9347 7.0509 9.8787L4.9289 11.9997C3.9932 12.9384 3.46777 14.2098 3.46777 15.5352C3.46777 16.8606 3.9932 18.132 4.9289 19.0707C5.39277 19.5352 5.94387 19.9035 6.55052 20.1544C7.15717 20.4053 7.80742 20.5339 8.4639 20.5327C9.12056 20.5341 9.77102 20.4056 10.3779 20.1547C10.9847 19.9038 11.5359 19.5354 11.9999 19.0707L12.7069 18.3637L11.2929 16.9497L10.5859 17.6567C10.0224 18.2177 9.25957 18.5327 8.4644 18.5327C7.66923 18.5327 6.90643 18.2177 6.3429 17.6567C5.7814 17.0934 5.46611 16.3305 5.46611 15.5352C5.46611 14.7399 5.7814 13.977 6.3429 13.4137L8.4649 11.2927Z"
										fill="#252521"
									/>
									<path
										d="M11.9999 4.92875L11.2929 5.63575L12.7069 7.04975L13.4139 6.34275C13.9774 5.78174 14.7402 5.46678 15.5354 5.46678C16.3305 5.46678 17.0933 5.78174 17.6569 6.34275C18.2184 6.90602 18.5337 7.66892 18.5337 8.46425C18.5337 9.25958 18.2184 10.0225 17.6569 10.5857L15.5349 12.7067C14.4019 13.8397 12.4259 13.8397 11.2929 12.7067L10.5859 11.9997L9.17188 13.4137L9.87887 14.1207C10.8219 15.0647 12.0779 15.5857 13.4139 15.5857C14.7499 15.5857 16.0059 15.0647 16.9489 14.1207L19.0709 11.9997C20.0066 11.061 20.532 9.78967 20.532 8.46425C20.532 7.13883 20.0066 5.86746 19.0709 4.92875C18.1324 3.99256 16.861 3.4668 15.5354 3.4668C14.2098 3.4668 12.9383 3.99256 11.9999 4.92875Z"
										fill="#252521"
									/>
								</svg>
							</a>

							<div className={styles.line} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TipMedia.propTypes = propTypes;
TipMedia.defaultProps = defaultProps;

export default WithUi(uiProps)(TipMedia);
