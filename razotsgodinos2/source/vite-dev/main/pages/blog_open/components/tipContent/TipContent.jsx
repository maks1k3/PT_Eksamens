import React, { PureComponent as Component } from 'react';
import WithUi from 'hoc/store/ui';
import styles from './TipContent.module.less';
import Button from 'ui/controls/button';
import getMainUrl from 'helpers/getMainUrl';
import Svg1 from 'main/pages/contacts/components/contact/svg/Svg1';
import Editable from 'cms/editable';

const uiProps = (ownProps) => {
	return {
		content: {
			tip_open_btn1: {
				langData: 'langData',
			},
		},
	};
};

class TipContent extends Component {
	render() {
		const { blog } = this.props;

		const title = blog?.title || '';
		const content = blog?.lang_data?.content || '';
		const price = blog?.lang_data?.price || '';
		const size = blog?.lang_data?.size || '';

		return (
			<div className={styles.wrapper}>
				<div className={styles.left}>
					{!!size && <div className={styles.size}>{size}</div>}

					{!!title && <div className={styles.title}>{title}</div>}

					{!!content && (
						<div
							className={styles.content}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					)}

					<Button
						theme="custom"
						type="button"
						classNames={{
							wrapper: styles.tip_Btn,
							wrapper_custom: styles.tip_Btn,
							title: styles.tip_Title,
						}}
						customTitle={
							<>
								<span className={styles.tip_Text}>
									<Editable
										edit={{
											name: 'tip_open_btn1',
										}}>
										{this.props.langData?.tip_open_Btn1}
									</Editable>
								</span>
								<Svg1 />
							</>
						}
						onClick={() => {
							window.location.href = getMainUrl(true) + 'kontakti';
						}}
					/>
				</div>

				<div className={styles.right}>
					{!!price && <div className={styles.price}>{price} €</div>}
				</div>
			</div>
		);
	}
}

export default WithUi(uiProps)(TipContent);
