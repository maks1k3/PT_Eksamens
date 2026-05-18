import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Editable from 'cms/editable';

const title = 'Editable: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Editable from 'cms/editable';

//Edit content
<Editable
  edit={{
    name: 'new_content_advanced'
  }}
  >
  <div>This is editable content</div>
</Editable>

//Add and sort collection
<Editable
  add={{
    name: 'new_collection_advanced',
    action: 'add'
  }}
  sort={{
    name: 'new_collection_advanced',
    action: 'sort'
  }}
  >
  <div>
    {items}
  </div>
</Editable>

//Edit collection item
<Editable
  edit={{
    name: 'new_collection_advanced',
    action: 'edit',
    id: id,
  }}
  active={active}
  >
  <div>
    <div>title: {title}</div>
  </div>
</Editable>

//Apply styles to Editable
<Editable
  edit={{
    name: 'faq',
    action: 'edit',
    id: id,
  }}
  style={{
    paddingLeft: '4px',
    paddingRight: '4px',
  }}
  >
  <div className={styles['wrapper']}>
   Content
  </div>
</Editable>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}
		/>
	);
};

export default Example;
