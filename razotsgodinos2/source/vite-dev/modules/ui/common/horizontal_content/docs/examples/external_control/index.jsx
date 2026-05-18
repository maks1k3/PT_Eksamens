import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import HorizontalContent from 'ui/common/horizontal_content';
import Button from 'ui/controls/button';

import styles from '../styles.less';

const title = 'HorizontalContent: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import HorizontalContent from 'ui/common/horizontal_content';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="margin-bottom">
					<HorizontalContent
						getRef={horizontal_content => {
							this.horizontal_content = horizontal_content;
						}}
						items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
						renderItem={({ item, index, classNames, HorizontalContent }) => {
							return (
								<div
									className={styles['item']}
									style={{ width: (index + 1) * 200 }}>
									{item}
								</div>
							);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setOffset"
						onClick={() => {
							this.horizontal_content.setOffset(200);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setOffset with animation"
						onClick={() => {
							this.horizontal_content.setOffset(500, true);
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
	}

	render() {
		return (
			<div>
				<div className="margin-bottom">
					<HorizontalContent
						getRef={horizontal_content => {
							this.horizontal_content = horizontal_content;
						}}
						items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
						renderItem={({ item, index, classNames, HorizontalContent }) => {
							return (
								<div
									className={styles['item']}
									style={{ width: (index + 1) * 200 }}>
									{item}
								</div>
							);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setOffset"
						onClick={() => {
							this.horizontal_content.setOffset(200);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setOffset with animation"
						onClick={() => {
							this.horizontal_content.setOffset(500, true);
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
