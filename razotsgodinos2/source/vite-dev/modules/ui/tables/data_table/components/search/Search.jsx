import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

import styles from './Search.module.less';

const propTypes = {
	id: PropTypes.string.isRequired,
	classNames: PropTypes.object,
	placeholder: PropTypes.string,
	InputProps: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	placeholder: 'Search...',
	InputProps: {
		icon: _g.getMainUrl() + 'assets/icons/search.svg',
		clearable: true,
		autoComplete: 'off',
	},
};

class Search extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { InputProps, placeholder } = this.props;

		return (
			<div className={classNames['wrapper']}>
				<Field
					name="search"
					component={Input}
					componentProps={{ ...InputProps, ...{ placeholder: placeholder } }}
				/>
			</div>
		);
	}
}

Search.propTypes = propTypes;

Search.defaultProps = defaultProps;

Search = WithLocale(Search);

export default Search;
