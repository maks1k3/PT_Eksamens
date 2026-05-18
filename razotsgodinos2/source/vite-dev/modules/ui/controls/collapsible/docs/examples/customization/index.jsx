import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Collapsible from 'ui/controls/collapsible';
import Icon from 'ui/misc/icon';
import styles from './styles.less';

const title = 'Collapsible: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Collapsible from 'ui/controls/collapsible';
import Icon from 'ui/misc/icon';

<Collapsible
	title={
		<span>
			This <b>is</b> collapsible
		</span>
	}
  classNames={styles}
  renderHeader={({ opened, title, classNames, onClick, Collapsible }) => {
    return (
      <div className={classNames['header']} onClick={onClick}>
        <span className={classNames['title']}>{title}</span>
        <Icon
          className={classNames['caret']}
          provider="fa"
          name={opened ? 'caret-up' : 'caret-down'}
        />
      </div>
    );
  }}>
  <div style={{ background: '#5f6d83', height: 300 }}>
    This is content
  </div>
</Collapsible>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Collapsible
				title={
					<span>
						This <b>is</b> collapsible
					</span>
				}
				classNames={styles}
				renderHeader={({ opened, title, classNames, onClick, Collapsible }) => {
					return (
						<div className={classNames['header']} onClick={onClick}>
							<span className={classNames['title']}>{title}</span>
							<Icon
								className={classNames['caret']}
								provider="fa"
								name={opened ? 'caret-up' : 'caret-down'}
							/>
						</div>
					);
				}}>
				<div style={{ background: '#5f6d83', height: 300 }}>
					This is content
				</div>
			</Collapsible>
		</ExampleHolder>
	);
};

export default Example;
