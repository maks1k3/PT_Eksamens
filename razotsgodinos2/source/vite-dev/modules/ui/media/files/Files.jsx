import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import FileLink from 'ui/misc/file_link';

import styles from './Files.module.less';
import { isFunction, map } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			url: PropTypes.string,
			extension: PropTypes.string,
			name: PropTypes.string,
			size: PropTypes.string,
		}),
	).isRequired,

	renderItem: PropTypes.func,
};

const defaultProps = {
	classNames: {},
};

class Files extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderList = () => {
		//<editor-fold defaultstate="collapsed" desc="renderList">
		const { items } = this.props;

		return map(items, this.renderItem);
		//</editor-fold>
	};

	renderItem = (item, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const classNames = this.classNames;
		const { renderItem } = this.props;

		if (isFunction(renderItem)) {
			return renderItem({
				classNames,
				item,
				index,
				Files: this,
			});
		}

		const { url, name, extension, size } = item;
		return (
			<div key={index} className={classNames['item']}>
				<FileLink
					to={url}
					title={`${name}.${extension} ${!_g.isEmpty(size) ? `(${size})` : ''}`}
					extension={extension}
				/>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const className = _g.classNames(classNames['wrapper']);
		return <div className={className}>{this.renderList()}</div>;
	}
}

Files.propTypes = propTypes;

Files.defaultProps = defaultProps;

export default Files;
