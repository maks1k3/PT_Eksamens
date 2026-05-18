import styles from './Cookies.module.less';
import Image from 'ui/media/image';
import { useState } from 'react';
import WithBrowserWidth from 'hoc/browser/with_browser_width';
import Link from 'core/navigation/link';
import WithUi from 'hoc/store/ui';
import { compose } from 'redux';
const uiProps = () => {
	return {
		marketing_cookies: 'marketing_cookies',
	};
};
const setCookie = (bool, setClose) => {
	remoteRequest({
		url: 'cookies/actions',
		data: {
			action: 'setCookies',
			selectedCookieState: bool,
		},
		onError: (response) => {
			showAlert({ content: response.msg });
		},
	});
	setClose(true);
};

const Cookies = ({ browserWidth, marketing_cookies }) => {
	const [close, setClose] = useState(['1', '0'].includes(marketing_cookies));

	if (close) return null;

	return (
		<div className={styles['wrapper']}>
			<div className={styles['container']}>
				<div className={styles['header']}>
					<div>
						<Image
							className={styles['image']}
							src={_g.getMainUrl() + 'img/logo/logo.png'}
						/>
					</div>
				</div>
				<div className={styles['content']}>
					<>
						<div className={styles['cookies_title']}>
							{_g.lang('we_use_cookies')}
						</div>
						<div className={styles['cookies_desc']}>
							{_g.lang('cookies_desc')}
							{browserWidth > 900 && (
								<>
									{' '}
									{_g.lang('learn_more')}:{' '}
									<b>
										<Link
											target="_blank"
											to={_g.getMainUrl(true) + 'privatumu-politika'}>
											{_g.lang('cookies_usage')}
										</Link>
									</b>
								</>
							)}
							{browserWidth <= 900 && (
								<div>
									{_g.lang('learn_more')}:{' '}
									<b>
										<Link
											target="_blank"
											to={_g.getMainUrl(true) + 'privatumu-politika'}>
											{_g.lang('cookies_usage')}
										</Link>
									</b>
								</div>
							)}
							<div className={styles['cookies_menu']}>
								<div
									onClick={() => {
										setCookie(1, setClose);
									}}
									className={styles['button']}>
									{_g.lang('accept_all_cookies')}
								</div>
								<div
									onClick={() => {
										setCookie(0, setClose);
									}}
									className={styles['button']}>
									{_g.lang('accept_only_mandatory')}
								</div>
							</div>
						</div>
					</>
				</div>
			</div>
		</div>
	);
};
// export default Cookies;
export default compose(WithBrowserWidth, WithUi(uiProps))(Cookies);
