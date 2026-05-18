import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Carousel from 'ui/common/carousel';
import Button from 'ui/controls/button';

import styles from '../styles.less';

const title = 'Carousel: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Carousel from 'ui/common/carousel';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.carouselPages = null;
		this.carouselItems = null;
	}

	render() {
		return (
			<div>
				<div className="margin-bottom">
					<Carousel
						getRef={(carousel) => {
							this.carouselPages = carousel;
						}}
						items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
						renderItem={({
							item,
							index,
							classNames,
							gridItemWidth,
							Carousel,
						}) => {
							return <div className={styles['item_full']}>{item}</div>;
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setPage"
						onClick={() => {
							this.carouselPages.setPage(1);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="nextPage"
						onClick={() => {
							this.carouselPages.nextPage();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="previousPage"
						onClick={() => {
							this.carouselPages.previousPage();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Carousel
						pageMode={false}
						multiple={true}
						getRef={(carousel) => {
							this.carouselItems = carousel;
						}}
						items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
						renderItem={({
							item,
							index,
							classNames,
							gridItemWidth,
							Carousel,
						}) => {
							const className = _g.classNames(
								{ [styles['item_full']]: gridItemWidth === '100%' },
								{ [styles['item']]: gridItemWidth !== '100%' },
							);
							return <div className={className}>{item}</div>;
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setItem"
						onClick={() => {
							this.carouselPages.setItem(1);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="next"
						onClick={() => {
							this.carouselItems.next();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="previous"
						onClick={() => {
							this.carouselItems.previous();
						}}
					/>
				</div>
			</div>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
		this.carouselPages = null;
		this.carouselItems = null;
	}

	render() {
		return (
			<div>
				<div className="margin-bottom">
					<Carousel
						getRef={(carousel) => {
							this.carouselPages = carousel;
						}}
						items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
						renderItem={({
							item,
							index,
							classNames,
							gridItemWidth,
							Carousel,
						}) => {
							return <div className={styles['item_full']}>{item}</div>;
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setPage"
						onClick={() => {
							this.carouselPages.setPage(1);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="nextPage"
						onClick={() => {
							this.carouselPages.nextPage();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="previousPage"
						onClick={() => {
							this.carouselPages.previousPage();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Carousel
						pageMode={false}
						multiple={true}
						getRef={(carousel) => {
							this.carouselItems = carousel;
						}}
						items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
						renderItem={({
							item,
							index,
							classNames,
							gridItemWidth,
							Carousel,
						}) => {
							const className = _g.classNames(
								{ [styles['item_full']]: gridItemWidth === '100%' },
								{ [styles['item']]: gridItemWidth !== '100%' },
							);
							return <div className={className}>{item}</div>;
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setItem"
						onClick={() => {
							this.carouselPages.setItem(1);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="next"
						onClick={() => {
							this.carouselItems.next();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="previous"
						onClick={() => {
							this.carouselItems.previous();
						}}
					/>
				</div>
			</div>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Test />
		</ExampleHolder>
	);
};

export default Example;
