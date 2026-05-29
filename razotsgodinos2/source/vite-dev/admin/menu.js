const menu = [];

const baseName = '/administration';

menu.push({
	name: 'blog_entries',
	title: 'Projektu ieraksti',
	url: baseName + '/blog/blog_entries',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'blog_categories',
	title: 'Projektu kategorijas',
	url: baseName + '/blog/blog_categories',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'calculator',
	title: 'Cenu kalkulators',
	url: baseName + '/calculator',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'calculator_requests',
	title: 'Kalkulatora pieprasījumi',
	url: baseName + '/calculator_requests',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'calculator_categories',
	title: 'Kalkulatora kategorijas',
	url: baseName + '/calculator_categories',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'calculator_options',
	title: 'Kalkulatora izvēles',
	url: baseName + '/calculator_options',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'calculator_work_types',
	title: 'Kalkulatora pakalpojumi',
	url: baseName + '/calculator_work_types',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'users',
	title: 'Lietotāji',
	url: baseName + '/users',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'contacts',
	title: 'Kontakti',
	url: baseName + '/contacts',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'translations',
	title: 'Tulkojumi',
	url: baseName + '/translations',
	icon: _g.getMainUrl() + 'assets/icons/translations.svg',
});

menu.push({
	name: 'metadata',
	title: 'Lapas meta dati',
	url: baseName + '/metadata',
	icon: _g.getMainUrl() + 'assets/icons/book.svg',
});

menu.push({
	name: 'settings',
	title: 'Iestatījumi',
	url: baseName + '/settings',
	icon: _g.getMainUrl() + 'assets/icons/cog.svg',
});

export default menu;
