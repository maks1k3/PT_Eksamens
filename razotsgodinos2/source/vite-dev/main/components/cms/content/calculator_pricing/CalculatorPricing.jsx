import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = (ownProps) => {
	return {
		CMSPopup: {
			loading: 'loading',
			content: {
				data: 'data',
			},
		},
	};
};

class CalculatorPricing extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'Kalkulatora cenas',
		});
		//</editor-fold>
	}

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading, data } = this.props;

		if (loading) {
			return null;
		}

		const lapene_pamati_bloku = get(data, 'lapene_pamati_bloku', '');
		const lapene_pamati_betoneti = get(data, 'lapene_pamati_betoneti', '');
		const lapene_pamati_skruvpali = get(data, 'lapene_pamati_skruvpali', '');
		const lapene_grida_yes = get(data, 'lapene_grida_yes', '');
		const lapene_grida_no = get(data, 'lapene_grida_no', '');
		const lapene_sienas_yes = get(data, 'lapene_sienas_yes', '');
		const lapene_sienas_no = get(data, 'lapene_sienas_no', '');
		const lapene_krasots_yes = get(data, 'lapene_krasots_yes', '');
		const lapene_krasots_no = get(data, 'lapene_krasots_no', '');
		const lapene_jumts_sindelis = get(data, 'lapene_jumts_sindelis', '');
		const lapene_jumts_metala = get(data, 'lapene_jumts_metala', '');
		const lapene_vizualizacija_yes = get(data, 'lapene_vizualizacija_yes', '');
		const lapene_vizualizacija_no = get(data, 'lapene_vizualizacija_no', '');
		const darza_pamati_bloku = get(data, 'darza_pamati_bloku', '');
		const darza_pamati_betoneti = get(data, 'darza_pamati_betoneti', '');
		const darza_pamati_skruvpali = get(data, 'darza_pamati_skruvpali', '');
		const darza_grida_yes = get(data, 'darza_grida_yes', '');
		const darza_grida_no = get(data, 'darza_grida_no', '');
		const darza_sienas_yes = get(data, 'darza_sienas_yes', '');
		const darza_sienas_no = get(data, 'darza_sienas_no', '');
		const darza_krasots_yes = get(data, 'darza_krasots_yes', '');
		const darza_krasots_no = get(data, 'darza_krasots_no', '');
		const darza_jumts_sindelis = get(data, 'darza_jumts_sindelis', '');
		const darza_jumts_metala = get(data, 'darza_jumts_metala', '');
		const darza_vizualizacija_yes = get(data, 'darza_vizualizacija_yes', '');
		const darza_vizualizacija_no = get(data, 'darza_vizualizacija_no', '');
		const auto_pamati_bloku = get(data, 'auto_pamati_bloku', '');
		const auto_pamati_betoneti = get(data, 'auto_pamati_betoneti', '');
		const auto_pamati_skruvpali = get(data, 'auto_pamati_skruvpali', '');
		const auto_grida_yes = get(data, 'auto_grida_yes', '');
		const auto_grida_no = get(data, 'auto_grida_no', '');
		const auto_sienas_yes = get(data, 'auto_sienas_yes', '');
		const auto_sienas_no = get(data, 'auto_sienas_no', '');
		const auto_krasots_yes = get(data, 'auto_krasots_yes', '');
		const auto_krasots_no = get(data, 'auto_krasots_no', '');
		const auto_jumts_sindelis = get(data, 'auto_jumts_sindelis', '');
		const auto_jumts_metala = get(data, 'auto_jumts_metala', '');
		const auto_vizualizacija_yes = get(data, 'auto_vizualizacija_yes', '');
		const auto_vizualizacija_no = get(data, 'auto_vizualizacija_no', '');

		return (
			<Fragment>
				<Field
					label="Lapene - Pamati: Bloku (€)"
					name="lapene_pamati_bloku"
					component={Input}
					value={lapene_pamati_bloku}
				/>
				<Field
					label="Lapene - Pamati: Betonēti (€)"
					name="lapene_pamati_betoneti"
					component={Input}
					value={lapene_pamati_betoneti}
				/>
				<Field
					label="Lapene - Pamati: Skrūvpāļi (€)"
					name="lapene_pamati_skruvpali"
					component={Input}
					value={lapene_pamati_skruvpali}
				/>
				<Field
					label="Lapene - Grīda: Jā (€)"
					name="lapene_grida_yes"
					component={Input}
					value={lapene_grida_yes}
				/>
				<Field
					label="Lapene - Grīda: Nē (€)"
					name="lapene_grida_no"
					component={Input}
					value={lapene_grida_no}
				/>
				<Field
					label="Lapene - Sienas: Jā (€)"
					name="lapene_sienas_yes"
					component={Input}
					value={lapene_sienas_yes}
				/>
				<Field
					label="Lapene - Sienas: Nē (€)"
					name="lapene_sienas_no"
					component={Input}
					value={lapene_sienas_no}
				/>
				<Field
					label="Lapene - Krāsots: Jā (€)"
					name="lapene_krasots_yes"
					component={Input}
					value={lapene_krasots_yes}
				/>
				<Field
					label="Lapene - Krāsots: Nē (€)"
					name="lapene_krasots_no"
					component={Input}
					value={lapene_krasots_no}
				/>
				<Field
					label="Lapene - Jumts: Šindelis (€)"
					name="lapene_jumts_sindelis"
					component={Input}
					value={lapene_jumts_sindelis}
				/>
				<Field
					label="Lapene - Jumts: Metāla (€)"
					name="lapene_jumts_metala"
					component={Input}
					value={lapene_jumts_metala}
				/>
				<Field
					label="Lapene - Vizualizācija: Jā (€)"
					name="lapene_vizualizacija_yes"
					component={Input}
					value={lapene_vizualizacija_yes}
				/>
				<Field
					label="Lapene - Vizualizācija: Nē (€)"
					name="lapene_vizualizacija_no"
					component={Input}
					value={lapene_vizualizacija_no}
				/>
				<Field
					label="Dārza - Pamati: Bloku (€)"
					name="darza_pamati_bloku"
					component={Input}
					value={darza_pamati_bloku}
				/>
				<Field
					label="Dārza - Pamati: Betonēti (€)"
					name="darza_pamati_betoneti"
					component={Input}
					value={darza_pamati_betoneti}
				/>
				<Field
					label="Dārza - Pamati: Skrūvpāļi (€)"
					name="darza_pamati_skruvpali"
					component={Input}
					value={darza_pamati_skruvpali}
				/>
				<Field
					label="Dārza - Grīda: Jā (€)"
					name="darza_grida_yes"
					component={Input}
					value={darza_grida_yes}
				/>
				<Field
					label="Dārza - Grīda: Nē (€)"
					name="darza_grida_no"
					component={Input}
					value={darza_grida_no}
				/>
				<Field
					label="Dārza - Sienas: Jā (€)"
					name="darza_sienas_yes"
					component={Input}
					value={darza_sienas_yes}
				/>
				<Field
					label="Dārza - Sienas: Nē (€)"
					name="darza_sienas_no"
					component={Input}
					value={darza_sienas_no}
				/>
				<Field
					label="Dārza - Krāsots: Jā (€)"
					name="darza_krasots_yes"
					component={Input}
					value={darza_krasots_yes}
				/>
				<Field
					label="Dārza - Krāsots: Nē (€)"
					name="darza_krasots_no"
					component={Input}
					value={darza_krasots_no}
				/>
				<Field
					label="Dārza - Jumts: Šindelis (€)"
					name="darza_jumts_sindelis"
					component={Input}
					value={darza_jumts_sindelis}
				/>
				<Field
					label="Dārza - Jumts: Metāla (€)"
					name="darza_jumts_metala"
					component={Input}
					value={darza_jumts_metala}
				/>
				<Field
					label="Dārza - Vizualizācija: Jā (€)"
					name="darza_vizualizacija_yes"
					component={Input}
					value={darza_vizualizacija_yes}
				/>
				<Field
					label="Dārza - Vizualizācija: Nē (€)"
					name="darza_vizualizacija_no"
					component={Input}
					value={darza_vizualizacija_no}
				/>
				<Field
					label="Auto - Pamati: Bloku (€)"
					name="auto_pamati_bloku"
					component={Input}
					value={auto_pamati_bloku}
				/>
				<Field
					label="Auto - Pamati: Betonēti (€)"
					name="auto_pamati_betoneti"
					component={Input}
					value={auto_pamati_betoneti}
				/>
				<Field
					label="Auto - Pamati: Skrūvpāļi (€)"
					name="auto_pamati_skruvpali"
					component={Input}
					value={auto_pamati_skruvpali}
				/>
				<Field
					label="Auto - Grīda: Jā (€)"
					name="auto_grida_yes"
					component={Input}
					value={auto_grida_yes}
				/>
				<Field
					label="Auto - Grīda: Nē (€)"
					name="auto_grida_no"
					component={Input}
					value={auto_grida_no}
				/>
				<Field
					label="Auto - Sienas: Jā (€)"
					name="auto_sienas_yes"
					component={Input}
					value={auto_sienas_yes}
				/>
				<Field
					label="Auto - Sienas: Nē (€)"
					name="auto_sienas_no"
					component={Input}
					value={auto_sienas_no}
				/>
				<Field
					label="Auto - Krāsots: Jā (€)"
					name="auto_krasots_yes"
					component={Input}
					value={auto_krasots_yes}
				/>
				<Field
					label="Auto - Krāsots: Nē (€)"
					name="auto_krasots_no"
					component={Input}
					value={auto_krasots_no}
				/>
				<Field
					label="Auto - Jumts: Šindelis (€)"
					name="auto_jumts_sindelis"
					component={Input}
					value={auto_jumts_sindelis}
				/>
				<Field
					label="Auto - Jumts: Metāla (€)"
					name="auto_jumts_metala"
					component={Input}
					value={auto_jumts_metala}
				/>
				<Field
					label="Auto - Vizualizācija: Jā (€)"
					name="auto_vizualizacija_yes"
					component={Input}
					value={auto_vizualizacija_yes}
				/>
				<Field
					label="Auto - Vizualizācija: Nē (€)"
					name="auto_vizualizacija_no"
					component={Input}
					value={auto_vizualizacija_no}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				<EditContentForm name="calculator_pricing">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

CalculatorPricing.propTypes = propTypes;

CalculatorPricing.defaultProps = defaultProps;

CalculatorPricing = WithUi(uiProps)(CalculatorPricing);

export default CalculatorPricing;
