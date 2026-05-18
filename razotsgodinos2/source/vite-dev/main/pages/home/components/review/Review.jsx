import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Review.module.less';
import Button from 'ui/controls/button';
import Svg1 from './svg/Svg1';
import Svg2 from './svg/Svg2';
import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';
import { head } from 'lodash-es';
import { defaultProps } from 'hoc/sortable/props';
import Image from 'ui/media/image';

const REVIEWS = [
	{ name: 'review_1', imgProp: 'image0', langProp: 'langData0' },
	{ name: 'review_2', imgProp: 'image1', langProp: 'langData1' },
	{ name: 'review_3', imgProp: 'image2', langProp: 'langData2' },
];

const uiProps = () => ({
	content: {
		review_1: { langData: 'langData0', media: { images: 'images0' } },
		review_2: { langData: 'langData1', media: { images: 'images1' } },
		review_3: { langData: 'langData2', media: { images: 'images2' } },
		home_review_btn1: {
			langData: 'langData3',
		},
		review_heading: {
			langData: 'langData4',
		},
	},
});

class Review extends Component {
	state = { index: 0 };

	nextReview = () => {
		this.setState(({ index }) => ({
			index: (index + 1) % REVIEWS.length,
		}));
	};

	render() {
		const review = REVIEWS[this.state.index];
		const img = this.props[review.imgProp];
		const langData = this.props[review.langProp];

		return (
			<Editable edit={{ name: review.name }}>
				<div className={styles.container}>
					<div className={styles.wrapper}>
						<Svg1 />

						<div className={styles.left}>
							<div className={styles.image}>
								{img?.image && (
									<Image src={img.image} alt={langData?.title || ''} />
								)}
							</div>
							<p className={styles.date}>{langData?.date}</p>
						</div>

						<div className={styles.right}>
							<p className={styles.head_text}>{langData?.title}</p>
							<p className={styles.text}>{langData?.text}</p>

							<Button
								theme="custom"
								classNames={{
									wrapper: styles.info_btn2,
									wrapper_custom: styles.info_btn2,
									title: styles.btnTitle,
								}}
								customTitle={
									<div className={styles.next_inner}>
										<div className={styles.next_text}>
											<Editable
												edit={{
													name: 'home_review_btn1',
												}}>
												{this.props.langData3?.home_review_Btn1}
											</Editable>
										</div>
										<Svg2 />
									</div>
								}
								onClick={this.nextReview}
							/>
						</div>

						<div className={styles.heading}>
							<Editable
								edit={{
									name: 'review_heading',
								}}>
								{this.props.langData4?.review_head}
							</Editable>
						</div>
					</div>
				</div>
			</Editable>
		);
	}
}

Review.propTypes = {
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

Review.defaultProps = defaultProps;

Review = WithUi((ownProps) => ({
	images: {
		...(head(ownProps.images0) ? { [head(ownProps.images0)]: 'image0' } : {}),
		...(head(ownProps.images1) ? { [head(ownProps.images1)]: 'image1' } : {}),
		...(head(ownProps.images2) ? { [head(ownProps.images2)]: 'image2' } : {}),
	},
}))(Review);

export default WithUi(uiProps)(Review);
