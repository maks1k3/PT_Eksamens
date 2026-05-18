export default function scrollTo(id, time = 1000) {
	if (!uiStore.get('animating')) {
		uiStore.set('animating', true);
		const container = $('body');
		const item = $('#' + id);

		container.animate(
			{
				scrollTop:
					item.offset().top - container.offset().top + container.scrollTop(),
			},
			time,
		);

		setTimeout(() => {
			uiStore.set('animating', false);
		}, time);
	}
}
