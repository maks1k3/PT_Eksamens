import React from 'react';
import Icon from 'ui/misc/icon';
import Link from 'core/navigation/link';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'Icon: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Icon from 'ui/misc/icon';


//fa - Font Awesome
<Icon provider="fa" name="fort-awesome" /> - fa fort-awesome

//ion - Ionicons
<Icon provider="ion" name="ionic" /> - ion ionic

//icomoon - Icomoon icons
<Icon provider="icomoon" name="pencil" /> - icomoon pencil
<Icon provider="icomoon" name="trash" /> - icomoon trash

//glyphicon - Glyphicons
<Icon provider="glyphicon" name="pencil" /> - glyphicon pencil
<Icon provider="icomoon" name="trash" /> - glyphicon trash

//foundation - foundation icons
<Icon provider="foundation" name="star" /> - foundation star

//mdi - Material design icons
<Icon provider="mdi" name="react" /> - mdi react
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Link
				theme="content"
				to="http://zurb.com/playground/foundation-icon-fonts-3"
				target="_blank">
				<h2>fa - Font Awesome</h2>
			</Link>
			<div>
				<Icon provider="fa" name="fort-awesome" /> - fa fort-awesome
			</div>

			<Link theme="content" to="http://ionicons.com/" target="_blank">
				<h2>ion - Ionicons</h2>
			</Link>
			<div>
				<Icon provider="ion" name="ionic" /> - ion ionic
			</div>

			<Link
				theme="content"
				to="http://demo.interface.club/limitless/layout_3/LTR/default/icons_icomoon.html"
				target="_blank">
				<h2>icomoon - Icomoon icons</h2>
			</Link>
			<div>
				<Icon provider="icomoon" name="pencil" /> - icomoon pencil
			</div>
			<div>
				<Icon provider="icomoon" name="trash" /> - icomoon trash
			</div>

			<Link
				theme="content"
				to="http://getbootstrap.com/components/"
				target="_blank">
				<h2>glyphicon - Glyphicons</h2>
			</Link>
			<div>
				<Icon provider="glyphicon" name="pencil" /> - glyphicon pencil
			</div>
			<div>
				<Icon provider="glyphicon" name="trash" /> - glyphicon trash
			</div>

			<Link
				theme="content"
				to="http://zurb.com/playground/foundation-icon-fonts-3"
				target="_blank">
				<h2>foundation - foundation icons</h2>
			</Link>
			<div>
				<Icon provider="foundation" name="star" /> - foundation star
			</div>

			<Link
				theme="content"
				to="https://materialdesignicons.com/"
				target="_blank">
				<h2>mdi - Material design icons</h2>
			</Link>
			<div>
				<Icon provider="mdi" name="react" /> - mdi react
			</div>
		</ExampleHolder>
	);
};

export default Example;
