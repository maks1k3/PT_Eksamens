import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import Editable from './components/editable';
import Link from 'core/navigation/link';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';
import { forEach, get, isNull, upperCase } from 'lodash-es';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,

	//ui
	langs: PropTypes.array,
};

const uiProps = (ownProps) => {
	return {
		langs: 'langs',
	};
};

const defaultProps = {};

const syncWithUrl = true;
const resultsPerPage = 10;
const order = { id: 'desc' };

class Table extends Component {
	constructor(props) {
		super(props);
	}

	getColumns = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumns">
		const { langs } = this.props;

		const columns = [];

		columns.push({
			name: 'id',
			title: 'ID',
			isHidable: false,
		});

		columns.push({
			name: 'name',
			title: 'Name',
		});

		forEach(langs, (lang) => {
			columns.push({
				name: lang,
				title: upperCase(lang),
			});
		});

		columns.push({
			name: 'action',
			title: 'Darbības',
			isHidable: false,
			sortable: false,
			style: {
				width: '50px',
			},
		});

		return columns;
		//</editor-fold>
	};

	getFilters = () => {
		//<editor-fold defaultstate="collapsed" desc="getFilters">

		const { langs } = this.props;

		const filters = [];

		filters.push({
			label: 'Id',
			name: 'id',
			component: Input,
			componentProps: {
				placeholder: 'Id',
				clearable: true,
			},
		});

		filters.push({
			label: 'Name',
			name: 'name',
			component: Input,
			componentProps: {
				placeholder: 'Name',
				clearable: true,
			},
		});

		forEach(langs, (lang) => {
			filters.push({
				label: upperCase(lang),
				name: lang,
				component: Input,
				componentProps: {
					placeholder: upperCase(lang),
					clearable: true,
				},
			});
		});

		return filters;
		//</editor-fold>
	};

	getColumnRenderers = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumnRenderers">
		const { popupName, langs } = this.props;
		const columnRenderers = {};

		forEach(langs, (lang) => {
			columnRenderers[lang] = ({ id, cell, row }) => {
				const value = isNull(cell) ? '' : cell;
				const inEditMode = get(row, `inEditMode_${lang}`, false);
				return (
					<Editable id={id} lang={lang} value={value} inEditMode={inEditMode} />
				);
			};
		});

		columnRenderers.name = ({ cell, id }) => {
			return (
				<span className="no-wrap">
					<Link
						theme="content"
						onClick={() => {
							openPopup({
								name: popupName,
								data: {
									id: id,
									tab: 'edit',
								},
							});
						}}>
						{cell}
					</Link>
				</span>
			);
		};

		columnRenderers.action = ({ id }) => {
			return (
				<ActionsMenu
					options={[
						{
							title: 'Rediģēt',
							icon: {
								provider: 'icomoon',
								name: 'pencil',
							},
							onClick: () => {
								openPopup({
									name: popupName,
									data: {
										id: id,
										tab: 'edit',
									},
								});
							},
						},
					]}
				/>
			);
		};

		return columnRenderers;
		//</editor-fold>
	};

	render() {
		const { tableName, search } = this.props;
		return (
			<DataTable
				id={tableName}
				url={search}
				syncWithUrl={syncWithUrl}
				resultsPerPage={resultsPerPage}
				order={order}
				columns={this.getColumns()}
				filters={this.getFilters()}
				columnRenderers={this.getColumnRenderers()}
			/>
		);
	}
}

Table.propTypes = propTypes;

Table.defaultProps = defaultProps;

Table = WithUi(uiProps)(Table);

export default Table;
