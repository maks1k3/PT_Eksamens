// utils/buildPricingFromCMS.js

const n = (v) => {
	const x = parseFloat(String(v ?? '').replace(',', '.'));
	return Number.isFinite(x) ? x : 0;
};

export const buildPricingFromCMS = (d = {}) => ({
	lapene: {
		pamatiPerM2: {
			bloku: n(d.lapene_pamati_bloku),
			betoneti: n(d.lapene_pamati_betoneti),
			skruvpali: n(d.lapene_pamati_skruvpali),
		},

		gridaPerM2: {
			yes: n(d.lapene_grida_yes),
			no: n(d.lapene_grida_no),
		},

		sienasPerM2: {
			yes: n(d.lapene_sienas_yes),
			no: n(d.lapene_sienas_no),
		},

		krasotsPerM2: {
			yes: n(d.lapene_krasots_yes),
			no: n(d.lapene_krasots_no),
		},

		jumtsPerM2: {
			sindelis: n(d.lapene_jumts_sindelis),
			metala: n(d.lapene_jumts_metala),
		},

		vizualizacijaFlat: {
			yes: n(d.lapene_vizualizacija_yes),
			no: n(d.lapene_vizualizacija_no),
		},
	},

	darza: {
		pamatiPerM2: {
			bloku: n(d.darza_pamati_bloku),
			betoneti: n(d.darza_pamati_betoneti),
			skruvpali: n(d.darza_pamati_skruvpali),
		},

		gridaPerM2: {
			yes: n(d.darza_grida_yes),
			no: n(d.darza_grida_no),
		},

		sienasPerM2: {
			yes: n(d.darza_sienas_yes),
			no: n(d.darza_sienas_no),
		},

		krasotsPerM2: {
			yes: n(d.darza_krasots_yes),
			no: n(d.darza_krasots_no),
		},

		jumtsPerM2: {
			sindelis: n(d.darza_jumts_sindelis),
			metala: n(d.darza_jumts_metala),
		},

		vizualizacijaFlat: {
			yes: n(d.darza_vizualizacija_yes),
			no: n(d.darza_vizualizacija_no),
		},
	},

	auto: {
		pamatiPerM2: {
			bloku: n(d.auto_pamati_bloku),
			betoneti: n(d.auto_pamati_betoneti),
			skruvpali: n(d.auto_pamati_skruvpali),
		},

		gridaPerM2: {
			yes: n(d.auto_grida_yes),
			no: n(d.auto_grida_no),
		},

		sienasPerM2: {
			yes: n(d.auto_sienas_yes),
			no: n(d.auto_sienas_no),
		},

		krasotsPerM2: {
			yes: n(d.auto_krasots_yes),
			no: n(d.auto_krasots_no),
		},

		jumtsPerM2: {
			sindelis: n(d.auto_jumts_sindelis),
			metala: n(d.auto_jumts_metala),
		},

		vizualizacijaFlat: {
			yes: n(d.auto_vizualizacija_yes),
			no: n(d.auto_vizualizacija_no),
		},
	},
});
