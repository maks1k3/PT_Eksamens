import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/range_input`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import ThemeExample, { info as ThemeExampleInfo } from './theme';
dataExtract({ info: ThemeExampleInfo, links, data, url });

import MultiValueExample, {
	info as MultiValueExampleInfo,
} from './multi_value';
dataExtract({ info: MultiValueExampleInfo, links, data, url });

import OrientationExample, {
	info as OrientationExampleInfo,
} from './orientation';
dataExtract({ info: OrientationExampleInfo, links, data, url });

import MarksExample, { info as MarksExampleInfo } from './marks';
dataExtract({ info: MarksExampleInfo, links, data, url });

import ValueLabelExample, {
	info as ValueLabelExampleInfo,
} from './value_label';
dataExtract({ info: ValueLabelExampleInfo, links, data, url });

import ScaleExample, { info as ScaleExampleInfo } from './scale';
dataExtract({ info: ScaleExampleInfo, links, data, url });

import ControlledExample, { info as ControlledExampleInfo } from './controlled';
dataExtract({ info: ControlledExampleInfo, links, data, url });

import InsideFormExample, {
	info as InsideFormExampleInfo,
} from './inside_form';
dataExtract({ info: InsideFormExampleInfo, links, data, url });

import ExternalExample, { info as ExternalExampleInfo } from './external';
dataExtract({ info: ExternalExampleInfo, links, data, url });

import MinMaxStepExample, {
	info as MinMaxStepExampleInfo,
} from './min_max_step';
dataExtract({ info: MinMaxStepExampleInfo, links, data, url });

import ShowTrackExample, { info as ShowTrackExampleInfo } from './show_track';
dataExtract({ info: ShowTrackExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import ReadonlyExample, { info as ReadonlyExampleInfo } from './readonly';
dataExtract({ info: ReadonlyExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

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
			<MultiValueExample />
			<OrientationExample />
			<MarksExample />
			<ValueLabelExample />
			<ScaleExample />
			<ControlledExample />
			<InsideFormExample />
			<ExternalExample />
			<MinMaxStepExample />
			<ShowTrackExample />
			<DisabledExample />
			<ReadonlyExample />
			<CallbacksExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
