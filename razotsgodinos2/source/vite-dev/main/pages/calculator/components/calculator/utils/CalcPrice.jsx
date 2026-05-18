const toNumber = (v) => {
	const n = parseFloat(String(v ?? '').replace(',', '.'));
	return Number.isFinite(n) ? n : 0;
};

const ynToJaNe = (v) => (v === 'yes' ? 'ja' : v === 'no' ? 'ne' : v);

const price = (bucket, key) => toNumber(bucket?.[key]);

export const calcTotal = (category, data, pricing) => {
	const cfg = pricing?.[category];
	if (!cfg) return { total: 0, area: 0 };

	const area = toNumber(data?.area);

	const pamati = price(cfg.pamatiPerM2, data?.pamati);
	const grida = price(cfg.gridaPerM2, ynToJaNe(data?.grida));
	const sienas = price(cfg.sienasPerM2, ynToJaNe(data?.sienas));
	const krasots = price(cfg.krasotsPerM2, ynToJaNe(data?.krasots));
	const jumts = price(cfg.jumtsPerM2, data?.jumts);
	const viz = price(cfg.vizualizacijaFlat, ynToJaNe(data?.vizualizacija));

	const total =
		area * pamati +
		area * grida +
		area * sienas +
		area * krasots +
		area * jumts +
		area * viz;

	return { total, area };
};
