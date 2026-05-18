import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TagsInput from 'ui/inputs/tags_input';

const title = 'TagsInput: customization';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TagsInput from 'ui/inputs/tags_input';

<TagsInput
	classNames={styles}
	value="tag1,tag2"
	renderTags={({ classNames, tags, TagsInput }) => {
		return _.map(tags, TagsInput.renderTag);
	}}
	renderTag={({ classNames, tag, index, TagsInput, onRemoveTag }) => {
		return (
			<span key={index} className={classNames['tag']}>
				<span className={classNames['tag-title']}>{tag}</span>
				<span
					className={classNames['tag-remove']}
					onClick={() => {
						onRemoveTag(tag);
					}}>
					×
				</span>
			</span>
		);
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<TagsInput
				classNames={styles}
				value="tag1,tag2"
				renderTags={({ classNames, tags, TagsInput }) => {
					return _.map(tags, TagsInput.renderTag);
				}}
				renderTag={({ classNames, tag, index, TagsInput, onRemoveTag }) => {
					return (
						<span key={index} className={classNames['tag']}>
							<span className={classNames['tag-title']}>{tag}</span>
							<span
								className={classNames['tag-remove']}
								onClick={() => {
									onRemoveTag(tag);
								}}>
								×
							</span>
						</span>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
