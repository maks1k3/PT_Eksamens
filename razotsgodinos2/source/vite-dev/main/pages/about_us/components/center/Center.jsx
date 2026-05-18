import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Center.module.less';
import Svg1 from './svg/svg1';
import Svg2 from './svg/svg2';
import Svg3 from './svg/svg3';
import Svg4 from './svg/svg4';
import Svg5 from './svg/svg5';
import Svg6 from './svg/svg6';
import Svg7 from './svg/svg7';
import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';
import { head } from 'lodash-es';
import Image from 'ui/media/image';
import getMainUrl from 'helpers/getMainUrl';

const propTypes = {};

const PAGE_TITLES = {
	home: 'Sākumlapa',
	about_us: 'Par mums',
	blog: 'Projekti',
	blog_entry: 'Projekts',
	price_calculator: 'Сenu kalkulators',
	contacts: 'Kontakti',
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		Page: { current: 'current' },
		content: {
			about_image: {
				media: {
					images: 'aboutImages',
				},
			},
			benefits_1: {
				langData: 'langData',
			},
			benefits_2: {
				langData: 'langData_1',
			},
			about_head: {
				langData: 'langData3',
			},
			about_text_1: {
				langData: 'langData4',
			},
			about_text_2: {
				langData: 'langData5',
			},
			benefits_3: {
				langData: 'langData6',
			},
			benefits_4: {
				langData: 'langData7',
			},
		},
	};
};

class Center extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('Page prop:', this.props.Page);
		return (
			<div>
				<div className={styles.container}>
					<div className={styles.navigation}>
						<a href={getMainUrl(true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									d="M13.7069 6.79266L8.70688 1.79266C8.51936 1.60527 8.26511 1.5 8.00001 1.5C7.7349 1.5 7.48065 1.60527 7.29313 1.79266L2.29313 6.79266C2.19982 6.88528 2.12586 6.99552 2.07553 7.11698C2.02521 7.23844 1.99954 7.36869 2.00001 7.50016V13.5002C2.00001 13.6328 2.05268 13.7599 2.14645 13.8537C2.24022 13.9475 2.3674 14.0002 2.50001 14.0002H13.5C13.6326 14.0002 13.7598 13.9475 13.8536 13.8537C13.9473 13.7599 14 13.6328 14 13.5002V7.50016C14.0005 7.36869 13.9748 7.23844 13.9245 7.11698C13.8742 6.99552 13.8002 6.88528 13.7069 6.79266ZM13 13.0002H3.00001V7.50016L8.00001 2.50016L13 7.50016V13.0002Z"
									fill="#8E9089"
								/>
							</svg>
						</a>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								d="M11.354 8.35403L6.35403 13.354C6.30757 13.4005 6.25242 13.4373 6.19173 13.4625C6.13103 13.4876 6.06598 13.5006 6.00028 13.5006C5.93458 13.5006 5.86953 13.4876 5.80883 13.4625C5.74813 13.4373 5.69298 13.4005 5.64653 13.354C5.60007 13.3076 5.56322 13.2524 5.53808 13.1917C5.51294 13.131 5.5 13.066 5.5 13.0003C5.5 12.9346 5.51294 12.8695 5.53808 12.8088C5.56322 12.7481 5.60007 12.693 5.64653 12.6465L10.2934 8.00028L5.64653 3.35403C5.55271 3.26021 5.5 3.13296 5.5 3.00028C5.5 2.8676 5.55271 2.74035 5.64653 2.64653C5.74035 2.55271 5.8676 2.5 6.00028 2.5C6.13296 2.5 6.26021 2.55271 6.35403 2.64653L11.354 7.64653C11.4005 7.69296 11.4374 7.74811 11.4626 7.80881C11.4877 7.86951 11.5007 7.93457 11.5007 8.00028C11.5007 8.06599 11.4877 8.13105 11.4626 8.19175C11.4374 8.25245 11.4005 8.30759 11.354 8.35403Z"
								fill="#8E9089"
							/>
						</svg>
						<div className={styles.name}>
							{PAGE_TITLES[this.props.Page?.current] || 'Par mums'}
						</div>
					</div>
					<Svg1 />
					<Svg2 />
					<div className={styles.info}>
						<div className={styles.info_1}>
							<div className={styles.info_1_left}>
								<div className={styles.info_1_images}>
									<Editable
										edit={{
											name: 'about_image',
										}}>
										<Image src={this.props.image.image} />
									</Editable>
								</div>
								<div className={styles.info_1_rectangle} />
								<div className={styles.info_1_logo}>
									<Svg3 />
								</div>
							</div>

							<div className={styles.info_1_right}>
								<div className={styles.info_1_right_container}>
									<Editable
										edit={{
											name: 'about_head',
										}}>
										<p>{this.props.langData3?.aboutHeader}</p>
									</Editable>
									<div className={styles.info_1_right_container_text}>
										<Editable
											edit={{
												name: 'about_text_1',
											}}>
											<p>{this.props.langData4?.aboutText_1}</p>
										</Editable>

										<Editable
											edit={{
												name: 'about_text_2',
											}}>
											<p>{this.props.langData5?.aboutText_2}</p>
										</Editable>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.info_2}>
							<div className={styles.info_2_container}>
								<div className={styles.info_2_box}>
									<div className={styles.info_2_box_svg}>
										<Svg4 />
									</div>
									<Editable
										edit={{
											name: 'benefits_1',
										}}>
										<p>{this.props.langData?.benefit_1}</p>
									</Editable>
								</div>

								<div className={styles.info_2_box}>
									<div className={styles.info_2_box_svg}>
										<Svg5 />
									</div>
									<Editable
										edit={{
											name: 'benefits_2',
										}}>
										<p>{this.props.langData_1?.benefit_2}</p>
									</Editable>
								</div>

								<div className={styles.info_2_box}>
									<div className={styles.info_2_box_svg}>
										<Svg6 />
									</div>
									<Editable
										edit={{
											name: 'benefits_3',
										}}>
										<p>{this.props.langData6?.benefit_3}</p>
									</Editable>
								</div>

								<div className={styles.info_2_box}>
									<div className={styles.info_2_box_svg}>
										<Svg7 />
									</div>
									<Editable
										edit={{
											name: 'benefits_4',
										}}>
										<p>{this.props.langData7?.benefit_4}</p>
									</Editable>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Center.propTypes = propTypes;

Center.defaultProps = defaultProps;

Center = WithUi((ownProps) => {
	return {
		images: {
			[head(ownProps.aboutImages)]: 'image',
		},
	};
})(Center);
export default WithUi(uiProps)(Center);
