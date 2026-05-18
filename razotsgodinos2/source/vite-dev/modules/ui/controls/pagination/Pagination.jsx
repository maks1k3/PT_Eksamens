import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Link from 'core/navigation/link';

import styles from './Pagination.module.less';
import { isFunction, toInteger } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	controlled: PropTypes.bool,
	center: PropTypes.bool,

	//callbacks
	onPageChange: PropTypes.func,

	page: PropTypes.number,
	pageCount: PropTypes.number.isRequired, //total number of pages
	pageRangeDisplayed: PropTypes.number.isRequired, //range of pages displayed
	marginPagesDisplayed: PropTypes.number.isRequired, //number of pages to display for margins

	getLinkUrl: PropTypes.func,

	//ui customization
	previousLabel: PropTypes.node,
	breakLabel: PropTypes.node,
	nextLabel: PropTypes.node,

	renderPrevious: PropTypes.func,
	renderBreak: PropTypes.func,
	renderNext: PropTypes.func,
	renderPageItem: PropTypes.func,

	disableArrows: PropTypes.bool,
};

const defaultProps = {
	controlled: false,
	classNames: {},
	center: false,
	disableArrows: false,
	page: 1,
	previousLabel: '←',
	breakLabel: '…',
	nextLabel: '→',
};

class Pagination extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: this.props.page,
		};
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">

		if (prevProps.page !== this.props.page) {
			this.setState({
				page: this.props.page,
			});
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	previous = () => {
		//<editor-fold defaultstate="collapsed" desc="previous">
		const { page } = this.state;
		if (page > 0) {
			this.onChange(page - 1);
		}
		//</editor-fold>
	};

	next = () => {
		//<editor-fold defaultstate="collapsed" desc="next">
		const { page } = this.state;
		const { pageCount } = this.props;
		if (page < pageCount - 1) {
			this.onChange(page + 1);
		}
		//</editor-fold>
	};

	onChange = (page) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		const { onPageChange, controlled } = this.props;

		page = toInteger(page);

		if (controlled && isFunction(onPageChange)) {
			onPageChange({ page, Pagination: this });
		} else {
			this.setPage(page);
		}

		//</editor-fold>
	};

	setPage = (page) => {
		//<editor-fold defaultstate="collapsed" desc="setPage">

		const { onPageChange, controlled } = this.props;

		page = toInteger(page);

		if (page === this.state.page) {
			return;
		}

		this.setState(
			{
				page: page,
			},
			() => {
				if (isFunction(onPageChange) && !controlled) {
					onPageChange({ page, Pagination: this });
				}
			},
		);

		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderPrevious = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderPrevious">
		let { page } = this.state;
		const { disableArrows, renderPrevious, previousLabel, getLinkUrl } =
			this.props;

		if (disableArrows) {
			return null;
		}

		let disabled = true;

		if (page > 1) {
			disabled = false;
			page--;
		}

		if (isFunction(renderPrevious)) {
			return renderPrevious({
				onClick: () => {
					if (!disabled) {
						this.onChange(page);
					}
				},
				getLinkUrl: getLinkUrl,
				page: page,
				disabled: disabled,
				classNames,
				previousLabel,
				Pagination: this,
			});
		}

		const className = _g.classNames(
			classNames['item'],
			classNames['previous'],
			{
				[classNames['previous_disabled']]: disabled,
			},
		);

		const button = this.renderButton({
			content: previousLabel,
			className: className,
			page: page,
			disabled: disabled,
		});

		return <li>{button}</li>;
		//</editor-fold>
	};

	renderNext = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderNext">
		let { page } = this.state;
		const { disableArrows, renderNext, nextLabel, pageCount, getLinkUrl } =
			this.props;

		if (disableArrows) {
			return null;
		}

		let disabled = true;

		if (page < pageCount) {
			disabled = false;
			page++;
		}

		if (isFunction(renderNext)) {
			return renderNext({
				onClick: () => {
					if (!disabled) {
						this.onChange(page);
					}
				},
				getLinkUrl: getLinkUrl,
				page: page,
				disabled: disabled,
				classNames,
				nextLabel,
				Pagination: this,
			});
		}

		const className = _g.classNames(classNames['item'], classNames['next'], {
			[classNames['next_disabled']]: disabled,
		});

		const button = this.renderButton({
			content: nextLabel,
			className: className,
			page: page,
			disabled: disabled,
		});

		return <li>{button}</li>;
		//</editor-fold>
	};

	renderButton = ({ content, className, page, disabled }) => {
		//<editor-fold defaultstate="collapsed" desc="renderButton">
		const { getLinkUrl } = this.props;

		const itemProps = {};

		itemProps.className = className;

		if (!disabled) {
			itemProps.onClick = () => {
				this.onChange(page);
			};
		}

		if (isFunction(getLinkUrl) && !disabled) {
			return (
				<Link to={getLinkUrl(page)} mode="navigation">
					<span {...itemProps}>{content}</span>
				</Link>
			);
		}

		return <span {...itemProps}>{content}</span>;
		//</editor-fold>
	};

	renderBreak = (classNames, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderBreak">
		const { breakLabel, renderBreak } = this.props;

		if (isFunction(renderBreak)) {
			return renderBreak({ breakLabel, index, classNames, Pagination: this });
		}

		return (
			<li key={`break-${index}`}>
				<span className={classNames['break']}>{breakLabel}</span>
			</li>
		);
		//</editor-fold>
	};

	renderPageItem = (classNames, page) => {
		//<editor-fold defaultstate="collapsed" desc="renderPageItem">
		const { renderPageItem, getLinkUrl } = this.props;
		const disabled = page === this.state.page;

		if (isFunction(renderPageItem)) {
			return renderPageItem({
				page,
				disabled,
				classNames,
				onClick: () => {
					if (!disabled) {
						this.onChange(page);
					}
				},
				getLinkUrl: getLinkUrl,
				Pagination: this,
			});
		}

		const className = _g.classNames(classNames['item'], {
			[classNames['item_active']]: page === this.state.page,
		});

		const button = this.renderButton({
			content: page,
			className: className,
			page: page,
			disabled: disabled,
		});

		return <li key={page}>{button}</li>;
		//</editor-fold>
	};

	renderPagination = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderPagination">
		const { pageCount, pageRangeDisplayed, marginPagesDisplayed, breakLabel } =
			this.props;
		const items = [];

		const current_page = this.state.page - 1;

		if (pageCount <= pageRangeDisplayed) {
			for (let index = 0; index < pageCount; index++) {
				items.push(this.renderPageItem(classNames, index + 1));
			}
		} else {
			let leftSide = pageRangeDisplayed / 2;
			let rightSide = pageRangeDisplayed - leftSide;

			if (current_page > pageCount - pageRangeDisplayed / 2) {
				rightSide = pageCount - current_page;
				leftSide = pageRangeDisplayed - rightSide;
			} else if (current_page < pageRangeDisplayed / 2) {
				leftSide = current_page;
				rightSide = pageRangeDisplayed - leftSide;
			}

			let index;
			let page;
			let breakView;

			for (index = 0; index < pageCount; index++) {
				page = index + 1;

				let pageView = this.renderPageItem(classNames, page);

				if (page <= marginPagesDisplayed) {
					items.push(pageView);
					continue;
				}

				if (page > pageCount - marginPagesDisplayed) {
					items.push(pageView);
					continue;
				}

				if (
					index >= current_page - leftSide &&
					index <= current_page + rightSide
				) {
					items.push(pageView);
					continue;
				}

				let keys = Object.keys(items);
				let breakLabelKey = keys[keys.length - 1];
				let breakLabelValue = items[breakLabelKey];

				if (breakLabel && breakLabelValue !== breakView) {
					breakView = this.renderBreak(classNames, index);
					items.push(breakView);
				}
			}
		}

		return items;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { center } = this.props;

		const pagination = (
			<ul className={`${classNames['wrapper']} clearfix`}>
				{this.renderPrevious(classNames)}
				{this.renderPagination(classNames)}
				{this.renderNext(classNames)}
			</ul>
		);

		if (center) {
			return <div className={classNames['center']}>{pagination}</div>;
		} else {
			return pagination;
		}
	}
}

Pagination.propTypes = propTypes;

Pagination.defaultProps = defaultProps;

export default Pagination;
