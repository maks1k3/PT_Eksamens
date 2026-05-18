import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import EditableSortableList, {
	arrayMove,
} from 'ui/list/sortable_list/components/editable_sortable_list';
import Loading from 'ui/misc/loading';
import { forEach, get, map } from 'lodash-es';

const propTypes = {};

const defaultProps = {};

class ReorderCategories extends Component {
	constructor(props) {
		super(props);

		this.mounted = false;

		this.state = {
			loading: true,
			ids: [],
		};

		this.data = {};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		this.getData();
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		//</editor-fold>
	}

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const data = {};

		data.results_per_page = 'all'; //for all results

		data.order = {
			position: 'asc',
		};

		remoteRequest({
			url: 'administration/blog/categories/search',
			data: data,
			onSuccess: (response) => {
				if (!this.mounted) return;

				const responseRows = get(response, 'rows', []);

				const ids = map(responseRows, (row) => {
					return row.id;
				});

				forEach(responseRows, (row) => {
					this.data[row.id] = row;
				});

				this.setState({
					loading: false,
					ids: ids,
				});
			},
			onError: (response) => {
				showAlert({ content: response.msg });
			},
		});
		//</editor-fold>
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		//<editor-fold defaultstate="collapsed" desc="onSortEnd">
		const newIds = arrayMove(this.state.ids, oldIndex, newIndex);

		this.setState({
			ids: newIds,
		});

		remoteRequest({
			url: 'administration/blog/categories/actions',
			data: {
				action: 'reorder',
				ids: newIds.join(','),
			},
			onSuccess: (response) => {
				showAlert({ theme: 'success', content: response.msg });
			},
		});
		//</editor-fold>
	};

	renderItem = ({ item: id }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const item = get(this.data, id);

		return <div>{item.lv_title}</div>;
		//</editor-fold>
	};

	render() {
		const { loading, ids } = this.state;

		if (loading) {
			return <Loading />;
		}

		return (
			<EditableSortableList
				items={ids}
				renderItem={this.renderItem}
				onSortEnd={this.onSortEnd}
			/>
		);
	}
}

ReorderCategories.propTypes = propTypes;

ReorderCategories.defaultProps = defaultProps;

export default ReorderCategories;
