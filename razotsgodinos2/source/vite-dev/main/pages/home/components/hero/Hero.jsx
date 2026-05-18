import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Hero.module.less';
import Button from 'ui/controls/button';
import getMainUrl from 'helpers/getMainUrl';
import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';
import { head } from 'lodash-es';

const SLIDES = [
	{ name: 'hero_slide_1', imgProp: 'image0', langProp: 'langData0' },
	{ name: 'hero_slide_2', imgProp: 'image1', langProp: 'langData1' },
	{ name: 'hero_slide_3', imgProp: 'image2', langProp: 'langData2' },
];

const uiProps = () => ({
	content: {
		hero_slide_1: { langData: 'langData0', media: { images: 'images0' } },
		hero_slide_2: { langData: 'langData1', media: { images: 'images1' } },
		hero_slide_3: { langData: 'langData2', media: { images: 'images2' } },
		home_hero_btn1: {
			langData: 'langData3',
		},
		home_hero_btn2: {
			langData: 'langData4',
		},
	},
});

class Hero extends Component {
	state = { index: 0 };

	nextSlide = () => {
		this.setState(({ index }) => ({
			index: (index + 1) % SLIDES.length,
		}));
	};

	prevSlide = () => {
		this.setState(({ index }) => ({
			index: index === 0 ? SLIDES.length - 1 : index - 1,
		}));
	};

	render() {
		const slide = SLIDES[this.state.index];

		const img = this.props[slide.imgProp];
		const langData = this.props[slide.langProp];

		const backgroundStyle = img?.image
			? {
					backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${img.image})`,
				}
			: {};

		return (
			<>
				<Editable edit={{ name: slide.name }}>
					<div className={styles.container} style={backgroundStyle}>
						<div className={styles.info_container}>
							<div className={styles.info_1}>
								<div className={styles.info_text}>
									<div className={styles.head}>{langData?.text}</div>

									<div className={styles.info_btn}>{langData?.heading}</div>
								</div>

								<p className={styles.sub}>{langData?.text_bottom}</p>
							</div>

							<div className={styles.info_2}>
								<Button
									theme="custom"
									classNames={{
										wrapper: styles.info_btn2,
										wrapper_custom: styles.info_btn2,
										title: styles.btnTitle,
									}}
									customTitle=<Editable
										edit={{
											name: 'home_hero_btn1',
										}}>
										{this.props.langData3?.home_hero_Btn1}
									</Editable>
									onClick={() => {
										window.location.href =
											getMainUrl(true) + 'tipveida-projekti';
									}}
								/>

								<Button
									theme="custom"
									classNames={{
										wrapper: styles.info_text2,
										wrapper_custom: styles.info_text2,
										title: styles.btnTitle,
									}}
									customTitle=<Editable
										edit={{
											name: 'home_hero_btn2',
										}}>
										{this.props.langData4?.home_hero_Btn2}
									</Editable>
									onClick={() => {
										window.location.href =
											getMainUrl(true) + 'cenu-kalkulators';
									}}
								/>
							</div>
						</div>

						<div className={styles.arrows}>
							<button
								type="button"
								className={styles.arrow_left}
								onClick={this.prevSlide}>
								<div className={styles.carret_left}>
									<div className={styles.vector_left}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none">
											<path
												d="M15.5307 18.9693C15.6004 19.039 15.6557 19.1217 15.6934 19.2128C15.7311 19.3038 15.7505 19.4014 15.7505 19.4999C15.7505 19.5985 15.7311 19.6961 15.6934 19.7871C15.6557 19.8781 15.6004 19.9609 15.5307 20.0306C15.461 20.1002 15.3783 20.1555 15.2873 20.1932C15.1962 20.2309 15.0986 20.2503 15.0001 20.2503C14.9016 20.2503 14.804 20.2309 14.7129 20.1932C14.6219 20.1555 14.5392 20.1002 14.4695 20.0306L6.96948 12.5306C6.89974 12.4609 6.84443 12.3782 6.80668 12.2871C6.76894 12.1961 6.74951 12.0985 6.74951 11.9999C6.74951 11.9014 6.76894 11.8038 6.80668 11.7127C6.84443 11.6217 6.89974 11.539 6.96948 11.4693L14.4695 3.9693C14.6102 3.82857 14.8011 3.74951 15.0001 3.74951C15.1991 3.74951 15.39 3.82857 15.5307 3.9693C15.6715 4.11003 15.7505 4.30091 15.7505 4.49993C15.7505 4.69895 15.6715 4.88982 15.5307 5.03055L8.56041 11.9999L15.5307 18.9693Z"
												fill="#252521"
											/>
										</svg>
									</div>
								</div>
							</button>

							<button
								type="button"
								className={styles.arrow_right}
								onClick={this.nextSlide}>
								<div className={styles.carret_right}>
									<div className={styles.vector_right}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none">
											<path
												d="M17.0306 12.5306L9.53055 20.0306C9.46087 20.1002 9.37815 20.1555 9.2871 20.1932C9.19606 20.2309 9.09847 20.2503 8.99993 20.2503C8.90138 20.2503 8.8038 20.2309 8.71276 20.1932C8.62171 20.1555 8.53899 20.1002 8.4693 20.0306C8.39962 19.9609 8.34435 19.8781 8.30663 19.7871C8.26892 19.6961 8.24951 19.5985 8.24951 19.4999C8.24951 19.4014 8.26892 19.3038 8.30663 19.2128C8.34435 19.1217 8.39962 19.039 8.4693 18.9693L15.4396 11.9999L8.4693 5.03055C8.32857 4.88982 8.24951 4.69895 8.24951 4.49993C8.24951 4.30091 8.32857 4.11003 8.4693 3.9693C8.61003 3.82857 8.80091 3.74951 8.99993 3.74951C9.19895 3.74951 9.38982 3.82857 9.53055 3.9693L17.0306 11.4693C17.1003 11.539 17.1556 11.6217 17.1933 11.7127C17.2311 11.8038 17.2505 11.9014 17.2505 11.9999C17.2505 12.0985 17.2311 12.1961 17.1933 12.2871C17.1556 12.3782 17.1003 12.4609 17.0306 12.5306Z"
												fill="#252521"
											/>
										</svg>
									</div>
								</div>
							</button>
						</div>
					</div>
				</Editable>

				<div className={styles.line_frame}>
					<div className={styles.line} />
				</div>
			</>
		);
	}
}

Hero.propTypes = {
	langData0: PropTypes.object,
	langData1: PropTypes.object,
	langData2: PropTypes.object,
	images0: PropTypes.array,
	images1: PropTypes.array,
	images2: PropTypes.array,
	image0: PropTypes.object,
	image1: PropTypes.object,
	image2: PropTypes.object,
};

Hero = WithUi((ownProps) => ({
	images: {
		...(head(ownProps.images0) ? { [head(ownProps.images0)]: 'image0' } : {}),
		...(head(ownProps.images1) ? { [head(ownProps.images1)]: 'image1' } : {}),
		...(head(ownProps.images2) ? { [head(ownProps.images2)]: 'image2' } : {}),
	},
}))(Hero);

export default WithUi(uiProps)(Hero);
