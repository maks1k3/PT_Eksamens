import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithStore from 'hoc/store';

import Icon from 'ui/misc/icon';
import Collapsible from 'ui/controls/collapsible';

import styles from './Tabs.module.less';
import { find, get, has, head, isFunction, isUndefined, map } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	current: PropTypes.string,
	inUrl: PropTypes.bool,
	urlKey: PropTypes.string, //unique tabs component name used in url
	lazyLoad: PropTypes.bool,
	unmountOnClose: PropTypes.bool,
	//tabs to render
	items: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			title: PropTypes.string,
			icon: PropTypes.shape({
				provider: PropTypes.string,
				name: PropTypes.string,
			}),
			content: PropTypes.node,
			disabled: PropTypes.bool,
		}),
	).isRequired,

	renderHorizontalTab: PropTypes.func,
	renderVerticalTab: PropTypes.func,

	onTabChange: PropTypes.func,

	//custom ref
	getRef: PropTypes.func,

	//from store
	currentFromUrl: PropTypes.string,
};

const defaultProps = {
	classNames: {},
	inUrl: false,
	urlKey: 'tabs',
	lazyLoad: false,
	unmountOnClose: false,

	//from store
	currentFromUrl: '',
};

const storeProps = (ownProps) => {
	const urlKey = get(ownProps, 'urlKey', 'tabs');
	return {
		navigation: {
			current: {
				params: {
					[urlKey]: 'currentFromUrl',
				},
			},
		},
	};
};

