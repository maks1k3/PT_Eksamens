import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/popups/universal`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ThemeExample, { info as ThemeExampleInfo } from './theme';
dataExtract({ info: ThemeExampleInfo, links, data, url });

import LevelExample, { info as LevelExampleInfo } from './level';
dataExtract({ info: LevelExampleInfo, links, data, url });

import VerticalAlignExample, {
	info as VerticalAlignExampleInfo,
} from './vertical_align';
dataExtract({ info: VerticalAlignExampleInfo, links, data, url });

import HideOnOverlayClickExample, {
	info as HideOnOverlayClickExampleInfo,
} from './hide_on_overlay_click';
dataExtract({ info: HideOnOverlayClickExampleInfo, links, data, url });

import WithoutHeaderExample, {
	info as WithoutHeaderExampleInfo,
} from './without_header';
dataExtract({ info: WithoutHeaderExampleInfo, links, data, url });

import AnimationExample, { info as AnimationExampleInfo } from './animation';
dataExtract({ info: AnimationExampleInfo, links, data, url });

import OverlayPopupExample, {
	info as OverlayPopupExampleInfo,
} from './overlay_popup';
dataExtract({ info: OverlayPopupExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<ThemeExample />
			<LevelExample />
			<VerticalAlignExample />
			<HideOnOverlayClickExample />
			<WithoutHeaderExample />
			<AnimationExample />
			<OverlayPopupExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
