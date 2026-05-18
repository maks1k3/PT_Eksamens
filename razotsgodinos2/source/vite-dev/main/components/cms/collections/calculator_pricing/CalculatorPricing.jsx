import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditCollectionItem from 'cms/collection/edit';
import Delete from 'cms/collection/delete';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import LangsTab from 'ui/common/langs_tab';
import { get, head } from 'lodash';

const propTypes = {
	id: PropTypes.number.isRequired,
	//from ui
	loading: PropTypes.bool,
	name: PropTypes.string,
	collectionId: PropTypes.number,
	data: PropTypes.object,
	active: PropTypes.bool,
	langData: PropTypes.object,
	langs: PropTypes.array,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = (ownProps) => {
	return {
		CMSPopup: {
			loading: 'loading',
			langs: 'langs',
			collection: {
				name: 'name',
				collectionId: 'collectionId',
				data: 'data',
				langData: 'langData',
				active: 'active',
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
		const { id } = this.props;
		uiStore.update('CMSPopup', {
			title: 'Cenas' + id,
		});
		//</editor-fold>
	}

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading, langs, active, data } = this.props;

		if (loading) {
			return null;
		}

		const category = get(data, 'category', '');
		const group = get(data, 'group', '');
		const option = get(data, 'option', '');
		const price = get(data, 'price', '');

		return (
			<Fragment>
				<Field
					label="Category (lapene | darza | auto)"
					name="category"
					component={Input}
					isRequired={true}
					value={category}
				/>
				<Field
					label="Group (pamatiPerM2 | gridaPerM2 | sienasPerM2 | krasotsPerM2 | jumtsPerM2 | vizualizacijaFlat)"
					name="group"
					component={Input}
					isRequired={true}
					value={group}
				/>
				<Field
					label="Option (bloku | betoneti | skruvpali | yes | no | sindelis | metala)"
					name="option"
					component={Input}
					isRequired={true}
					value={option}
				/>
				<Field
					label="Price (number)"
					name="price"
					component={Input}
					isRequired={true}
					value={price}
				/>

				<Field
					name="active"
					label="Aktīvs"
					component={Checkbox}
					value={active}
				/>
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = (lang) => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { langData } = this.props;
		const _langData = get(langData, lang, {});

		const category = get(_langData, 'category', '');

		return (
			<Fragment>
				<Field
					label="Admin title (example: Lapene / Pamati / Bloku)"
					name={`${lang}_category`}
					component={Input}
					value={category}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	renderDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDelete">
		const { loading, id, name, collectionId } = this.props;

		if (loading) {
			return null;
		}

		return <Delete id={id} name={name} collectionId={collectionId} />;
		//</editor-fold>
	};

	render() {
		const { id } = this.props;
		return (
			<Fragment>
				<EditCollectionItem id={id}>{this.renderForm()}</EditCollectionItem>
				{this.renderDelete()}
			</Fragment>
		);
	}
}

CalculatorPricing.propTypes = propTypes;

CalculatorPricing.defaultProps = defaultProps;

CalculatorPricing = WithUi(uiProps)(CalculatorPricing);

export default CalculatorPricing;
