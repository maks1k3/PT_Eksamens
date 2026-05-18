import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'AdministrationPopup: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';
import styles from './AdministrationPopupAdvanced.less';
import loaderStyles from './LoaderStyles.less';

export const settings = {
	name: 'administration_popup_advanced',
	inUrl: true,
	level: 0,
	extraUrlKeys: [],
	verticalAlign: 'top',
	hideOnOverlayClick: true,
	contentWrapStyle: {
		maxWidth: '800px',
	},
	showCloseControl: false,
	onClose: onClose,
	closeOnEsc: true,
};

function onClose() {
	return true;
}

const propTypes = {
	data: PropTypes.object.isRequired,
};

const defaultProps = {};

class AdministrationPopupAdvanced extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
  *
  *                     Methods
  *
  * ========================================================================*/

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		closePopup({ name: settings.name });
		//</editor-fold>
	};

	getTitle = data => {
		//<editor-fold defaultstate="collapsed" desc="getTitle">
		const id = _.get(data, 'id', '');
		return \`Record #\${id}\`;
		//</editor-fold>
	};

	getImage = data => {
		//<editor-fold defaultstate="collapsed" desc="getImage">
		const thumbnail = _.get(data, 'image', '');
		const image = _.get(data, 'image', '');

		return { thumbnail, image };
		//</editor-fold>
	};

	getRows = data => {
		//<editor-fold defaultstate="collapsed" desc="getRows">
		const rows = [];

		rows.push('ID: ' + _.get(data, 'id', ''));
		rows.push('Name: ' + _.get(data, 'name', ''));
		rows.push('Type: ' + _.get(data, 'type', ''));

		return rows;
		//</editor-fold>
	};

	/* ========================================================================*
  *
  *                     Renderers
  *
  * ========================================================================*/

	renderPopup = content => {
		//<editor-fold defaultstate="collapsed" desc="renderPopup">
		return (
			<AdministrationPopup
				name="AdministrationPopupBasic"
				popupName={settings.name}
				url="actions/echo"
				extraData={{
					id: 1,
					name: 'Cat',
					type: 'Animal',
					image:
						'https://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg',
				}}
				getTitle={this.getTitle}
				getImage={this.getImage}
				getRows={this.getRows}
				level={settings.level}
				verticalAlign={settings.verticalAlign}
				hideOnOverlayClick={settings.hideOnOverlayClick}
				showCloseControl={settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}
				parseResponse={response => {
					response.extra = {
						some: 'data',
					};

					return response;
				}}
				onSuccess={({ response }) => {
					console.log({
						onSuccess: {
							response,
						},
					});
				}}
				onError={({ response }) => {
					console.log({
						onError: {
							response,
						},
					});
				}}
				onFail={({ response }) => {
					console.log({
						onFail: {
							response,
						},
					});
				}}
				onClose={() => {
					console.log('onClose');
					closePopup({ name: settings.name });
				}}
				showHeader={true}
				showRefresh={true}
				PopupProps={{
					openAnimation: styles['open_animation'],
					closeAnimation: styles['close_animation'],
				}}
				HeaderProps={{
					theme: 'primary',
				}}
				ContentProps={{
					classNames: {
						wrapper: styles['content'],
					},
				}}
				LoadingProps={{
					loaderClassNames: loaderStyles,
				}}
				AdministrationPopupHeaderProps={{
					ImageProps: {
						circle: true,
					},
					refreshIcon: {
						provider: 'icomoon',
						name: 'loop4',
					},
					renderRows: ({
						rows,
						image,
						classNames,
						AdministrationPopupHeader,
					}) => {
						const content = _.map(rows, (row, index) => {
							return (
								<div key={index} className={classNames['row-item']}>
									{row}
								</div>
							);
						});

						const className = _g.classNames(classNames['rows'], {
							[classNames['rows_with-image']]: !_g.isEmpty(image),
						});

						return (
							<div className={className}>
								{AdministrationPopupHeader.renderRefreshIcon(classNames)}
								{content}
							</div>
						);
					},
				}}>
				{content}
			</AdministrationPopup>
		);
		//</editor-fold>
	};

	render() {
		const content = <div>AdministrationPopupAdvanced</div>;

		return this.renderPopup(content);
	}
}

AdministrationPopupAdvanced.propTypes = propTypes;

AdministrationPopupAdvanced.defaultProps = defaultProps;

export default AdministrationPopupAdvanced;
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Button
				title="Show"
				onClick={() => {
					openPopup({
						name: 'administration_popup_advanced',
						data: {},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
