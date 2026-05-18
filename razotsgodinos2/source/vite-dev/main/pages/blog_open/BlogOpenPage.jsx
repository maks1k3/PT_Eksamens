import React, { PureComponent as Component } from 'react';
import WithUi from 'hoc/store/ui';

import Hero from './components/hero/Hero';
import Media from './components/media/Media';
import TipMedia from './components/tip_media/TipMedia';
import Other from './components/other/Other';
import OtherTip from './components/other_tip/OtherTip';

const uiProps = () => ({
	blog: 'blog',
	other_blog: 'other_blog',
	isTip: (props) => !!props.blog?.tip_projects,
});

class BlogOpenPage extends Component {
	render() {
		const { blog, other_blog } = this.props;
		const isTip = !!blog?.tip_projects;

		let items = [...(other_blog || [])];

		if (blog) {
			const exists = items.some(
				(item) => String(item?.id) === String(blog?.id),
			);
			if (!exists) {
				items.push(blog);
			}
		}

		items = items.filter((item) =>
			isTip ? !!item?.tip_projects : !item?.tip_projects,
		);

		items.sort((a, b) => Number(a?.id || 0) - Number(b?.id || 0));

		const currentIndex = items.findIndex(
			(item) => String(item?.id) === String(blog?.id),
		);

		return (
			<>
				<Hero blog={blog} />

				{isTip ? <TipMedia blog={blog} /> : <Media blog={blog} />}

				{isTip ? (
					<OtherTip other_blog={items} currentIndex={currentIndex} />
				) : (
					<Other other_blog={items} currentIndex={currentIndex} />
				)}
			</>
		);
	}
}

export default WithUi(uiProps)(BlogOpenPage);
