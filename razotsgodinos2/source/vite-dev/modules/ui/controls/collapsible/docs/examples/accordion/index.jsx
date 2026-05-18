import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Collapsible, { Accordion } from 'ui/controls/collapsible';

const title = 'Collapsible: accordion';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'You can wrap Collapsibles with Accordion if you want accordion functionality.',
	code: `
import Collapsible, { Accordion } from 'ui/controls/collapsible';


<Accordion>

  <Collapsible title="This is content 1">
    <div>This is some content first</div>
    <div>This is some content</div>
    <div>This is some content last</div>
  </Collapsible>
  <Collapsible title="This is content 2">
    <div>This is some content first</div>
    <div>This is some content</div>
    <div>This is some content last</div>
    
    <Accordion>
      <Collapsible title="This is sub content 1">
        <div>This is some content first</div>
        <div>This is some content</div>
        <div>This is some content last</div>
      </Collapsible>
      <Collapsible title="This is sub content 2">
        <div>This is some content first</div>
        <div>This is some content</div>
        <div>This is some content</div>
        <div>This is some content</div>
        <div>This is some content last</div>
      </Collapsible>
    </Accordion>

  </Collapsible>
  <Collapsible title="This is content 3">
    <div>This is some content first</div>
    <div>This is some content</div>
    <div>This is some content last</div>
  </Collapsible>

</Accordion>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Accordion>
				<Collapsible title="This is content 1">
					<div>This is some content first</div>
					<div>This is some content</div>
					<div>This is some content last</div>
				</Collapsible>
				<Collapsible title="This is content 2">
					<div>This is some content first</div>
					<div>This is some content</div>
					<div>This is some content last</div>
					<Accordion>
						<Collapsible title="This is sub content 1">
							<div>This is some content first</div>
							<div>This is some content</div>
							<div>This is some content last</div>
						</Collapsible>
						<Collapsible title="This is sub content 2">
							<div>This is some content first</div>
							<div>This is some content</div>
							<div>This is some content</div>
							<div>This is some content</div>
							<div>This is some content last</div>
						</Collapsible>
					</Accordion>
				</Collapsible>
				<Collapsible title="This is content 3">
					<div>This is some content first</div>
					<div>This is some content</div>
					<div>This is some content last</div>
				</Collapsible>
			</Accordion>
		</ExampleHolder>
	);
};

export default Example;