class Tabs extends Component {
	constructor(props) {
		super(props);

		this.tabs = React.createRef();
		this.hiddenTabs = React.createRef();

		this.state = {
			mounted: false,
			uiType: null,
			current: null, //current tabs name
		};
		this.local_state = {
			mounted: false,
			current: null, //current tabs name
			openedBefore: {}, //tabs that were opened before
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.local_state.mounted = true;

		const { current, items, inUrl, currentFromUrl } = this.props;

		if (inUrl && currentFromUrl.length > 0) {
			this.openTab(currentFromUrl, false);
		} else {
			if (!isUndefined(current)) {
				this.openTab(current, false);
			} else {
				const headItem = head(items);

				if (!_g.isEmpty(headItem)) {
					this.openTab(headItem.name, false);
				}
			}
		}

		this.checkUiType();

		const { getRef } = this.props;

		if (isFunction(getRef)) {
			getRef(this);
		}

		ee.on(events.browserWindow.resize, this.onResize);
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">

		if (prevProps.current !== this.props.current) {
			if (this.local_state.current !== this.props.current) {
				this.openTab(this.props.current);
			}
		}
		if (prevProps.currentFromUrl !== this.props.currentFromUrl) {
			const { inUrl } = this.props;
			if (inUrl) {
				this.openTab(this.props.currentFromUrl, false);
			}
		}

		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.local_state.mounted = false;
		ee.off(events.browserWindow.resize, this.onResize);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	onResize = () => {
		//<editor-fold defaultstate="collapsed" desc="onResize">
		if (this.local_state.mounted) {
			this.checkUiType();
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	setCurrentTab = (current) => {
		//<editor-fold defaultstate="collapsed" desc="setCurrentTab">
		if (this.local_state.current === current) {
			return;
		}

		const tab = find(this.props.items, (i) => i.name === current);

		if (isUndefined(tab) || get(tab, 'disabled', false)) {
			return;
		}

		this.local_state.current = current;
		this.local_state.openedBefore[current] = true;

		this.setState({
			current: current,
		});

		const { inUrl, urlKey } = this.props;
		if (inUrl) {
			navigation.updateParamKey(urlKey, current);
		}
		//</editor-fold>
	};

	openTab = (current, updateUrl = true) => {
		//<editor-fold defaultstate="collapsed" desc="openTab">
		if (this.local_state.current === current) {
			return;
		}

		const tab = find(this.props.items, (i) => i.name === current);

		if (isUndefined(tab) || get(tab, 'disabled', false)) {
			return;
		}

		this.local_state.current = current;
		this.local_state.openedBefore[current] = true;

		this.setState({
			current: current,
		});

		const { onTabChange } = this.props;

		if (isFunction(onTabChange)) {
			onTabChange({ current, Tabs: this });
		}

		const { inUrl, urlKey } = this.props;
		if (inUrl && updateUrl) {
			navigation.updateParamKey(urlKey, current);
		}
		//</editor-fold>
	};

	checkUiType = () => {
		//<editor-fold defaultstate="collapsed" desc="checkUiType">

		const container_width = $(this.tabs.current).outerWidth();

		const menu_items = $(this.hiddenTabs.current).find('ul > li');

		let width = 0;
		for (let i = 0; i < menu_items.length; i++) {
			width += menu_items.eq(i).outerWidth();
		}

		const { uiType } = this.state;

		if (container_width < width) {
			if (uiType !== 'vertical') {
				this.setState({
					uiType: 'vertical',
					mounted: true,
				});
			}
		} else {
			if (uiType !== 'horizontal') {
				this.setState({
					uiType: 'horizontal',
					mounted: true,
				});
			}
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderHiddenTabs = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderHiddenTabs">
		return (
			<div className={classNames['hidden']} ref={this.hiddenTabs}>
				{this.renderHorizontalTabs(classNames)}
			</div>
		);
		//</editor-fold>
	};

	renderHorizontalTabs = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderHorizontalTabs">
		const { items } = this.props;

		const tabs = map(items, (tab) => {
			return this.renderHorizontalTab({
				tab,
				classNames,
			});
		});

		return <ul className={classNames['horizontal']}>{tabs}</ul>;
		//</editor-fold>
	};

	renderHorizontalTab = ({ tab, classNames }) => {
		//<editor-fold defaultstate="collapsed" desc="renderHorizontalTab">
		const { renderHorizontalTab } = this.props;
		const { current } = this.state;

		const { name, title, icon, disabled } = tab;

		if (isFunction(renderHorizontalTab)) {
			return renderHorizontalTab({
				tab,
				current,
				classNames,
				onClick: () => this.openTab(name),
				Tabs: this,
			});
		}

		const className = _g.classNames(
			classNames['horizontal-link'],
			{ [classNames['horizontal-link_active']]: current === name },
			{ [classNames['horizontal-link_disabled']]: disabled },
		);

		const extra = {};

		if (!disabled) {
			extra.onClick = () => this.openTab(name);
		}

		return (
			<li key={name} className={classNames['horizontal-item']} {...extra}>
				<span className={className}>
					{icon && (
						<Icon
							provider={icon.provider}
							name={icon.name}
							className={classNames['horizontal-icon']}
						/>
					)}
					<span className={classNames['horizontal-title']}>{title}</span>
				</span>
			</li>
		);
		//</editor-fold>
	};

	renderVerticalTabs = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderVerticalTabs">
		const { items } = this.props;

		const tabs = map(items, (tab) => {
			return this.renderVerticalTab({ tab, classNames });
		});

		return <div className={classNames['vertical']}>{tabs}</div>;
		//</editor-fold>
	};

	renderVerticalTab = ({ tab, classNames }) => {
		//<editor-fold defaultstate="collapsed" desc="renderVerticalTab">
		const { renderVerticalTab } = this.props;
		const { current } = this.state;

		const { name, title, icon, disabled } = tab;

		if (isFunction(renderVerticalTab)) {
			return renderVerticalTab({
				tab,
				current,
				classNames,
				onClick: () => this.openTab(name),
				Tabs: this,
			});
		}

		const className = _g.classNames(
			classNames['vertical-link'],
			{ [classNames['vertical-link_active']]: current === name },
			{ [classNames['vertical-link_disabled']]: disabled },
		);

		const extra = {};

		if (!disabled) {
			extra.onClick = () => this.openTab(name);
		}

		return (
			<div key={name}>
				<div className={classNames['vertical-item']} {...extra}>
					<span className={className}>
						{icon && (
							<Icon
								provider={icon.provider}
								name={icon.name}
								className={classNames['vertical-icon']}
							/>
						)}
						<span className={classNames['vertical-title']}>{title}</span>
					</span>
				</div>
				<Collapsible opened={current === name}>
					{this.renderItemContent(tab)}
				</Collapsible>
			</div>
		);
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { items } = this.props;
		const { uiType, mounted } = this.state;

		if (!mounted) {
			return null;
		}

		if (uiType === 'vertical') {
			return null;
		}

		return map(items, this.renderItemContent);

		//</editor-fold>
	};

	renderItemContent = (tab) => {
		//<editor-fold defaultstate="collapsed" desc="renderItemContent">
		const { name, content } = tab;
		const { lazyLoad, unmountOnClose } = this.props;
		const { current, uiType } = this.state;

		const extra = {};
		let _content = null;

		if (current === name) {
			_content = content;

			if (uiType === 'vertical') {
				extra.className = styles['vertical-content-wrapper'];
			}
		} else if (!unmountOnClose) {
			if (lazyLoad) {
				if (has(this.local_state.openedBefore, name)) {
					_content = content;
					extra.style = { display: 'none' };
				}
			} else {
				_content = content;
				extra.style = { display: 'none' };
			}
		}

		return (
			<div key={name} {...extra}>
				{_content}
			</div>
		);

		//</editor-fold>
	};

	renderTabs = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderTabs">
		const { uiType, mounted } = this.state;

		if (!mounted) {
			return null;
		}

		if (uiType === 'horizontal') {
			return this.renderHorizontalTabs(classNames);
		} else {
			return this.renderVerticalTabs(classNames);
		}
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		return (
			<div ref={this.tabs} className={classNames['wrapper']}>
				{this.renderHiddenTabs(classNames)}
				{this.renderTabs(classNames)}
				{this.renderContent()}
			</div>
		);
	}
}

Tabs.propTypes = propTypes;

Tabs.defaultProps = defaultProps;

export default WithStore(storeProps)(Tabs);
