import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import LocaleProvider from 'ui/misc/locale_provider';
import Popup from 'popups/components/ui/popup';
import Header from 'popups/components/ui/header';
import Content from 'popups/components/ui/content';

import items from '../../components/cms';
import { get, isNull } from 'lodash-es';

const propTypes = {
	data: PropTypes.object.isRequired,
	//from ui
	verticalAlign: PropTypes.string,
	hideOnOverlayClick: PropTypes.bool,
	maxWidth: PropTypes.string,
	title: PropTypes.string,
	mounted: PropTypes.bool,
};

export const settings = {
	name: 'cms',
	inUrl: true,
	level: 0,
	extraUrlKeys: [],
	onClose: onClose,
	closeOnEsc: true,
};

function onClose() {
	return true;
}
function renderEmpty() {
	return <div>CMS form not found</div>;
}

const defaultProps = {
	//from ui
	verticalAlign: 'top',
	hideOnOverlayClick: false,
	maxWidth: '900px',
	title: '',
	mounted: false,
};

const uiProps = (ownProps) => {
	return {
		CMSPopup: {
			verticalAlign: 'verticalAlign',
			hideOnOverlayClick: 'hideOnOverlayClick',
			maxWidth: 'maxWidth',
			title: 'title',
			mounted: 'mounted',
		},
	};
};

class CMSPopup extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		uiStore.set('CMSPopup.mounted', true);
	}

	componentWillUnmount() {
		uiStore.set('CMSPopup', {
			mounted: false,
		});
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onClose = () => {
		closePopup({ name: settings.name });
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderPopup = (content) => {
		const { verticalAlign, hideOnOverlayClick, maxWidth } = this.props;

		return (
			<Popup
				name={settings.name}
				level={settings.level}
				verticalAlign={verticalAlign}
				hideOnOverlayClick={hideOnOverlayClick}
				showCloseControl={false}
				contentWrapStyle={{
					maxWidth: maxWidth,
				}}>
				{this.renderHeader()}
				<Content>
					<LocaleProvider locale="lv">
						{content ?? renderEmpty()}
					</LocaleProvider>
				</Content>
			</Popup>
		);
	};

	renderHeader = () => {
		const { title } = this.props;

		return (
			<Header
				title={title}
				theme="custom"
				showCloseControl={true}
				onClose={this.onClose}
			/>
		);
	};

	render() {
		const { data, mounted } = this.props;
		const { name } = data;

		let content = mounted ? get(items, name, renderEmpty) : null;

		if (!isNull(content)) {
			content = React.createElement(content, data);
		} else {
			return null;
		}

		return this.renderPopup(content);
	}
}

CMSPopup.propTypes = propTypes;

CMSPopup.defaultProps = defaultProps;

export default WithUi(uiProps)(CMSPopup);
