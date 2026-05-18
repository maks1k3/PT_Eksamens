import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import WithLocale from './WithLocale';

import styles from './Info.module.less';
import { get, toInteger } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	classNames: PropTypes.object,
	translations: PropTypes.object,

	//from ui
	count: PropTypes.number,
	page: PropTypes.number,
	total: PropTypes.number,
	resultsPerPage: PropTypes.number,
};

const defaultProps = {
	classNames: {},

	//from ui
	count: 0,
	page: 1,
	total: 0,
	resultsPerPage: 10,
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			count: 'count',
			page: 'page',
			total: 'total',
			resultsPerPage: 'resultsPerPage',
		},
	};
};

class Info extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const { count, page, total, translations, resultsPerPage } = this.props;
		const _showing = get(translations, 'showing', 'Showing');
		const _to = get(translations, 'to', 'to');
		const _of = get(translations, 'of', 'of');
		const _entries = get(translations, 'entries', 'entries');

		if (total === 0) {
			return null;
		}

		let _resultsPerPage = toInteger(resultsPerPage);
		let _page = page - 1;
		const start = _page * _resultsPerPage + 1;
		const end = start + count - 1;
		return (
			<div className={classNames['wrapper']}>
				{_showing} {start} {_to} {end} {_of} {total} {_entries}
			</div>
		);
	}
}

Info.propTypes = propTypes;

Info.defaultProps = defaultProps;

Info = WithLocale(Info);

Info = WithUi(uiProps)(Info);

export default Info;
