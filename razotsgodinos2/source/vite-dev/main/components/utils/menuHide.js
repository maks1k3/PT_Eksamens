export default function menuHide(id = 'header') {
	// Hide Header on on scroll down
	const buffer = 100;

	const siteHeader = document.getElementById(id);
	const siteHeaderHeight = siteHeader.offsetHeight;
	const isAdmin = uiStore.get('user.isAdmin', false);
	let lastScrollUpdated = 0;
	let top = document.documentElement.scrollTop || document.body.scrollTop;

	document.body.addEventListener('scroll', () => {
		let currentScroll =
			document.documentElement.scrollTop || document.body.scrollTop;

		//check if current scroll is upwards
		// + 5 to adjust for innacuracities of using scrollbar (sometimes making it lose a single pixel downwards)
		if (currentScroll < top + 5) {
			if (lastScrollUpdated - buffer > top) {
				siteHeader.style.top = isAdmin && top < 50 ? '50px' : '0px';
			}
			// if not upwards check if current scrollpos is lower (the higher number the more user has scrolled downwards) than header height
		} else if (currentScroll > siteHeaderHeight) {
			siteHeader.style.top = '-' + siteHeaderHeight + 'px';
			lastScrollUpdated = currentScroll;
		}
		top = currentScroll;
	});
}
