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

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		content: {
			about_image: {
				media: {
					images: 'aboutImages',
				},
			},
			benefits_1: {
				langData: 'langData1',
			},
			benefits_2: {
				langData: 'langData2',
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
		console.log('Center langData:', this.props.langData);
		return (
			<div>
				<div className={styles.container}>
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
										<p>{this.props.langData1?.benefit_1}</p>
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
										<p>{this.props.langData2?.benefit_2}</p>
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
