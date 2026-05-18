import {
	CATEGORY_LABEL,
	YESNO_LABEL,
	PAMATI_LABEL,
	JUMTS_LABEL,
} from '../constants/Label';

export const getLabel = (key, value) => {
	if (key === 'category') return CATEGORY_LABEL[value] ?? value;
	if (key === 'pamati') return PAMATI_LABEL[value] ?? value;
	if (key === 'jumts') return JUMTS_LABEL[value] ?? value;

	if (
		key === 'grida' ||
		key === 'sienas' ||
		key === 'krasots' ||
		key === 'vizualizacija'
	) {
		return YESNO_LABEL[value] ?? value;
	}

	return value ?? '';
};
