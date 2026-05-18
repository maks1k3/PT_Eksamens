import getMainUrl from 'helpers/getMainUrl';
import HomeIcon from './components/icons/HomeIcon'; // проверь путь как у тебя

const navItems = [
	{
		link: getMainUrl(true),
		Icon: HomeIcon,
		ariaLabel: 'Home',
		isHome: true,
	},

	{ field: 'about', fallback: 'Par mums', link: getMainUrl(true) + 'par-mums' },
	{
		field: 'projects',
		fallback: 'Projekti',
		link: getMainUrl(true) + 'projekti',
	},
	{
		field: 'standard',
		fallback: 'Tipveida projekti',
		link: getMainUrl(true) + 'tipveida-projekti',
	},
	{
		field: 'contacts',
		fallback: 'Kontakti',
		link: getMainUrl(true) + 'kontakti',
	},
	{
		field: 'calculator',
		fallback: 'Cenu kalkulators',
		link: getMainUrl(true) + 'cenu-kalkulators',
	},
];

export default navItems;
