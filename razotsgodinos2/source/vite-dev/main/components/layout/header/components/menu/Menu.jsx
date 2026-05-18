import React, { PureComponent as Component } from 'react';
import WithUi from 'hoc/store/ui';
import styles from './Menu.module.less';
import navItems from '../../navItems';
import Link from 'core/navigation/link';
import getMainUrl from 'helpers/getMainUrl';
import Editable from 'cms/editable';

const uiProps = () => ({
	blog: 'blog',
	content: {
		nav_menu: { langData: 'navMenu' },
	},
});

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = { opened: false };
	}

	componentDidMount() {
		window.addEventListener('scroll', () => {
			this.setState({ opened: false });
		});
	}

	normalizePath = (url) => {
		if (!url) return '/';
		const withoutDomain = url.replace(/^https?:\/\/[^/]+/i, '');
		const clean = withoutDomain.split('?')[0].split('#')[0];
		return clean.length > 1 && clean.endsWith('/') ? clean.slice(0, -1) : clean;
	};

	isActiveLink = ({
		itemLink,
		current,
		main,
		isTip,
		projectsTarget,
		tipTarget,
	}) => {
		const target = this.normalizePath(itemLink);

		if (target === '/' || target === main) {
			return current === '/' || current === main;
		}

		if (isTip) {
			return target === tipTarget;
		}

		if (target === projectsTarget) {
			return (
				current === projectsTarget || current.startsWith(projectsTarget + '/')
			);
		}

		if (target === tipTarget) {
			return current === tipTarget || current.startsWith(tipTarget + '/');
		}

		return current === target || current.startsWith(target + '/');
	};

	render() {
		const { blog, navMenu } = this.props;

		const isTip = !!blog?.tip_projects;

		const pathname = window.location.pathname;
		const current = this.normalizePath(pathname);

		const main = this.normalizePath(getMainUrl(true));
		const projectsTarget = this.normalizePath(getMainUrl(true) + 'projekti');
		const tipTarget = this.normalizePath(
			getMainUrl(true) + 'tipveida-projekti',
		);

		return (
			<div className={styles.wrapper}>
				<Editable edit={{ name: 'nav_menu' }}>
					<div className={styles.container}>
						{navItems.map((item, index) => {
							const isActive = this.isActiveLink({
								itemLink: item.link,
								current,
								main,
								isTip,
								projectsTarget,
								tipTarget,
							});

							const title = item.Icon
								? null
								: navMenu?.[item.field] || item.fallback;

							return (
								<Link
									to={item.link}
									key={index}
									className={`${styles.nav_item} ${
										isActive ? styles.active : ''
									}`}
									aria-label={item.ariaLabel || item.fallback}>
									{item.Icon ? <item.Icon /> : item.fallback}
								</Link>
							);
						})}
					</div>
				</Editable>
			</div>
		);
	}
}

export default WithUi(uiProps)(Menu);
