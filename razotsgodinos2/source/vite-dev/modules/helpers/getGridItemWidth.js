import { isUndefined } from 'lodash-es';

/**
 * Get width of grid item
 *
 *
 * @param {integer}  minWidth - minWidth
 * @param {integer}  gutter - gutter
 * @param {integer} containerWidth - containerWidth
 * @param {object} extra - extra data
 */
function getGridItemWidth(minWidth, gutter, containerWidth, extra) {
	if (isUndefined(extra)) {
		extra = {};
	}

	extra.columns = 0;

	let gridItemWidth = '';
	if (containerWidth <= (minWidth + gutter) * 2) {
		gridItemWidth = '100%';
	} else {
		let columns = Math.floor(containerWidth / (minWidth + gutter));
		gridItemWidth = containerWidth / columns;

		if (gridItemWidth * columns > containerWidth) {
			gridItemWidth = minWidth;
		}

		if (gridItemWidth < minWidth) {
			gridItemWidth = minWidth;
		}

		columns = Math.floor(containerWidth / gridItemWidth);

		extra.columns = columns;

		if (gutter > 0) {
			gridItemWidth = `calc((100% / ${columns}) - ${gutter}px)`;
		} else {
			gridItemWidth = `calc(100% / ${columns})`;
		}
	}

	return gridItemWidth;
}

export default getGridItemWidth;
