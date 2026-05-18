import React, { PureComponent as Component } from 'react';
import WithUi from 'hoc/store/ui';
import Container from 'main/components/ui/container/Container';
import styles from './Gallery.module.less';
import Image from 'ui/media/image';

const uiProps = () => ({});

class Gallery extends Component {
	open = (index) => {
		const images = this.props.blog?.gallery || [];

		const items = images.map((img) => ({
			src: img.image,
			title: img.title || '',
		}));

		openPopup({
			name: 'image',
			data: { current: index, items },
		});
	};

	render() {
		const images = this.props.blog?.gallery || [];

		if (!images.length) return null;

		return (
			<Container className={{ container: styles.cont }}>
				<div className={styles.wrapper}>
					{images.map((img, i) => (
						<div
							key={img.id || i}
							className={styles.image_wrapper}
							onClick={() => this.open(i)}>
							<Image
								src={img.thumbnail || img.image}
								className={styles.image}
							/>
						</div>
					))}
				</div>
			</Container>
		);
	}
}

export default WithUi(uiProps)(Gallery);
